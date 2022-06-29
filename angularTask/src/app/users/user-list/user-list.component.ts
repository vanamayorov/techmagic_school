import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  constructor(public usersService: UsersService) { }

  toggleCheck(id: number) {
    if (this.usersService.checkedUsers.includes(id)) {
      this.usersService.checkedUsers = this.usersService.checkedUsers.filter(i => i !== id);
      return;
    };

    this.usersService.checkedUsers.push(id);
  }

}
