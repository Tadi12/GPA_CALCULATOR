import { Course, GradeScale } from '../types/course';

export const GRADE_SCALE: GradeScale = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.75,
  'B+': 3.25,
  'B': 3.0,
  'B-': 2.75,
  'C+': 2.25,
  'C': 2.0,
  'C-': 1.75,
  'D': 1.0,
  'F': 0.0,
};

export const calculateGPA = (courses: Course[]): number => {
  if (courses.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const gradeValue = GRADE_SCALE[course.grade_letter];
    const credits = Number(course.credit_hours);
    totalPoints += gradeValue * credits;
    totalCredits += credits;
  });

  return totalCredits > 0 ? totalPoints / totalCredits : 0;
};
