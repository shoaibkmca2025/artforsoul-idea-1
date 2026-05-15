import CoursesAdmin from "./CoursesAdmin";
import { courses } from "@/lib/data";

export default function AdminCoursesPage() {
  const coursesWithEnrollments = courses.map((c) => ({ ...c, enrollments: [] }));
  return <CoursesAdmin initialCourses={coursesWithEnrollments as any} />;
}
