import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { UserFullnamePipe } from './pipes/user-fullname.pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    UserFullnamePipe,
    HighlightDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HighlightDirective,
  ]
})
export class SharedModule { }
