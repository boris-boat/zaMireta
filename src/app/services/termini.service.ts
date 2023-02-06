import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class TerminiService {

  constructor(private http: HttpClient) { }
  getData() {
    return this.http.get<User[]>("https://podsetnik.herokuapp.com/mire")
  }
  saveUser(user: any) {
    return this.http.post("https://podsetnik.herokuapp.com/mire/saveUser", user)
  }
}
