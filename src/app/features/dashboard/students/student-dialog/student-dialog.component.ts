import { Component, Inject } from '@angular/core';
import { generateStringRandom } from '../../../../shared/utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../models';

interface StudentDialogData {
  editingStudent?: Student;
}

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styles: ``
})
export class StudentDialogComponent {
  studentForm: FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<StudentDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: StudentDialogData
   ){
    console.log(data);

    this.studentForm = this.formBuilder.group({
      firstName: [null, [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return this.data?.editingStudent
  }

  patchFormValue() {
    if (this.data?.editingStudent) {
      this.studentForm.patchValue(this.data.editingStudent)
    }
  }


  onSave(): void {
    if (this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.studentForm.value,
        id: this.isEditing
         ? this.data!.editingStudent!.id 
         : generateStringRandom(4),
        createdAt: this.isEditing
        ? this.data!.editingStudent!.createdAt
        : new Date(),
      });
    }
    
  }

}
