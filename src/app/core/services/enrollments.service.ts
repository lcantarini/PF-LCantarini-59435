import { Injectable } from '@angular/core';
import { Enrollment } from '../../features/dashboard/enrollment/models';
import { generateStringRandom } from '../../shared/utils';
import { Student } from '../../features/dashboard/students/models';
import { Course } from '../../features/dashboard/courses/models';
import { User } from '../../features/dashboard/users/models';
import { UsersService } from './users.service';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

// id: string;
// student: Student;
// course: Course;
// user: User;
// enrollAt: Date;

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) { }

  getById(id: string): Observable<Enrollment | undefined > {
    return this.httpClient.get<Enrollment>(`${this.baseURL}/enrollments/${id}`);
  }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(`${this.baseURL}/enrollments?_embed=student&_embed=course&_embed=user`);
  }

  removeEnrollmentById(id: string): Observable<Enrollment[]> {
    return this.httpClient
      .delete<Enrollment>(`${this.baseURL}/enrollemnts/${id}`)
      .pipe(concatMap(() => this.getEnrollments()));
  }

  updateEnrollmentById(id: string, update: Partial<Enrollment>) {
    return this.httpClient
      .patch<Enrollment>(`${this.baseURL}/enrollments/${id}`, update)
      .pipe(concatMap(() => this.getEnrollments()));

  }

  insertEnrollment(data: Omit<Enrollment, 'id'>) : Observable<Enrollment> {
    return this.httpClient.post<Enrollment>(`${this.baseURL}/enrollments`, {
      //...data,
      studentId: data.studentId,
      courseId: data.courseId,
      userId: data.userId,
      enrolledAt: new Date().toISOString(),
    });
  }

}
