import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("http://localhost:3000/users", data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  getUser(data: any) {
    return this.http.get<any>("http://localhost:3000/users")
      .pipe(map((res: any) => {
        return res
      }))
  }

  updateUser(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/users"+id,data)
      .pipe(map((res: any) => {
        return res
      }))
  }

  deleteUser(id: number) {
    return this.http.delete<any>("http://localhost:3000/users"+id)
      .pipe(map((res: any) => {
        return res
      }))
  }

  getTopic() {
    return this.http.get<any>("http://localhost:3000/topics")
      .pipe(map((res: any) => {
        return res
      }))
  }

  postComment(data: any) {
    return this.http.post<any>("http://localhost:3000/comments", data)
      .pipe(map((res: any) => {
        return res
      }))
  }
}