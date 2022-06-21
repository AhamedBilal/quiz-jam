import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private userData = new BehaviorSubject(null);
  currentUserData = this.userData.asObservable();
  userDataObj: any;

  constructor() { }


  changeUserData(obj: any) {
    this.userData.next(obj);
  }

}
