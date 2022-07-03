import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: any = [];
  @Output() selectUser = new EventEmitter<IUser>();
  @Output() toggleUserInCheckedList = new EventEmitter<IUser>();
  constructor() { }

  ngOnInit(): void {
  }
}
