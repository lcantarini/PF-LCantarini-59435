import { Injectable } from '@angular/core';
import { Course } from '../../features/dashboard/courses/models';
import { generateStringRandom } from '../../shared/utils';
import { Observable, of } from 'rxjs';

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

  getCourses(): Observable<Course[]> {
    return of([...MY_COURSES_DB]);
  }

  deleteById(id: string): Observable<Course[]> {
    MY_COURSES_DB = MY_COURSES_DB.filter((c) => c.id !== id);
    return this.getCourses();
  }
}
