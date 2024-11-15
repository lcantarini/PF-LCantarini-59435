import { Component, OnInit } from '@angular/core';
import { Enrollment } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses.service';
import { EnrollmentsService } from '../../../core/services/enrollments.service';
import { EnrollmentDialogComponent } from './enrollment-dialog/enrollment-dialog.component';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrl: './enrollment.component.scss'
})
export class EnrollmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'student', 'course', 'user', 'enrolledAt', 'actions'];
   
  isLoading: boolean = false;
  dataSource: Enrollment[] = [];

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private enrollmentsService: EnrollmentsService,
    private activatedRoute: ActivatedRoute    
  ) {}
  
  ngOnInit(): void {
    this.loadEnrollments();
  }
  
  loadEnrollments() {
    this.isLoading = true;
    this.enrollmentsService.getEnrollments().subscribe({
      next: (enrollments) => {
        this.dataSource = enrollments;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.isLoading = true;
      this.enrollmentsService.removeEnrollmentById(id).subscribe({
        next: (enrollments) => {
          this.dataSource = enrollments;
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
  openModal(editingEnrollment?: Enrollment ): void {
    this.matDialog
      .open(EnrollmentDialogComponent, {
        data: {
          editingEnrollment,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result){
            if (editingEnrollment) {
              this.handleUpdate(editingEnrollment.id, result);
            } else {
              console.log("---")
              console.log(result);
              this.handleInsert(result);
            }
            
          }
        }
      });
  }

  handleUpdate(id: string, update: Enrollment): void {
    this.isLoading = true;
    this.enrollmentsService.updateEnrollmentById(id, update).subscribe({
      next: (enrollments) => {
        this.dataSource = enrollments;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  handleInsert( update: Enrollment): void {
    
    this.isLoading = true;
    this.enrollmentsService.insertEnrollment(update).subscribe({
      next: (enrollments) => {
        this.loadEnrollments();
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
