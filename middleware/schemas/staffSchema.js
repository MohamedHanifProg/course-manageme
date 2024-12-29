const staffSchema = {
    staffId: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Staff ID is required.' },
    staffName: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Staff name is required.' },
    address: { in: ['body'], isString: true, notEmpty: true, errorMessage: 'Address is required.' },
  };
  
  module.exports = staffSchema;
  