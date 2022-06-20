import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {data} from "autoprefixer";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  path = environment.baseURI + 'categories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<{ count: number, rows: Array<any> }> {
    return this.http.get<any>(this.path);
  }
  getById(id: number): Observable<any> {
    return this.http.get(this.path + `/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.get(this.path , data);
  }
  update(data: any): Observable<any> {
    return this.http.put(this.path,  data);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(this.path + `/${id}`);
  }

  getAllWithTopics(): Observable<{ count: number, rows: Array<any> }> {
    return this.http.get<any>(this.path + '/topics');
  }
}
