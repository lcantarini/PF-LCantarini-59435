import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { Course } from './models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'startAt', 'endAt', 'createdAt', 'actions'];
   
  isLoading: boolean = false;
  dataSource: Course[] = [];

  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private coursesService: CoursesService,
    private activatedRoute: ActivatedRoute    
  ) {}
  
  ngOnInit(): void {
    this.loadCourses();
  }
  
  loadCourses() {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.dataSource = courses;
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
      this.coursesService.removeCourseById(id).subscribe({
        next: (courses) => {
          this.dataSource = courses;
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
  openModal(editingCourse?: Course ): void {
    this.matDialog
      .open(CourseDialogComponent, {
        data: {
          editingCourse,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result){
            if (editingCourse) {
              this.handleUpdate(editingCourse.id, result);
            } else {
              this.handleInsert(result);
            }
            
          }
        }
      });
  }

  handleUpdate(id: string, update: Course): void {
    this.isLoading = true;
    this.coursesService.updateCourseById(id, update).subscribe({
      next: (courses) => {
        this.dataSource = courses;
      },
      error: (err) => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  handleInsert( update: Course): void {
    this.isLoading = true;
    this.coursesService.insertCourse(update).subscribe({
      next: (courses) => {
        this.dataSource = courses;
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
