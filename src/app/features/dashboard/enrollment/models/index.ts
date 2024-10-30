import { Course } from "../../courses/models";
import { Student } from "../../students/models";
import { User } from "../../users/models";

export interface Enrollment {
    id: string;
    student: Student;
    course: Course;
    user: User;
    enrolledAt: Date;
}