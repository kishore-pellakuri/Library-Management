import { Injectable } from '@angular/core';
import { Book } from './book.model';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BookService {
   formData : Book
   list : Book[]
   url:string 

  constructor(private http:HttpClient) { 
    this.url="https://localhost:44385/api"
  }
  postUser(formData:Book){
    return this.http.post(this.url+'/Books',formData);
 }
 getList(){
  this.http.get(this.url+'/Books')
  .toPromise().then(res => this.list = res as Book[])
}
putUser(formData:Book){
  return this.http.put(this.url+'/Books/'+formData.BookID,formData);
}
deleteUser(id : number){
  return this.http.delete(this.url+'/Books/'+id);
}
}
