const Course = require('../models/Course');
const Student = require('../models/Student');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { courseId, courseName, lecturer, credits, maxStudents } = req.body;

    // Validate credits range
    if (credits < 3 || credits > 5) {
      return res.status(400).json({ message: 'Credits must be between 3 and 5' });
    }

    const newCourse = new Course({ courseId, courseName, lecturer, credits, maxStudents });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    const course = await Course.findById(courseId);
    const student = await Student.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: 'Course or Student not found' });
    }

    // Check course capacity
    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({ message: 'Course is full' });
    }

    // Check if student is already enrolled
    if (course.enrolledStudents.includes(studentId)) {
      return res.status(400).json({ message: 'Student already enrolled' });
    }

    // Enroll student
    course.enrolledStudents.push(studentId);
    await course.save();

    // Add course to student's enrollments
    student.enrolledCourses.push(courseId);
    await student.save();

    res.status(200).json({ message: 'Enrollment successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await Course.findByIdAndDelete(id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
