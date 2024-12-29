const courseSchema = {
    courseId: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Course ID is required.' },
    courseName: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Course name is required.' },
    lecturer: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Lecturer is required.' },
    creditPoints: {
      in: ['body'],
      isInt: { options: { min: 3, max: 5 } },
      errorMessage: 'Credit points must be an integer between 3 and 5.',
    },
    maxStudents: { in: ['body'], isInt: true, errorMessage: 'Maximum students must be an integer.' },
  };
  
  module.exports = courseSchema;
  