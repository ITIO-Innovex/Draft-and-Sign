// Global Validation Library for Draft-and-Sign Application
// Comprehensive validation for all application features

// ============================================================================
// CORE VALIDATION UTILITIES
// ============================================================================

/**
 * Base validation result class
 */
class ValidationResult {
  constructor(isValid, errors = [], warnings = []) {
    this.isValid = isValid;
    this.errors = errors;
    this.warnings = warnings;
  }

  addError(message, field = null) {
    this.errors.push({ message, field });
    this.isValid = false;
  }

  addWarning(message, field = null) {
    this.warnings.push({ message, field });
  }

  static success() {
    return new ValidationResult(true);
  }

  static failure(errors) {
    return new ValidationResult(false, Array.isArray(errors) ? errors : [errors]);
  }
}

/**
 * Common validation patterns
 *///
const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,15}$/,
  URL: /^https?:\/\/.+/,
  DATE: /^\d{4}-\d{2}-\d{2}$/,
  TIME: /^\d{2}:\d{2}(:\d{2})?$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHANUMERIC_SPACES: /^[a-zA-Z0-9\s]+$/,
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  BASE64: /^[A-Za-z0-9+/]*={0,2}$/,
  IP_ADDRESS: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  CREDIT_CARD: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/,
  SSN: /^\d{3}-?\d{2}-?\d{4}$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  FILE_EXTENSION: /\.(pdf|doc|docx|txt|rtf|odt|pages|tex|html|xml|json|csv|xlsx|xls|ppt|pptx|key|odp|ods|odg|odf|odb|sql|js|ts|jsx|tsx|py|java|c|cpp|h|hpp|cs|php|rb|go|rs|swift|kt|scala|clj|hs|ml|fs|dart|r|m|pl|sh|bash|ps1|bat|cmd|vbs|ps|sql|plsql|tcl|lua|groovy|gradle|maven|ant|make|cmake|ninja|scons|rake|grunt|gulp|webpack|rollup|vite|parcel|babel|eslint|prettier|stylelint|jest|mocha|chai|cypress|selenium|protractor|karma|jasmine|qunit|tape|ava|tap|nyc|istanbul|coveralls|codecov|sonar|eslint|tslint|stylelint|prettier|husky|lint-staged|commitlint|semantic-release|conventional-changelog|standard|xo|ava|jest|mocha|chai|sinon|proxyquire|rewire|mockery|nock|supertest|request|axios|fetch|got|node-fetch|undici|ky|umi-request|umi|dva|qiankun|micro-app|single-spa|module-federation|webpack|rollup|vite|parcel|esbuild|swc|babel|typescript|flow|eslint|prettier|stylelint|postcss|sass|less|stylus|tailwind|bootstrap|material-ui|antd|element-ui|vuetify|quasar|nuxt|next|gatsby|vuepress|docusaurus|storybook|chromatic|percy|loki|playwright|puppeteer|cypress|selenium|webdriverio|testcafe|nightwatch|codeceptjs|gauge|cucumber|behave|robot|appium|detox|maestro|flutter|react-native|expo|ionic|cordova|capacitor|electron|tauri|neutralino|nwjs)$/i
};

// ============================================================================
// USER & AUTHENTICATION VALIDATIONS
// ============================================================================

/**
 * User registration validation
 */
export function validateUserRegistration(userData) {
  const result = new ValidationResult(true);

  // Required fields
  const requiredFields = ['email', 'password', 'firstName', 'lastName'];
  requiredFields.forEach(field => {
    if (!userData[field] || userData[field].trim() === '') {
      result.addError(`${field} is required`, field);
    }
  });

  // Email validation
  if (userData.email && !PATTERNS.EMAIL.test(userData.email)) {
    result.addError('Invalid email format', 'email');
  }

  // Password validation
  if (userData.password) {
    if (userData.password.length < 8) {
      result.addError('Password must be at least 8 characters long', 'password');
    }
    if (!PATTERNS.PASSWORD.test(userData.password)) {
      result.addError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', 'password');
    }
  }

  // Name validation
  if (userData.firstName && userData.firstName.length < 2) {
    result.addError('First name must be at least 2 characters long', 'firstName');
  }
  if (userData.lastName && userData.lastName.length < 2) {
    result.addError('Last name must be at least 2 characters long', 'lastName');
  }

  // Phone validation
  if (userData.phone && !PATTERNS.PHONE.test(userData.phone)) {
    result.addError('Invalid phone number format', 'phone');
  }

  // Date of birth validation
  if (userData.dateOfBirth) {
    const dob = new Date(userData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 13) {
      result.addError('User must be at least 13 years old', 'dateOfBirth');
    }
    if (age > 120) {
      result.addError('Invalid date of birth', 'dateOfBirth');
    }
  }

  return result;
}


/**
 * Login validation
 */
export function validateLogin(loginData) {
  const result = new ValidationResult(true);

  if (!loginData.email || !loginData.email.trim()) {
    result.addError('Email is required', 'email');
  } else if (!PATTERNS.EMAIL.test(loginData.email)) {
    result.addError('Invalid email format', 'email');
  }

  if (!loginData.password || !loginData.password.trim()) {
    result.addError('Password is required', 'password');
  }

  return result;
}

/**
 * Password reset validation
 */
export function validatePasswordReset(resetData) {
  const result = new ValidationResult(true);

  if (!resetData.email || !PATTERNS.EMAIL.test(resetData.email)) {
    result.addError('Valid email is required', 'email');
  }

  if (resetData.newPassword && !PATTERNS.PASSWORD.test(resetData.newPassword)) {
    result.addError('New password must meet security requirements', 'newPassword');
  }

  if (resetData.confirmPassword && resetData.newPassword !== resetData.confirmPassword) {
    result.addError('Passwords do not match', 'confirmPassword');
  }

  return result;
}

/**
 * MFA setup validation
 */
export function validateMFASetup(mfaData) {
  const result = new ValidationResult(true);

  if (!mfaData.method || !['sms', 'email', 'authenticator', 'hardware'].includes(mfaData.method)) {
    result.addError('Invalid MFA method', 'method');
  }

  if (mfaData.method === 'sms' && (!mfaData.phone || !PATTERNS.PHONE.test(mfaData.phone))) {
    result.addError('Valid phone number required for SMS MFA', 'phone');
  }

  if (mfaData.method === 'email' && (!mfaData.email || !PATTERNS.EMAIL.test(mfaData.email))) {
    result.addError('Valid email required for email MFA', 'email');
  }

  return result;
}

/**
 * Gender validation
 */
export function validateGender(genderData) {
  const result = new ValidationResult(true);

  // Check if gender is provided
  if (!genderData || !genderData.gender) {
    result.addError('Gender is required', 'gender');
    return result;
  }

  // Define valid gender options (inclusive and respectful)
  const validGenders = [
    'male',
    'female',
    'non-binary',
    'genderfluid',
    'agender',
    'bigender',
    'genderqueer',
    'two-spirit',
    'other',
    'prefer-not-to-say'
  ];

  // Check if provided gender is valid
  if (!validGenders.includes(genderData.gender.toLowerCase())) {
    result.addError(`Invalid gender. Please select from: ${validGenders.join(', ')}`, 'gender');
  }

  // If gender is 'other', require additional description
  if (genderData.gender.toLowerCase() === 'other') {
    if (!genderData.genderDescription || genderData.genderDescription.trim() === '') {
      result.addError('Please provide a description when selecting "other"', 'genderDescription');
    } else if (genderData.genderDescription.length > 100) {
      result.addError('Gender description must be less than 100 characters', 'genderDescription');
    }
  }

  // Validate gender pronouns if provided
  if (genderData.pronouns) {
    const validPronouns = [
      'he/him',
      'she/her',
      'they/them',
      'he/they',
      'she/they',
      'other'
    ];

    if (!validPronouns.includes(genderData.pronouns.toLowerCase())) {
      result.addError(`Invalid pronouns. Please select from: ${validPronouns.join(', ')}`, 'pronouns');
    }

    // If pronouns is 'other', require additional description
    if (genderData.pronouns.toLowerCase() === 'other') {
      if (!genderData.pronounsDescription || genderData.pronounsDescription.trim() === '') {
        result.addError('Please provide a description when selecting "other" for pronouns', 'pronounsDescription');
      } else if (genderData.pronounsDescription.length > 50) {
        result.addError('Pronouns description must be less than 50 characters', 'pronounsDescription');
      }
    }
  }

  return result;
}

/**
 * Simple gender validation (basic version)
 */
export function isGenderValid(gender) {
  if (!gender) return false;
  
  const validGenders = [
    'male',
    'female',
    'non-binary',
    'genderfluid',
    'agender',
    'bigender',
    'genderqueer',
    'two-spirit',
    'other',
    'prefer-not-to-say'
  ];

  return validGenders.includes(gender.toLowerCase());
}

// ============================================================================
// DOCUMENT VALIDATIONS
// ============================================================================

/**
 * Document creation validation
 */
export function validateDocumentCreation(documentData) {
  const result = new ValidationResult(true);

  // Required fields
  if (!documentData.title || documentData.title.trim() === '') {
    result.addError('Document title is required', 'title');
  } else if (documentData.title.length > 255) {
    result.addError('Document title must be less than 255 characters', 'title');
  }

  // Description validation
  if (documentData.description && documentData.description.length > 1000) {
    result.addError('Document description must be less than 1000 characters', 'description');
  }

  // File validation
  if (documentData.file) {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/rtf',
      'application/vnd.oasis.opendocument.text'
    ];
    
    if (!allowedTypes.includes(documentData.file.type)) {
      result.addError('Unsupported file type. Please upload PDF, DOC, DOCX, TXT, RTF, or ODT files', 'file');
    }

    if (documentData.file.size > 50 * 1024 * 1024) { // 50MB
      result.addError('File size must be less than 50MB', 'file');
    }
  }

  // Tags validation
  if (documentData.tags && Array.isArray(documentData.tags)) {
    if (documentData.tags.length > 10) {
      result.addError('Maximum 10 tags allowed', 'tags');
    }
    documentData.tags.forEach((tag, index) => {
      if (tag.length > 50) {
        result.addError(`Tag ${index + 1} must be less than 50 characters`, `tags.${index}`);
      }
    });
  }

  // Category validation
  if (documentData.category && !['contract', 'agreement', 'proposal', 'invoice', 'report', 'form', 'other'].includes(documentData.category)) {
    result.addError('Invalid document category', 'category');
  }

  return result;
}


// ============================================================================
// SEARCH & FILTER VALIDATIONS
// ============================================================================

/**
 * Search query validation
 */
export function validateSearchQuery(searchData) {
  const result = new ValidationResult(true);

  if (searchData.query && searchData.query.length > 500) {
    result.addError('Search query too long (max 500 characters)', 'query');
  }

  if (searchData.filters && typeof searchData.filters === 'object') {
    const validFilters = ['type', 'category', 'dateRange', 'tags', 'author'];
    Object.keys(searchData.filters).forEach(filter => {
      if (!validFilters.includes(filter)) {
        result.addError(`Invalid search filter: ${filter}`, 'filters');
      }
    });
  }

  if (searchData.sortBy && !['relevance', 'date', 'name', 'size'].includes(searchData.sortBy)) {
    result.addError('Invalid sort option', 'sortBy');
  }

  if (searchData.limit && (searchData.limit < 1 || searchData.limit > 100)) {
    result.addError('Search limit must be between 1 and 100', 'limit');
  }

  return result;
}


// ============================================================================
// UTILITY VALIDATION FUNCTIONS
// ============================================================================

/**
 * Generic email validation
 */
export function isEmailValid(email) {
  return PATTERNS.EMAIL.test(email);
}

/**
 * Generic password validation
 */
export function isPasswordValid(password) {
  return PATTERNS.PASSWORD.test(password);
}

/**
 * Generic phone validation
 */
export function isPhoneValid(phone) {
  return PATTERNS.PHONE.test(phone);
}

/**
 * Generic URL validation
 */
export function isUrlValid(url) {
  return PATTERNS.URL.test(url);
}

/**
 * Generic date validation
 */
export function isDateValid(date) {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
}

/**
 * Generic file validation
 */
export function validateFile(file, options = {}) {
  const result = new ValidationResult(true);
  
  const {
    maxSize = 50 * 1024 * 1024, // 50MB default
    allowedTypes = [],
    allowedExtensions = []
  } = options;

  if (!file) {
    result.addError('File is required');
    return result;
  }

  if (file.size > maxSize) {
    result.addError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
  }

  if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
    result.addError(`File type not allowed. Allowed types: ${allowedTypes.join(', ')}`);
  }

  if (allowedExtensions.length > 0) {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      result.addError(`File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`);
    }
  }

  return result;
}

/**
 * Generic required field validation
 */
export function validateRequired(value, fieldName) {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return ValidationResult.failure(`${fieldName} is required`);
  }
  return ValidationResult.success();
}

/**
 * Generic length validation
 */
export function validateLength(value, fieldName, minLength, maxLength) {
  const result = new ValidationResult(true);
  
  if (minLength && value.length < minLength) {
    result.addError(`${fieldName} must be at least ${minLength} characters long`);
  }
  
  if (maxLength && value.length > maxLength) {
    result.addError(`${fieldName} must be less than ${maxLength} characters long`);
  }
  
  return result;
}

/**
 * Generic range validation
 */
export function validateRange(value, fieldName, min, max) {
  const result = new ValidationResult(true);
  
  if (min !== undefined && value < min) {
    result.addError(`${fieldName} must be at least ${min}`);
  }
  
  if (max !== undefined && value > max) {
    result.addError(`${fieldName} must be at most ${max}`);
  }
  
  return result;
}

// ============================================================================
// EXPORT ALL VALIDATIONS
// ============================================================================

export {
  ValidationResult,
  PATTERNS
};

// Export all validation functions for easy access
export const validators = {
  // User & Auth
  validateUserRegistration,
  validateUserProfile,
  validateLogin,
  validatePasswordReset,
  validateMFASetup,
  validateGender,
  
  // Documents
  validateDocumentCreation,
  // Search
  validateSearchQuery,
  
  // Utilities
  isEmailValid,
  isPasswordValid,
  isPhoneValid,
  isUrlValid,
  isDateValid,
  isGenderValid,
  validateFile,
  validateRequired,
  validateLength,
  validateRange
};
