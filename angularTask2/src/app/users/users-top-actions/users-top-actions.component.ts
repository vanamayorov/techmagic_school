import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotifyBarService } from 'src/app/shared/services/notify-bar.service';

@Component({
  selector: 'app-users-top-actions',
  templateUrl: './users-top-actions.component.html',
  styleUrls: ['./users-top-actions.component.scss']
})
export class UsersTopActionsComponent implements OnInit {
  @Output() fetchUsers = new EventEmitter();
  @Output() deleteUsers = new EventEmitter();
  @Input() checkedUsers: number[] = [];

  constructor(private notifyService: NotifyBarService) { }

  ngOnInit(): void {
  }

  fetchAll() {
    this.fetchUsers.emit();
    this.notifyService.notify("All users were fetched");
  }

  deleteAll() {
    this.deleteUsers.emit();
    this.notifyService.notify("Some users were deleted");
  }

}
