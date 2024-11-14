import { Component } from '@angular/core';
import { Course } from '../models';
import { CoursesService } from '../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  courseDetailed?: Course;

  constructor(private activatedRoute: ActivatedRoute, private courseService: CoursesService) {
    this.loadUsers(activatedRoute.snapshot.params['id']);
  }

  loadUsers(id: string): void {
    this.courseService.getById(id).subscribe({
      next: (course) => this.courseDetailed = course
    });
  }

}
