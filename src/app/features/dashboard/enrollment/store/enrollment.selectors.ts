import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromEnrollment from './enrollment.reducer';

export const selectEnrollmentState = createFeatureSelector<fromEnrollment.State>(
  fromEnrollment.enrollmentFeatureKey
);

export const selectEnrollments = createSelector(
  selectEnrollmentState, 
  (state) => state.enrollments
)

export const selectUserOptions = createSelector(
  selectEnrollmentState, 
  (state) => state.userOptions
)

export const selectCourseOptions = createSelector(
  selectEnrollmentState, 
  (state) => state.courseOptions
)

export const selectStudentOptions = createSelector(
  selectEnrollmentState, 
  (state) => state.studentOptions
)
