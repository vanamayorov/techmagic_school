import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-list-top',
  templateUrl: './user-list-top.component.html',
  styleUrls: ['./user-list-top.component.scss']
})
export class UserListTopComponent {

  constructor(public usersService: UsersService) { }

}
