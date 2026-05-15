import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CoursesAdmin from "./CoursesAdmin";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage() {
  const session = await getSession();
  if (!session.userId) redirect("/admin/login");
  const courses = await prisma.course.findMany({
    orderBy: { order: "asc" },
    include: { enrollments: true },
  });
  return <CoursesAdmin initialCourses={courses as any} />;
}
