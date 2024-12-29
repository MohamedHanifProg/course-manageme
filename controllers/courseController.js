const Course = require('../models/Course');

// Add a new course
exports.addCourse = async (req, res) => {
  try {
    const { courseId, courseName, lecturer, creditPoints, maxStudents } = req.body;
    const course = new Course({ courseId, courseName, lecturer, creditPoints, maxStudents, students: [] });
    await course.save();
    res.status(201).json({ message: 'Course added successfully', course });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add course', details: error.message });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve courses', details: error.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update course', details: error.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete course', details: error.message });
  }
};
