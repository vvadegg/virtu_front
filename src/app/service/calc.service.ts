import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CalcRequest} from '../model/calcrequest.model';
  
@Injectable()
export class CalcService{
  
    constructor(public http: HttpClient){ }
      
    calcBonus(calcRequest:CalcRequest){
        return this.http.post('http://localhost:8066/insurance/calculate', calcRequest);
    }
    
}