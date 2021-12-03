import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import * as _ from 'lodash';
@Injectable({
   providedIn: 'root'
})

export class UserService {
   formData: User;
   list: User[];
   list1: User[];
   listKeys :string[] ;
   searchList: boolean = false
   url: string
   constructor(private http: HttpClient) {
      this.url = "https://localhost:44385/api"
   }
   filtering() {
      if (this.searchList == false) {
         this.list1 = _.filter(this.list, function (o: any) { return o.Age > 23; })
         this.searchList = !this.searchList
         console.log(this.list1, "hi")
        this.listKeys = Object.keys(this.list1[0])
      }
      else {
         this.list1 = []
         this.listKeys =[]
         this.searchList = !this.searchList
      }
   }
   postUser(formData: User) {
      return this.http.post(this.url + '/Users', formData);
   }
   getList() {
      this.http.get(this.url + '/Users')
         .toPromise().then(res => this.list = res as User[])
   }
   putUser(formData: User) {
      return this.http.put(this.url + '/Users/' + formData.ID, formData);
   }
   deleteUser(id: number) {
      return this.http.delete(this.url + '/Users/' + id);
   }

}
