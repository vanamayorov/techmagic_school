import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModule } from '../material.module';
import { UsersFormComponent } from './users-form/users-form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersTopActionsComponent } from './users-top-actions/users-top-actions.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    UsersFormComponent,
    UsersTopActionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [UsersComponent]
})
export class UsersModule { }
