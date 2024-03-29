import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  path = environment.baseURI + 'topics';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(this.path);
  }
  getById(id: number): Observable<any> {
    return this.http.get(this.path + `/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(this.path , data);
  }
  update(data: any): Observable<any> {
    return this.http.put(this.path,  data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.path + `/${id}`);
  }


}
