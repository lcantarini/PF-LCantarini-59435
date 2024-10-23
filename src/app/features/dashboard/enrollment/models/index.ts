import { Course } from "../../courses/models";
import { User } from "../../users/models";

export interface Enrollment {
    id: string;
    user: User;
    course: Course;
    enrollAt: Date;
}