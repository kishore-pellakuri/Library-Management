import { Injectable } from '@angular/core';
import { User } from './user.model';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import { MatSort } from '@angular/material/sort';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData : User;
  list : User[];
   url:string 
  constructor(private http:HttpClient) {
     this.url="https://localhost:44385/api"
   }

  postUser(formData:User){
     return this.http.post(this.url+'/Users',formData);
  }
  getList(){
     this.http.get(this.url+'/Users')
     .toPromise().then(res => this.list = res as User[])
  }
  putUser(formData:User){
    return this.http.put(this.url+'/Users/'+formData.ID,formData);
 }
  deleteUser(id : number){
     return this.http.delete(this.url+'/Users/'+id);
  }
}
