import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./interceptors";



@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class CoreModule { }
