class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.errors = {};
  }
  validateField(fieldName, value, rules) {
    const errors = [];
    if (rules.required && (!value || value.trim() === '')) {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD(rules.label || fieldName));
    }
    if (rules.minLength && value && value.length < rules.minLength) {
      errors.push(VALIDATION_ERRORS.MIN_LENGTH(rules.label || fieldName, rules.minLength));
    }
    if (rules.pattern && value && !rules.pattern.test(value)) {
      errors.push(VALIDATION_ERRORS.INVALID_FORMAT(rules.label || fieldName));
    }
    if (rules.custom && value) {
      const customResult = rules.custom(value);
      if (!customResult.valid) {
        errors.push(customResult.error);
      }
    }
    return errors;
  }
  showFieldError(fieldName, errors) {
    const field = this.form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    const feedbackElement = field.parentElement.querySelector('.invalid-feedback') || 
                           this.createFeedbackElement(field);
    if (errors.length > 0) {
      field.classList.add('is-invalid');
      feedbackElement.textContent = errors[0];
      feedbackElement.style.display = 'block';
    } else {
      field.classList.remove('is-invalid');
      feedbackElement.style.display = 'none';
    }
  }
  createFeedbackElement(field) {
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    field.parentElement.appendChild(feedback);
    return feedback;
  }
  clearFieldError(fieldName) {
    this.showFieldError(fieldName, []);
  }
  clearAllErrors() {
    const invalidFields = this.form.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => {
      field.classList.remove('is-invalid');
      const feedback = field.parentElement.querySelector('.invalid-feedback');
      if (feedback) {
        feedback.style.display = 'none';
      }
    });
    this.errors = {};
  }
  isValid() {
    return Object.keys(this.errors).length === 0;
  }
  getErrors() {
    return this.errors;
  }
}
