import { BookComponent } from './../book/book.component';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../Shared/user.model';
import { UserService } from '../Shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public service: UserService, private toastr: ToastrService) { }
  
  ngOnInit(): void {
    this.resetForm();
    this.service.getList();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      ID: null,
      UserName: '',
      Age: null,
      MobileNumber: null,
      Place: ''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.ID == null)
      this.insertRecord(form);
    else
      this.UpdateForm(form);
  }
  insertRecord(form: NgForm) {
    this.service.postUser(form.value).subscribe(res => {
      this.toastr.success('Inserted Successfully', 'User Register')
      this.resetForm(form);
      this.service.getList();
    })
  }
  EditForm(user: User) {
    this.service.formData = user;
    this.service.getList();
  }
  UpdateForm(form: NgForm) {
    this.service.putUser(form.value).subscribe(res => {
      this.toastr.info('Updated Successfully', 'User Register')
      this.resetForm(form);
      this.service.getList();
    })
  }
  DeleteForm(id: number) {
    if (confirm('Are you sure to delete this?')) {
      this.service.deleteUser(id).subscribe(res => {
        this.toastr.warning('Deleted Successfully', 'User Register')
        this.service.getList();
      })
    }
  }
}
