const Course = require('../models/Course');
const Student = require('../models/Student');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        if (req.user.role === 'Staff') {
            const courses = await Course.find();
            return res.json(courses);
        } else if (req.user.role === 'Student') {
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

// Create a course
exports.createCourse = async (req, res) => {
    try {
        const { courseId, courseName, lecturer, credits, maxStudents } = req.body;

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

// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = await Course.findOneAndUpdate(
            { courseId: id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Enroll a student
exports.enrollStudent = async (req, res) => {
    try {
        const { courseId } = req.body;
        const student = await Student.findById(req.user.referenceId).populate('enrolledCourses');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const course = await Course.findOne({ courseId });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.enrolledStudents.length >= course.maxStudents) {
            return res.status(400).json({ message: 'Course is full' });
        }

        const totalCredits = student.enrolledCourses.reduce((sum, course) => sum + course.credits, 0);
        if (totalCredits + course.credits > 20) {
            return res.status(400).json({ message: 'Exceeds maximum allowed credits (20)' });
        }

        if (student.enrolledCourses.some(c => c._id.equals(course._id))) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        student.enrolledCourses.push(course._id);
        course.enrolledStudents.push(student._id);

        await student.save();
        await course.save();

        res.status(200).json({ message: 'Enrollment successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Unenroll a student
exports.unenrollStudent = async (req, res) => {
    try {
        const { courseId } = req.body;
        const student = await Student.findById(req.user.referenceId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        const course = await Course.findOne({ courseId });

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        student.enrolledCourses.pull(course._id);
        course.enrolledStudents.pull(student._id);

        await student.save();
        await course.save();

        res.status(200).json({ message: 'Unenrollment successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCourse = await Course.findOneAndDelete({ courseId: id });

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Update (swap) a student's course enrollment
exports.updateEnrollment = async (req, res) => {
  try {
      const { oldCourseId, newCourseId } = req.body;
      const student = await Student.findById(req.user.referenceId).populate('enrolledCourses');

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }

      const oldCourse = await Course.findOne({ courseId: oldCourseId });
      const newCourse = await Course.findOne({ courseId: newCourseId });

      if (!oldCourse || !newCourse) {
          return res.status(404).json({ message: 'Course not found' });
      }

      // Ensure the student is enrolled in the old course
      if (!student.enrolledCourses.some(c => c._id.equals(oldCourse._id))) {
          return res.status(400).json({ message: 'Not enrolled in the old course' });
      }

      // Check if the new course is full
      if (newCourse.enrolledStudents.length >= newCourse.maxStudents) {
          return res.status(400).json({ message: 'New course is full' });
      }

      // Ensure the total credits stay within limit
      const totalCredits = student.enrolledCourses.reduce((sum, course) => sum + course.credits, 0);
      const newTotalCredits = totalCredits - oldCourse.credits + newCourse.credits;
      if (newTotalCredits > 20) {
          return res.status(400).json({ message: 'Exceeds maximum allowed credits (20)' });
      }

      // Swap the courses
      student.enrolledCourses.pull(oldCourse._id);
      student.enrolledCourses.push(newCourse._id);

      oldCourse.enrolledStudents.pull(student._id);
      newCourse.enrolledStudents.push(student._id);

      await student.save();
      await oldCourse.save();
      await newCourse.save();

      res.status(200).json({ message: 'Course swap successful' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
