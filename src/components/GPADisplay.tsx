import { Download, Award } from 'lucide-react';
import { Course } from '../types/course';

interface GPADisplayProps {
  gpa: number;
  courses: Course[];
  onGeneratePDF: () => void;
}

export default function GPADisplay({ gpa, courses, onGeneratePDF }: GPADisplayProps) {
  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credit_hours), 0);

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.75) return 'text-green-600';
    if (gpa >= 3.0) return 'text-blue-600';
    if (gpa >= 2.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGPABgColor = (gpa: number) => {
    if (gpa >= 3.75) return 'bg-green-50';
    if (gpa >= 3.0) return 'bg-blue-50';
    if (gpa >= 2.0) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className={`p-8 ${getGPABgColor(gpa)}`}>
        <div className="flex items-center justify-center mb-4">
          <Award className={`${getGPAColor(gpa)}`} size={48} />
        </div>
        <h2 className="text-center text-gray-700 font-medium text-lg mb-2">Your GPA</h2>
        <div className={`text-6xl font-bold text-center ${getGPAColor(gpa)} mb-4`}>
          {gpa.toFixed(2)}
        </div>
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <div className="text-center">
            <p className="font-medium text-gray-800 text-xl">{courses.length}</p>
            <p className="text-gray-600">Courses</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-800 text-xl">{totalCredits.toFixed(1)}</p>
            <p className="text-gray-600">Total Credits</p>
          </div>
        </div>
      </div>

      {courses.length > 0 && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-white border-t border-gray-200">
          <button
            onClick={onGeneratePDF}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Download size={20} />
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
}
