import { Injectable } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { IUser, users } from '../../users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersList: IUser[] = this.getUsers();

  checkedUsers: number[] = [];

  constructor() { }

  getUsers() {
    return users.map(i => {
      return { ...i, checked: false }
    });
  }

  deleteUsers() {
    const s = new Set(this.checkedUsers);
    this.usersList = this.usersList.filter(user => {
      return !s.has(user.id);
    });

    this.checkedUsers = [];
  }

  selectAllUsers() {
    this.usersList = this.usersList.map(i => {
      return { ...i, checked: true }
    });

    this.checkedUsers = this.usersList.map(i => i.id);
  }

  sortUsers(event: MatSelectChange) {
    const { value } = event;

    switch (value) {
      case "asc":
        this.usersList = this.usersList.sort((a, b) => `${b.firstname} ${b.lastname}`.localeCompare(`${a.firstname} ${a.lastname}`));
        break;
      case "desc":
        this.usersList = this.usersList.sort((a, b) => `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`));
        break;
    }
  }

  searchUsers(event: Event) {
    let searchVal = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (!searchVal.length) {
      this.usersList = this.getUsers().map(i => this.checkedUsers.includes(i.id) ? { ...i, checked: true } : { ...i, checked: false });
      return;
    }

    this.usersList = this.usersList.filter(item => {
      return item.firstname.trim().toLocaleLowerCase().includes(searchVal) || item.lastname.trim().toLocaleLowerCase().includes(searchVal);
    });
  }

}
