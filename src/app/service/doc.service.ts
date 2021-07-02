import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
  
@Injectable()
export class DocService{
  
    constructor(private http: HttpClient){ }
      
    getData(){
        return this.http.get('http://localhost:8066/doc')
    }
}