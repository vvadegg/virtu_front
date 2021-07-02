import {Client} from './client.model';

export class Doc{
    constructor(
        public id:string, 
        public added:Date,
        public client:Client,
        public bonus:number,
        public dateStart:Date,
        public dateEnd:Date
        ){}
}