/*
  # TADIGPA Calculator - Courses Table

  1. New Tables
    - `courses`
      - `id` (uuid, primary key) - Unique identifier for each course
      - `course_name` (text) - Name of the course
      - `grade_letter` (text) - Grade received (A+, A, A-, B+, B, B-, C+, C, C-, D, F)
      - `credit_hours` (numeric) - Number of credit hours for the course
      - `created_at` (timestamptz) - Timestamp when course was added
  
  2. Security
    - Enable RLS on `courses` table
    - Add policy for public access (allows anyone to manage courses)
    
  3. Notes
    - This schema supports storing course information for GPA calculation
    - Public access is enabled for demo purposes (can be restricted with auth later)
*/

CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name text NOT NULL,
  grade_letter text NOT NULL,
  credit_hours numeric NOT NULL CHECK (credit_hours > 0),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can manage courses"
  ON courses
  FOR ALL
  USING (true)
  WITH CHECK (true);