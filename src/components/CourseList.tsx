import { Trash2, BookOpen } from 'lucide-react';
import { Course } from '../types/course';
import { GRADE_SCALE } from '../utils/gpa';

interface CourseListProps {
  courses: Course[];
  onDelete: (id: string) => void;
}

export default function CourseList({ courses, onDelete }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
        <BookOpen className="mx-auto text-gray-400 mb-3" size={48} />
        <p className="text-gray-500 text-lg">No courses added yet</p>
        <p className="text-gray-400 text-sm mt-1">Add your first course to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-xl font-bold text-gray-800">Your Courses</h2>
        <p className="text-sm text-gray-600 mt-1">{courses.length} course{courses.length !== 1 ? 's' : ''} added</p>
      </div>
      <div className="divide-y divide-gray-200">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-5 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">{course.course_name}</h3>
                <div className="flex gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Grade:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {course.grade_letter}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Credits:</span>
                    <span className="text-gray-800">{course.credit_hours}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="font-medium">Points:</span>
                    <span className="text-gray-800">
                      {(GRADE_SCALE[course.grade_letter] * Number(course.credit_hours)).toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDelete(course.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete course"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
