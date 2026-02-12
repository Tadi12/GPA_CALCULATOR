import jsPDF from 'jspdf';
import { Course } from '../types/course';
import { GRADE_SCALE } from './gpa';

export const generateGPAReport = (courses: Course[], gpa: number) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('TADIGPA CALCULATOR', 105, 20, { align: 'center' });

  doc.setFontSize(16);
  doc.text('GPA Report', 105, 30, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 105, 40, { align: 'center' });

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(`Overall GPA: ${gpa.toFixed(2)}`, 105, 55, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Course Name', 20, 75);
  doc.text('Grade', 120, 75);
  doc.text('Credits', 150, 75);
  doc.text('Points', 175, 75);

  doc.setLineWidth(0.5);
  doc.line(20, 78, 190, 78);

  let yPos = 88;
  doc.setFont('helvetica', 'normal');

  courses.forEach((course, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }

    const gradeValue = GRADE_SCALE[course.grade_letter];
    const points = gradeValue * Number(course.credit_hours);

    doc.text(course.course_name.substring(0, 35), 20, yPos);
    doc.text(course.grade_letter, 120, yPos);
    doc.text(course.credit_hours.toString(), 150, yPos);
    doc.text(points.toFixed(2), 175, yPos);

    yPos += 10;
  });

  yPos += 10;
  doc.setLineWidth(0.5);
  doc.line(20, yPos - 5, 190, yPos - 5);

  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credit_hours), 0);
  const totalPoints = courses.reduce((sum, c) => sum + (GRADE_SCALE[c.grade_letter] * Number(c.credit_hours)), 0);

  doc.setFont('helvetica', 'bold');
  doc.text('Total:', 20, yPos);
  doc.text(totalCredits.toFixed(1), 150, yPos);
  doc.text(totalPoints.toFixed(2), 175, yPos);

  doc.save('gpa-report.pdf');
};
