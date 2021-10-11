export const getLimitMsg = (limit, text) => {
  if (!text || limit < 1) return '';
  return limit ? text.split('LIMIT').join(limit) : '';
};

export const handelError = (parentElement, textField, msg, show) => {
  const message = textField && (textField.innerHTML = msg);
  if (show) {
    parentElement.classList.add('error');
    parentElement.classList.remove('success');
    message;
  } else if (show == null) {
    parentElement.classList.remove('error');
    parentElement.classList.remove('success');
    message;
  } else {
    parentElement.classList.remove('error');
    parentElement.classList.add('success');
    message;
  }
};

export const resetForm = (inputFields) => {
  inputFields.forEach((input, i) => {
    if (input.type === 'checkbox') input.checked = false;
    input.value = '';
    input.parentNode.classList.remove('success');
    if (input.parentNode.querySelector('.helper') !== null) {
      input.parentNode.querySelector('.helper').outerText = '';
    }
  });
};
