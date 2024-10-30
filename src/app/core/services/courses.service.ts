import { Injectable } from '@angular/core';
import { Course } from '../../features/dashboard/courses/models';
import { generateStringRandom } from '../../shared/utils';
import { delay, map, Observable, of } from 'rxjs';

export let MY_COURSES_DB: Course[] = [
  {
    id: generateStringRandom(4),
    name: 'Angular',
    startAt: new Date(),
    endAt: new Date(),
    createdAt: new Date(),
},
{
  id: generateStringRandom(4),
  name: 'Api con Express JS',
  startAt: new Date(),
  endAt: new Date(),
  createdAt: new Date(),
},
{
  id: generateStringRandom(4),
  name: 'MariaDB',
  startAt: new Date(),
  endAt: new Date(),
  createdAt: new Date(),
},
{
  id: generateStringRandom(4),
  name: 'React',
  startAt: new Date(),
  endAt: new Date(),
  createdAt: new Date(),
},
{
  id: generateStringRandom(4),
  name: 'MongoDB',
  startAt: new Date(),
  endAt: new Date(),
  createdAt: new Date(),
}

];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor() { }

  getById(id: string): Observable<Course | undefined > {
    return this.getCourses().pipe(map((courses) => courses.find((c) => c.id === id)));
  }

  getCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(MY_COURSES_DB);
        observer.complete();
      }, 2000);
    });
  }

  removeCourseById(id: string): Observable<Course[]> {
    MY_COURSES_DB = MY_COURSES_DB.filter((c) => c.id !== id);
    return of(MY_COURSES_DB).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<Course>) {
    MY_COURSES_DB = MY_COURSES_DB.map((course) =>
      course.id === id ? { ...course, ...update } : course
    );

    return new Observable<Course[]>((observer) => {
      setInterval(() => {
        observer.next(MY_COURSES_DB);
        observer.complete();
      }, 1000);
    });

  }

  insertUser(user: Course) : Observable<Course[]> {
    MY_COURSES_DB = [ ...MY_COURSES_DB, user ];

    return of(MY_COURSES_DB);
  }


}
