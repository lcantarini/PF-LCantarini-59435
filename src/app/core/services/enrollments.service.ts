import { Injectable } from '@angular/core';
import { Enrollment } from '../../features/dashboard/enrollment/models';
import { generateStringRandom } from '../../shared/utils';
import { Student } from '../../features/dashboard/students/models';
import { Course } from '../../features/dashboard/courses/models';
import { User } from '../../features/dashboard/users/models';
import { UsersService } from './users.service';
import { delay, map, Observable, of } from 'rxjs';

// id: string;
// student: Student;
// course: Course;
// user: User;
// enrollAt: Date;

export let MY_USERS_DB: User[] = [
  {id: '1', firstName: 'Hydrogen',  lastName: 'Gonzalez', createdAt: new Date(), email: 'Hydrogen@gmail.com', password: 'uno23456', token: generateStringRandom(20)},
  {id: '2', firstName: 'Helium', lastName: 'Gomez', createdAt: new Date(), email: 'Helium@gmail.com', password: 'uno23456', token: generateStringRandom(20)},
  {id: '3', firstName: 'Lithium', lastName: 'Perez', createdAt: new Date(), email: 'Lithium@gmail.com', password: 'uno23456', token: generateStringRandom(20)},
];

export let MY_STUDENTS_DB: Student[] = [
  {id: '1', firstName: 'Hydrogen',  lastName: 'Gonzalez', createdAt: new Date(), email: 'Hydrogen@gmail.com'},
  {id: '2', firstName: 'Helium', lastName: 'Gomez', createdAt: new Date(), email: 'Helium@gmail.com'},
  {id: '3', firstName: 'Lithium', lastName: 'Perez', createdAt: new Date(), email: 'Lithium@gmail.com'},
];

export let MY_COURSES_DB: Course[] = 
[
  {id: generateStringRandom(4), name: 'Angular', startAt: new Date(), endAt: new Date(), createdAt: new Date()},
  {id: generateStringRandom(4), name: 'Api con Express JS', startAt: new Date(), endAt: new Date(), createdAt: new Date(),},
  {id: generateStringRandom(4), name: 'MariaDB', startAt: new Date(), endAt: new Date(), createdAt: new Date(),},
];
export let MY_ENROLLMENTS_DB: Enrollment[] = 
[
  {id: generateStringRandom(4), student: MY_STUDENTS_DB[0], course: MY_COURSES_DB[0], user: MY_USERS_DB[0], enrolledAt: new Date()},
  {id: generateStringRandom(4), student: MY_STUDENTS_DB[0], course: MY_COURSES_DB[1], user: MY_USERS_DB[0], enrolledAt: new Date()},
  {id: generateStringRandom(4), student: MY_STUDENTS_DB[2], course: MY_COURSES_DB[2], user: MY_USERS_DB[2], enrolledAt: new Date()},
  {id: generateStringRandom(4), student: MY_STUDENTS_DB[1], course: MY_COURSES_DB[1], user: MY_USERS_DB[1], enrolledAt: new Date()},
  ];

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor() { }

  getById(id: string): Observable<Enrollment | undefined > {
    return this.getEnrollments().pipe(map((enrollments) => enrollments.find((e) => e.id === id)));
  }

  getEnrollments(): Observable<Enrollment[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(MY_ENROLLMENTS_DB);
        observer.complete();
      }, 2000);
    });
  }

  removeEnrollmentById(id: string): Observable<Enrollment[]> {
    MY_ENROLLMENTS_DB = MY_ENROLLMENTS_DB.filter((e) => e.id !== id);
    return of(MY_ENROLLMENTS_DB).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<Course>) {
    MY_COURSES_DB = MY_COURSES_DB.map((course) =>
      course.id === id ? { ...course, ...update } : course
    );

    return new Observable<Enrollment[]>((observer) => {
      setInterval(() => {
        observer.next(MY_ENROLLMENTS_DB);
        observer.complete();
      }, 1000);
    });

  }

  insertEnrollment(enrollment: Enrollment) : Observable<Enrollment[]> {
    MY_ENROLLMENTS_DB = [ ...MY_ENROLLMENTS_DB, enrollment ];

    return of(MY_ENROLLMENTS_DB);
  }

}
