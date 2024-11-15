import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Enrollment } from '../models';
import { generateStringRandom } from '../../../../shared/utils';
import { CoursesService } from '../../../../core/services/courses.service';
import { StudentsService } from '../../../../core/services/students.service';
import { Student } from '../../students/models';
import { UsersService } from '../../../../core/services/users.service';
import { Course } from '../../courses/models';
import { User } from '../../users/models';
import { AuthService } from '../../../../core/services/auth.service';

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
 
  studentsList: Student[]=[];
  coursesList: Course[]=[];
  user?: User | null;

  constructor(
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data?: EnrollmentDialogData
   ){
    console.log(data);

    this.enrollmentForm = this.formBuilder.group({
      studentId: [null, [Validators.required]],
      courseId: [null, [Validators.required]],
    });
    this.loadAuth();
    this.loadCourses();
    this.loadStudents();
    this.patchFormValue();
  }

  loadStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (student) => this.studentsList=student
    });
  }

  loadAuth(): void {
    this.authService.authUser$.subscribe({
      next: (user) => this.user = user
    });
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (course) => this.coursesList = course
    });
  }

  private get isEditing() {
    return this.data?.editingEnrollment
  }

  patchFormValue() {
    if (this.data?.editingEnrollment) {
      const course = this.coursesList.find(c=>c.id===this.data?.editingEnrollment?.courseId);
      const student = this.studentsList.find(s=>s.id===this.data?.editingEnrollment?.studentId);
      this.enrollmentForm.patchValue({...this.data.editingEnrollment,course,student});
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
        enrolledAt: this.isEditing
        ? this.data!.editingEnrollment!.enrolledAt
        : new Date(),
        userId: this.user?.id
      });
    }
    
  }

}
