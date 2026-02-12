import { useState } from 'react';
import { Plus } from 'lucide-react';
import { GradeValue } from '../types/course';

interface CourseFormProps {
  onAdd: (courseName: string, grade: GradeValue, credits: number) => void;
}

const GRADES: GradeValue[] = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

export default function CourseForm({ onAdd }: CourseFormProps) {
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState<GradeValue>('A');
  const [credits, setCredits] = useState('3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (courseName.trim() && credits) {
      onAdd(courseName.trim(), grade, Number(credits));
      setCourseName('');
      setGrade('A');
      setCredits('3');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Add Course</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="e.g., Computer Science 101"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              id="grade"
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeValue)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white"
              required
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="credits" className="block text-sm font-medium text-gray-700 mb-1">
              Credit Hours
            </label>
            <input
              id="credits"
              type="number"
              min="0.5"
              max="10"
              step="0.5"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>
    </form>
  );
}
