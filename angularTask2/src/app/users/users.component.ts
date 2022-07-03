import { Component, OnInit } from '@angular/core';
import { ICurrentUser, IUser } from '../shared/interfaces/user.interface';
import { LoaderService } from '../shared/services/loader.service';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  selectedUser!: IUser;
  checkedUsers: number[] = [];

  constructor(
    private usersService: UsersService,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
    this.resetUser();
  }

  fetchUsers() {
    this.usersService.getAllUsers().subscribe(res => this.users = res);
  }

  selectUser(user: IUser) {
    this.selectedUser = user;
  }

  resetUser() {
    const emptyUser: IUser = {
      id: 0,
      name: "",
      phone: "",
      email: ""
    };

    this.selectUser(emptyUser);
  }

  saveUser(currentUser: ICurrentUser) {
    const user = {
      id: currentUser.id,
      name: currentUser.name,
      phone: currentUser.phone,
      email: currentUser.email
    };

    if (!currentUser.id) {
      this.createUser(user);
    } else {
      this.updateUser(user);
    }

    this.resetUser();
  }

  updateUser(user: IUser) {
    this.usersService.updateUser(user)
      .subscribe(res => {
        this.users = this.users.map(user => {
          return user.id === res.id ? res : user;
        })
      });
  }

  createUser(user: IUser) {
    this.usersService.createUser(user)
      .subscribe((res: IUser) => {
        this.users.push(res);
      });
  }

  addToCheckedList(user: IUser) {
    if (this.checkedUsers.includes(user.id)) {
      this.checkedUsers = this.checkedUsers.filter(checkedUser => checkedUser !== user.id);
    } else {
      this.checkedUsers.push(user.id);
    }
  }

  deleteUsers() {
    for (const id of this.checkedUsers) {
      this.users = this.users.filter(u => u.id !== id);
      this.usersService.deleteUser(id).subscribe();
      this.checkedUsers = this.checkedUsers.filter(u => u !== id);
    }
  }
}
