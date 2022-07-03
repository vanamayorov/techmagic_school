import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICurrentUser, IUser } from 'src/app/shared/interfaces/user.interface';
import { NotifyBarService } from 'src/app/shared/services/notify-bar.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {
  @Input() set selectedUser(value: IUser) {
    if (value?.name) {
      this.originalTitle = value.name;
    }

    this.currentUser = { firstName: value.name.split(" ")[0], lastName: value.name.split(" ")[1], ...value };

    this.myForm.patchValue({
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      phone: this.currentUser.phone,
      email: this.currentUser.email,
    });
  }

  @Output() cancelUser = new EventEmitter();
  @Output() editUser = new EventEmitter();
  currentUser = {} as ICurrentUser;
  originalTitle: string = "";
  myForm: FormGroup;

  constructor(private notifyService: NotifyBarService) {
    this.myForm = new FormGroup({
      "firstName": new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      "lastName": new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60)
      ]),
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "phone": new FormControl("", [
        Validators.required,
        Validators.pattern("^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$")
      ]),
    });

  }

  ngOnInit(): void {
  }

  submitForm() {
    const user: IUser = {
      id: this.currentUser?.id ? this.currentUser.id : 0,
      name: `${this.myForm.value.firstName} ${this.myForm.value.lastName}`,
      phone: this.myForm.value.phone,
      email: this.myForm.value.email,
    };

    this.saveUser(user);
    this.cancelForm();
  }

  saveUser(user: IUser) {
    this.editUser.emit(user);
    this.notifyService.notify("New user has been added");
  }

  cancelForm() {
    this.cancelUser.emit();
    this.resetForm();
  }

  private resetForm() {
    this.myForm.reset();

    Object.keys(this.myForm.controls).forEach(key => {
      this.myForm?.get(key)?.setErrors(null);
    });
  }

}
