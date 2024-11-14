import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
  passwordInputType: 'password' | 'text' = 'password';
  userForm: FormGroup;
  constructor(
    private matDialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData
   ){

    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required,Validators.pattern('^[a-zA-Z ]+$')]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required,Validators.email]],
      password: [null, [Validators.required]],
      profile: [null, [Validators.required]]
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return this.data?.editingUser
  }

  patchFormValue() {
    if (this.data?.editingUser) {
      this.userForm.patchValue(this.data.editingUser)
    }
  }

  togglePasswordInputType(): void {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }


  onSave(): void {
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        id: this.isEditing
         ? this.data!.editingUser!.id 
         : generateStringRandom(4),
        createdAt: this.isEditing
        ? this.data!.editingUser!.createdAt
        : new Date(),
      });
    }
    
  }

}
