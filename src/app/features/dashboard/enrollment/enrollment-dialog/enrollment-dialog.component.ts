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
  usersList: User[]=[];

  constructor(
    private matDialogRef: MatDialogRef<EnrollmentDialogComponent>,
    private formBuilder: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data?: EnrollmentDialogData
   ){
    console.log(data);

    this.enrollmentForm = this.formBuilder.group({
      student: [null, [Validators.required]],
      course: [null, [Validators.required]],
    });
    this.loadUsers();
    this.loadCourses();
    this.loadStudents();
    this.patchFormValue();
  }

  loadStudents(): void {
    this.studentsService.getStudents().subscribe({
      next: (student) => this.studentsList=student
    });
  }

  loadUsers(): void {
    this.usersService.getUsers().subscribe({
      next: (user) => this.usersList = user
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
      const course = this.coursesList.find(c=>c.id===this.data?.editingEnrollment?.course.id);
      const student = this.studentsList.find(s=>s.id===this.data?.editingEnrollment?.student.id);
      this.enrollmentForm.patchValue({...this.data.editingEnrollment,course,student});
    }
  }

  onSave(): void {
    console.log(this.enrollmentForm.value);
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
      });
    }
    
  }

}
