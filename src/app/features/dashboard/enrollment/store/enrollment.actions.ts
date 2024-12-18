import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment } from '../models';

export const EnrollmentActions = createActionGroup({
  source: 'Enrollment',
  events: {
    'Load Enrollments': emptyProps(),
    'Load Enrollments Success': props<{ data: Enrollment[]}>(),
    'Load Enrollments Failure': props<{ error: Error}>(),
    'Load User Options': emptyProps(),
    'Load Course Options': emptyProps(),
    'loadStudentOptions': emptyProps(),
    'Create Enrollment': props<{ userId: string; courseId: string; studentId: string}>()
  }
});
