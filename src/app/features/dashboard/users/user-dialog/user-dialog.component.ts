import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs';
import { generateStringRandom } from '../../../../shared/utils';
import { User } from '../models';

interface UserDialogData {
  editingUser?: User;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: ``
})
export class UserDialogComponent {
  userForm: FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data?: UserDialogData
   ){
    console.log(data);

    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
    });
  }


  onSave(): void {
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        id: generateStringRandom(4),
        createdAt: new Date(),
      });
    }
    
  }

}
