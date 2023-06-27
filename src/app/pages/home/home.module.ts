import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { HomeComponent } from "./home.component";
import {AddUserFormComponent} from "./add-user-form/add-user-form.component";


@NgModule({
  declarations: [
    HomeComponent,
    AddUserFormComponent

  ],
  imports: [
    HomeRoutingModule,
    SharedModule,

  ]
})
export class HomeModule { }
