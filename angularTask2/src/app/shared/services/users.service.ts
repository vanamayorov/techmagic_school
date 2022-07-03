import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL = "https://jsonplaceholder.typicode.com";
  model = "users";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
  };

  constructor(private http: HttpClient) { }

  private getUrl() {
    return `${this.BASE_URL}/${this.model}`;
  }

  private getUrlWithID(id: number) {
    return `${this.getUrl()}/${id}`;
  }

  getAllUsers() {
    return this.http.get<IUser[]>(this.getUrl())
      .pipe(
        catchError(this.handleError<IUser[]>('getAllUsers', []))
      );
  }

  updateUser(user: IUser) {
    return this.http.put<IUser>(this.getUrlWithID(user.id), user, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>("updateUser"))
      );
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.getUrl(), user, this.httpOptions)
      .pipe(catchError(this.handleError<IUser>("createUser")));
  }

  deleteUser(id: number) {
    return this.http.delete<IUser>(this.getUrlWithID(id))
    .pipe(catchError(this.handleError<IUser>("deleteUser")));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
