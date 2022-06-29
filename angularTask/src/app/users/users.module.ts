import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserCardComponent } from './user-card/user-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserListTopComponent } from './user-list/user-list-top/user-list-top.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations:
    [
      UserCardComponent,
      UserListComponent,
      UserListTopComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  providers: []
})
export class UsersModule { }
