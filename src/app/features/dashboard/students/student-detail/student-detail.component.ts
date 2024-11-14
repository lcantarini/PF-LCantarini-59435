import { Component } from '@angular/core';
import { Student } from '../models';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../../core/services/students.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {
  studentDetailed?: Student;

  constructor(private activatedRoute: ActivatedRoute, private studentsService: StudentsService) {
    this.loadUsers(activatedRoute.snapshot.params['id']);
  }

  loadUsers(id: string): void {
    this.studentsService.getById(id).subscribe({
      next: (student) => this.studentDetailed = student
    });
  }

}