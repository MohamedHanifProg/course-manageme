const studentSchema = {
    studentId: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Student ID is required.' },
    studentName: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Student name is required.' },
    address: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Address is required.' },
    academicYear: { in: ['body'], isInt: true, errorMessage: 'Academic year must be an integer.' },
  };
  module.exports = studentSchema;
  