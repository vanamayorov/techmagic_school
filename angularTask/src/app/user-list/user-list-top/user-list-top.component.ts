import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-list-top',
  templateUrl: './user-list-top.component.html',
  styleUrls: ['./user-list-top.component.scss']
})
export class UserListTopComponent {
  constructor(public usersService: UsersService) { }


}
