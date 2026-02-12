import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { supabase } from './lib/supabase';
import { Course, GradeValue } from './types/course';
import { calculateGPA } from './utils/gpa';
import { generateGPAReport } from './utils/pdf';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import GPADisplay from './components/GPADisplay';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCourse = async (courseName: string, grade: GradeValue, credits: number) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([{ course_name: courseName, grade_letter: grade, credit_hours: credits }])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setCourses([...courses, data]);
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course. Please try again.');
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      const { error } = await supabase.from('courses').delete().eq('id', id);

      if (error) throw error;
      setCourses(courses.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course. Please try again.');
    }
  };

  const handleGeneratePDF = () => {
    const gpa = calculateGPA(courses);
    generateGPAReport(courses, gpa);
  };

  const gpa = calculateGPA(courses);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="text-blue-600" size={48} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              TADIGPA CALCULATOR
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Track your academic performance with precision
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CourseForm onAdd={addCourse} />
            <CourseList courses={courses} onDelete={deleteCourse} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <GPADisplay gpa={gpa} courses={courses} onGeneratePDF={handleGeneratePDF} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
