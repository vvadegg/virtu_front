import {DocService} from './service/doc.service';
import {ClientService} from './service/client.service';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'my-app',
    templateUrl: 'template/main.html',
    providers: [DocService, ClientService]
})
export class AppComponent { 

}