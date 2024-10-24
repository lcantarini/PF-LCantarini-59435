import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassRoutingModule } from './class-routing.module';
import { ClassComponent } from './class.component';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';


@NgModule({
  declarations: [
    ClassComponent,
    ClassDialogComponent
  ],
  imports: [
    CommonModule,
    ClassRoutingModule
  ]
})
export class ClassModule { }
