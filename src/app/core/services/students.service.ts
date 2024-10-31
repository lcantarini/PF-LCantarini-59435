import { Injectable } from '@angular/core';
import { Student } from '../../features/dashboard/students/models';
import { delay, map, Observable, of } from 'rxjs';

export let MY_STUDENTS_DB: Student[] = [
  {id: '1', firstName: 'Hydrogen',  lastName: 'Gonzalez', createdAt: new Date(), email: 'Hydrogen@gmail.com'},
  {id: '2', firstName: 'Helium', lastName: 'Gomez', createdAt: new Date(), email: 'Helium@gmail.com'},
  {id: '3', firstName: 'Lithium', lastName: 'Perez', createdAt: new Date(), email: 'Lithium@gmail.com'},
  {id: '4', firstName: 'Beryllium', lastName: 'Fernandez', createdAt: new Date(), email: 'Beryllium@gmail.com'},
  {id: '5', firstName: 'Boron', lastName: 'Aguilera', createdAt: new Date(), email: 'Boron@gmail.com'},
];

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor() { }

  getById(id: string): Observable<Student | undefined> {
    return this.getStudents().pipe(map((student) => student.find((u) => u.id === id)));
  }

  getStudents(): Observable<Student[]> {
    return new Observable((observer) => {

        observer.next(MY_STUDENTS_DB);
        observer.complete();

    });
  }

  removeStudentById(id: string): Observable<Student[]> {
    MY_STUDENTS_DB = MY_STUDENTS_DB.filter((student) => student.id != id);
    return of(MY_STUDENTS_DB).pipe(delay(1000));
  }

  updateStudentById(id: string, update: Partial<Student>) {
    MY_STUDENTS_DB = MY_STUDENTS_DB.map((student) =>
      student.id === id ? { ...student, ...update } : student
    );

    return new Observable<Student[]>((observer) => {

        observer.next(MY_STUDENTS_DB);
        observer.complete();

    });
  }

  insertStudent(student: Student) : Observable<Student[]> {
    MY_STUDENTS_DB = [ ...MY_STUDENTS_DB, student ];

    return of(MY_STUDENTS_DB);
  }
}
