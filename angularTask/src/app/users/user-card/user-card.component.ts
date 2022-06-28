import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser, User } from '../../users';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user!: IUser;
  @Output() check = new EventEmitter();
  constructor() { }

  ngOnInit(): void {}

}
