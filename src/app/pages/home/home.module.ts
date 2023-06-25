import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { FormComponent } from './form/form.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
