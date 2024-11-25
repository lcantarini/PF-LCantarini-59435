import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentActions } from './enrollment.actions';
import { Enrollment } from '../models';
import { User } from '../../users/models';
import { Course } from '../../courses/models';
import { state } from '@angular/animations';
import { generateStringRandom } from '../../../../shared/utils';
import { Student } from '../../students/models';

export const enrollmentFeatureKey = 'enrollment';

const ENROLLMENTS_DB: Enrollment[] = [
  {
    "id": "Jhhj",
    "studentId": "1",
    "courseId": "ts4l",
    "userId": "1",
    "enrolledAt": new Date("2024-10-24T00:15:26.790Z")
  },
  {
    "id": "CBDb",
    "studentId": "1",
    "courseId": "t4CL",
    "userId": "1",
    "enrolledAt": new Date("2024-10-24T00:15:26.790Z")
  }
]

const USER_DB: User[] = []

const COURSE_DB: Course[] = []

const STUDENT_DB: Student[] = []



export interface State {
  isLoadingEnrollments: boolean;
  loadEnrollmentsError: unknown;
  enrollments: Enrollment[];
  userOptions: User[];
  courseOptions: Course[];
  studentOptions: Student[];
}

export const initialState: State = {
  isLoadingEnrollments: false,
  loadEnrollmentsError: null,
  enrollments: [],
  userOptions: [],
  courseOptions: [],
  studentOptions: [],
};

export const reducer = createReducer(
  initialState,
  on(EnrollmentActions.loadEnrollments, (state) => {
    return {
      ...state,
      isLoadingEnrollments: true
    };
  }),
  on(EnrollmentActions.loadEnrollmentsSuccess, (state, action) => {
    return {
      ...state,
      enrollments: action.data,
      loadEnrollmentsError: null,
      isLoadingEnrollments: false
    }
  }),
  on(EnrollmentActions.loadEnrollmentsFailure, (state, action) => {
    return {
      ...state,
      ...initialState,
      loadEnrollmentsError: action.error,
      isLoadingEnrollments: false
    }
  }),
  on(EnrollmentActions.loadCourseOptions, (state) => {
    return {
      ...state,
      courseOptions: [...COURSE_DB],
    };
  }),
  on(EnrollmentActions.loadUserOptions, (state) => {
    return {
      ...state,
      userOptions: [...USER_DB],
    };
  }),
  on(EnrollmentActions.loadStudentOptions, (state) => {
    return {
      ...state,
      studentOptions: [...STUDENT_DB],
    };
  }),
  on(EnrollmentActions.createEnrollment, (state, action) => {
    return {
      ...state,
      enrollments: [
        ...state.enrollments,
        {
          id: generateStringRandom(4),
          userId: action.userId,
          courseId: action.courseId,
          studentId: action.studentId,
          enrolledAt: new Date()
        },
      ],
    };
  })
);
export const enrollmentFeature = createFeature({
  name: enrollmentFeatureKey,
  reducer,
});

