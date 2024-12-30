const Course = require('../models/Course');
const Student = require('../models/Student');

exports.getAllCourses = async (req, res) => {
  try {
    if (req.user.role === 'Staff') {
      // Staff sees all courses
      const courses = await Course.find();
      return res.json(courses);
    } else if (req.user.role === 'Student') {
      // Students see only their enrolled courses
      const student = await Student.findById(req.user.referenceId).populate('enrolledCourses');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      return res.json(student.enrolledCourses);
    } else {
      return res.status(403).json({ message: 'Permission denied' });
    }
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
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params; // 'id' here will refer to the courseId
    const updatedCourse = await Course.findOneAndUpdate(
      { courseId: id }, // Query by courseId instead of _id
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course updated successfully',
      course: updatedCourse,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.enrollStudent = async (req, res) => {
  try {
    const { courseId, studentId } = req.body;

    // Find the course by courseId
    const course = await Course.findOne({ courseId });
    // Find the student by studentId
    const student = await Student.findOne({ studentId }).populate('enrolledCourses');

    if (!course || !student) {
      return res.status(404).json({ message: 'Course or Student not found' });
    }

    // Check if the course is full
    if (course.enrolledStudents.length >= course.maxStudents) {
      return res.status(400).json({ message: 'Course is full' });
    }

    // Check if the student is already enrolled
    if (course.enrolledStudents.includes(student._id)) {
      return res.status(400).json({ message: 'Student already enrolled' });
    }

    // Add the course's _id to the student's enrolledCourses
    student.enrolledCourses.push(course._id);
    await student.save();

    // Add the student's _id to the course's enrolledStudents
    course.enrolledStudents.push(student._id);
    await course.save();

    res.status(200).json({ message: 'Enrollment successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params; // id here is the custom courseId

    // Find and delete the course by courseId instead of _id
    const course = await Course.findOneAndDelete({ courseId: id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

