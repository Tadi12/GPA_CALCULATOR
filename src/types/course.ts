export type GradeValue = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D' | 'F';

export interface Course {
  id: string;
  course_name: string;
  grade_letter: GradeValue;
  credit_hours: number;
  created_at: string;
}

export interface GradeScale {
  [key: string]: number;
}
