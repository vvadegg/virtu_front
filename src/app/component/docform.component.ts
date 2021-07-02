import {DocService} from '../service/doc.service';
import {CalcService} from '../service/calc.service';
import {ClientService} from '../service/client.service';
import {CalcRequest} from '../model/calcrequest.model';
import {CalcResponse} from '../model/calcresponse.model';
import {Client, ClientSearch, ClientUpdate} from '../model/client.model';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ruLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePeriodValidator } from '../service/validators';
import { importType } from '@angular/compiler/src/output/output_ast';

defineLocale('ru', ruLocale);

declare var $: any;

@Component({
    selector: 'doc-form-component',
    templateUrl: '../template/docform.html',
    styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
        .modal:nth-of-type(even) {
            z-index: 1052 !important;
        }
        .modal-backdrop.show:nth-of-type(even) {
            z-index: 1051 !important;
        }        
    `],
    providers: [DocService,  CalcService]
})
export class DocFormComponent implements OnInit { 

    @ViewChild(MatDatepicker) datapicker: MatDatepicker<Date>;

    realtyType: String[] = ["Квартира", "Дом", "Комната"];

    years: Number[] = [];

    clientSearched: Client[]=[];

    calcForm: FormGroup;

    clientSearchForm: FormGroup;

    selectedClientForm: FormGroup;

    clientForm: FormGroup;

    public calcResponse: CalcResponse = new CalcResponse(null, null);

    public clientSelected: Client;

    constructor(private calcService: CalcService, private localeService: BsLocaleService, private clientService:ClientService){

        this.calcForm = new FormGroup({
            "sum":          new FormControl(null, [Validators.required, Validators.pattern("[0-9]+")]),
            "dateStart":    new FormControl(null, Validators.required),
            "dateEnd":      new FormControl(null, Validators.required),
            "realtyType":   new FormControl(null, Validators.required),
            "yearBuilding": new FormControl(null, Validators.required),
            "square":       new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+(\.[0-9]){0,1}$")])
        }, {validators: DatePeriodValidator});
    

        this.clientSearchForm = new FormGroup({
            "surName":      new FormControl(),
            "firstName":    new FormControl(),
            "middleName":   new FormControl()
        });

        this.selectedClientForm = new FormGroup({
            "id":           new FormControl(),
            "fio":          new FormControl(),
            "birthday":     new FormControl(),
            "passSeries":   new FormControl(),
            "passNumber":   new FormControl()
        });

        this.clientForm = new FormGroup({
            "id":           new FormControl(),
            "surName":      new FormControl(null, Validators.required),
            "firstName":    new FormControl(null, Validators.required),
            "middleName":   new FormControl(null, Validators.required),
            "birthday":     new FormControl(null, Validators.required),
            "passSeries":   new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{4}")]),
            "passNumber":   new FormControl(null, [Validators.required, Validators.pattern("^[0-9]{6}")])
        });

        this.localeService.use('ru');

        for (let i = new Date().getFullYear(); i > 1900 ; i--)  {
            this.years.push(i);
        }
    }

    ngOnInit() {
        const $this = this;
        $(document).on('show.bs.modal', '.modal', function (event) {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });

    }

    // подсчет премии
    submitCalc(){
        const dataRequest = new CalcRequest(
            this.calcForm.controls['sum'].value, 
            this.calcForm.controls['dateStart'].value, 
            this.calcForm.controls['dateEnd'].value, 
            this.calcForm.controls['realtyType'].value, 
            this.calcForm.controls['yearBuilding'].value, 
            this.calcForm.controls['square'].value 
            );

        this.calcService.calcBonus(dataRequest).subscribe(
            (data:any) => {
                this.calcResponse = new CalcResponse(data.bonus, data.calcDate);
        });
    }

    // поиск клиента
    submitClientSearch(){
        const dataRequest = {
            "surName":this.clientSearchForm.controls['surName'].value, 
            "firstName":this.clientSearchForm.controls['firstName'].value, 
            "middleName":this.clientSearchForm.controls['middleName'].value
        };

        this.clientService.search(dataRequest).subscribe(
            (data:any) => {
                this.clientSearched = data;
        });
        
    }

    // выбор клиента на форме поиска
    selectClient(client: Client) {
        this.selectedClientForm.patchValue({
            id:         client.id,
            fio:        client.fio,
            birthday:   client.birthday,
            passSeries: client.passSeries,
            passNumber: client.passNumber
        });
        $("#selectClientModal").modal('hide');
        this.clientSearchForm.reset();
        this.clientSearched=[];
    }   

    // открыть форму редактирования клиента
    changeClient() {

    }


    // создание/редактирование клиента
    clientSave() {

        const client = new ClientUpdate(
            this.clientForm.controls['surName'].value,
            this.clientForm.controls['firstName'].value,
            this.clientForm.controls['middleName'].value,
            this.clientForm.controls['birthday'].value,
            this.clientForm.controls['passSeries'].value,
            this.clientForm.controls['passNumber'].value
        );

        if (this.clientForm.controls['id'].value) {
            this.clientService.update(this.clientForm.controls['id'].value, client);    
        } else {
            this.clientService.create(client);    
        }
                
    }   


}