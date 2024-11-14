import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../../core/services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './models';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions' ];
  dataSource: Student[] = [];

  isLoading = false;

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentsService: StudentsService

  ){}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (student) => {
        this.dataSource = student;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;
      this.studentsService.removeStudentById(id).subscribe({
        next: (student) => {
          this.dataSource = student;
        },
        error: (err) => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  goToDetail(id: string): void {
    this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute})
  }

//
  openModal(editingStudent?: Student ): void {
    this.matDialog
      .open(StudentDialogComponent, {
        data: {
          editingStudent,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result){
            if (editingStudent) {
              this.handleUpdate(editingStudent.id, result);
            } else {
              this.handleInsert(result);
            }
            
          }
        }
      });
  }

  handleUpdate(id: string, update: Student): void {
    this.isLoading = true;
    this.studentsService.updateStudentById(id, update).subscribe({
      next: (student) => {
        this.dataSource = student;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  handleInsert( update: Student): void {
    this.isLoading = true;
    this.studentsService.insertStudent(update).subscribe({
      next: (student) => {
        this.loadStudents();
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
