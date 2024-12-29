const isValidString = (value) => typeof value === 'string' && value.trim() !== '';
const isValidNumber = (value) => typeof value === 'number' && !isNaN(value);

module.exports = { isValidString, isValidNumber };
