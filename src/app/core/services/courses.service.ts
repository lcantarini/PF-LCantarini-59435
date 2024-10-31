import { Injectable } from '@angular/core';
import { Course } from '../../features/dashboard/courses/models';
import { generateStringRandom } from '../../shared/utils';
import { delay, map, Observable, of } from 'rxjs';

export let MY_COURSES_DB: Course[] = [
  {
    id: 'ts4l',
    name: 'Angular',
    startAt: new Date(),
    endAt: new Date(),
    createdAt: new Date(),
},
{
  id: 't4CL',
  name: 'Api con Express JS',
  startAt: new Date(),
  endAt: new Date(),
  createdAt: new Date(),
},
{
  id: 'NWcZ',
  name: 'MariaDB',
  startAt: new Date(),
  endAt: new Date(),
  createdAt: new Date(),
},
{
  id: 'C7PA',
  name: 'React',
  startAt: new Date(),
  endAt: new Date(),
  createdAt: new Date(),
},
{
  id: 'Glo4',
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
      
        observer.next(MY_COURSES_DB);
        observer.complete();
     
    });
  }

  removeCourseById(id: string): Observable<Course[]> {
    MY_COURSES_DB = MY_COURSES_DB.filter((c) => c.id !== id);
    return of(MY_COURSES_DB).pipe(delay(1000));
  }

  updateCourseById(id: string, update: Partial<Course>) {
    MY_COURSES_DB = MY_COURSES_DB.map((course) =>
      course.id === id ? { ...course, ...update } : course
    );

    return new Observable<Course[]>((observer) => {
      
        observer.next(MY_COURSES_DB);
        observer.complete();

    });

  }

  insertCourse(course: Course) : Observable<Course[]> {
    MY_COURSES_DB = [ ...MY_COURSES_DB, course ];

    return of(MY_COURSES_DB);
  }


}
