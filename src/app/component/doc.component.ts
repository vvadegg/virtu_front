import { Doc } from './../model/doc.model';
import {DocService} from './../service/doc.service';
import {CalcService} from '../service/calc.service';
import { Component, OnInit } from '@angular/core';
     
@Component({
    selector: 'doc-component',
    templateUrl: '../template/doclist.html',
    providers: [DocService]
})
export class DocComponent { 

    docs: Doc[]=[];

    constructor(private docService: DocService){}

    ngOnInit(){
        this.docService.getData().subscribe((data:any)=>this.docs=data);
    }

}