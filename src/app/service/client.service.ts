import {Injectable} from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
  
@Injectable()
export class ClientService{
  
    constructor(public http: HttpClient){ }
      
    search(data){
        let params = new HttpParams(data);

        for (let key in data) {
            if (data[key] != null)
                params = params.set(key.toString(), data[key]);
        }
        return this.http.get('http://localhost:8066/client/search', {params: params});
    }
    
    create(data){
        return this.http.post('http://localhost:8066/client/create', {params: data});
    }

    update(id, data){
        return this.http.put('http://localhost:8066/client/update/'+id, data);
    }    

}




