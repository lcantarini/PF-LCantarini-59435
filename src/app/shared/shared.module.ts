import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from './directives/highlight.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { UserFullNamePipe } from './pipes/user-fullname.pipe';
import { ReSizeTitleDirective } from './directives/re-size-title.directive';
import { studentFullNamePipe } from './pipes/student-fullname.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatListModule} from '@angular/material/list';




@NgModule({
  declarations: [
    UserFullNamePipe,
    HighlightDirective,
    ReSizeTitleDirective,
    studentFullNamePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    HighlightDirective,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    UserFullNamePipe,
    ReSizeTitleDirective,
    MatProgressSpinnerModule,
    studentFullNamePipe,
    MatListModule
  ]
})
export class SharedModule { }
