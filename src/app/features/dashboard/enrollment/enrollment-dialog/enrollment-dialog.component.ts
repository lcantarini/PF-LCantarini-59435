import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../models';
import { generateStringRandom } from '../../../../shared/utils';

interface EnrollmentDialogData {
  editingEnrollment?: Enrollment;
}

@Component({
  selector: 'app-enrollment-dialog',
  templateUrl: './enrollment-dialog.component.html',
  styles: ``
})
export class EnrollmentDialogComponent {
  enrollmentForm: FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: EnrollmentDialogData
   ){
    console.log(data);

    this.enrollmentForm = this.formBuilder.group({
      student: [null, [Validators.required]],
      course: [null, [Validators.required]],
      enrolledAt: [null, [Validators.required]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return this.data?.editingEnrollment
  }

  patchFormValue() {
    if (this.data?.editingEnrollment) {
      
      this.enrollmentForm.patchValue(this.data.editingEnrollment)
    }
  }

  onSave(): void {
    if (this.enrollmentForm.invalid){
      this.enrollmentForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.enrollmentForm.value,
        id: this.isEditing
         ? this.data!.editingEnrollment!.id 
         : generateStringRandom(4),
        createdAt: this.isEditing
        ? this.data!.editingEnrollment!.enrolledAt
        : new Date(),
      });
    }
    
  }

}
