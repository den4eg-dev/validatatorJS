import { getLimitMsg, handelError } from './functions.js';

/////--- REQUIRED ----////////////////////////////////////
export const isRequired = ({
  inputLength,
  textField,
  parentElement,
  requiredMsg,
}) => {
  if (inputLength === 0) {
    handelError(parentElement, textField, requiredMsg, true);
    return true;
  } else {
    // handelError(parentElement, textField, '', null);
    return false;
  }
};

/////--- LIMIT ----////////////////////////////////////
export const hasLimit = ({
  parentElement,
  textField,
  inputLength,
  limit,
  required,
  limitMsg,
  successMsg,
  onlyNumbers,
}) => {
  if (required && inputLength == 0) return false;
  if (onlyNumbers) {
    limit = limit - 1;
  }
  if (inputLength > limit) {
    handelError(parentElement, textField, successMsg, false);
    return false;
  } else if (inputLength >= 1) {
    handelError(parentElement, textField, getLimitMsg(limit, limitMsg), true);
    return true;
  } else {
    handelError(parentElement, textField, '', null);
    return false;
  }
};

/////???--- NAME - TEXT ----////////////////////////////////////
export const hasName = ({
  inputField,
  textField,
  required,
  limit,
  successMsg,
  limitMsg,
}) => {
  // if (required && inputLength == 0) return;
  // const patternName = /^[a-z ,.'-]+$/i;
  // inputField.value = inputField.value.replace(/^([a-z]+[A-Z]?[ ]?|[a-z]+['-]?)+$/i, '');
};

/////--- EMAIL ----////////////////////////////////////
export const hasEmail = ({
  parentElement,
  textField,
  inputValue,
  inputLength,
  required,
  emailMsg,
  successMsg,
}) => {
  if (required && !inputLength) return false;

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(inputValue) && inputValue !== '') {
    handelError(parentElement, textField, successMsg, false);
    return false;
  } else if (inputValue == '') {
    handelError(parentElement, textField, '', null);

    return false;
  } else {
    handelError(parentElement, textField, emailMsg, true);
    return true;
  }
};

/////--- ONLY NUMBER ----////////////////////////////////////
export const hasOnlyNumbers = ({ inputField }) => {
  inputField.value = inputField.value.replace(/[^0-9]+/g, '');
};

export const isCheckedOnSubmit = (checkBox) => {
  if (checkBox.checked) {
    handelError(checkBox.parentNode, '', '', false);
    return true;
  } else {
    handelError(checkBox.parentNode, '', '', true);
    return false;
  }
};
