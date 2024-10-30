import { Component, Inject } from '@angular/core';
import { Course } from '../models';
import { generateStringRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker'; 

interface CourseDialogData {
  editingCourse?: Course;
}

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styles: ``
})
export class CourseDialogComponent {
  courseForm: FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<CourseDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData
   ){
    console.log(data);

    this.courseForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      startAt: [null, [Validators.required]],
      endAt: [null, [Validators.required]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return this.data?.editingCourse
  }

  patchFormValue() {
    if (this.data?.editingCourse) {
      
      this.courseForm.patchValue(this.data.editingCourse)
    }
  }

  onSave(): void {
    if (this.courseForm.invalid){
      this.courseForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.courseForm.value,
        id: this.isEditing
         ? this.data!.editingCourse!.id 
         : generateStringRandom(4),
        createdAt: this.isEditing
        ? this.data!.editingCourse!.createdAt
        : new Date(),
      });
    }
    
  }

}
