import { Injectable } from '@angular/core';
import { Student } from '../../features/dashboard/students/models';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) { }

  getById(id: string): Observable<Student | undefined> {
    return this.httpClient.get<Student>(`${this.baseURL}/students/${id}`);
  }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseURL}/students`)
  }

  removeStudentById(id: string): Observable<Student[]> {
    return this.httpClient
      .delete<Student>(`${this.baseURL}/students/${id}`)
      .pipe(concatMap(() => this.getStudents()));
  }

  updateStudentById(id: string, update: Partial<Student>) {
    return this.httpClient
      .patch<Student>(`${this.baseURL}/students/${id}`, update)
      .pipe(concatMap(() => this.getStudents()));
  }

  insertStudent(data: Omit<Student, 'id'>) : Observable<Student> {
    return this.httpClient.post<Student>(`${this.baseURL}/students`, {
      ...data,
      createdAt: new Date().toISOString(),
    });
  }
}
