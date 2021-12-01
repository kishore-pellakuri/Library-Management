import { Component, OnInit } from '@angular/core';
import { BookService } from '../BookShared/book.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../BookShared/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(public service : BookService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
    this.service.getList();
  }
  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      BookID: null,
      Title: '',
      Author: '',
      YearofPublication: null,
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.BookID == null)
    this.insertRecord(form);
    else
      this.UpdateForm(form);
  }
  insertRecord(form: NgForm) {
    this.service.postUser(form.value).subscribe(res => {
      this.toastr.success('Inserted Successfully', 'Book')
      this.resetForm(form);

    })
  }
  EditForm(book: Book) {
    this.service.formData = book;
    this.service.getList();
  }
  UpdateForm(form: NgForm) {
    this.service.putUser(form.value).subscribe(res => {
      this.toastr.info('Updated Successfully', 'Book')
      this.resetForm(form);
      this.service.getList();
    })
  }
  DeleteForm(id: number) {
    if (confirm('Are you sure to delete this?')) {
      this.service.deleteUser(id).subscribe(res => {
        this.toastr.warning('Deleted Successfully', 'Book')
        this.service.getList();
      })
    }
  }
}
