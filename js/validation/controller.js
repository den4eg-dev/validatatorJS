import {
  isRequired,
  hasLimit,
  hasName,
  hasEmail,
  hasOnlyNumbers,
  isCheckedOnSubmit,
} from './valMethods.js';
import { checkAllInputsOnSubmit } from './checkAllInputsOnSubmit.js';
// import { takeDOMElements } from './takeDOMElements.js';

const defaultMessages = {
  successMsg: 'default message - success',
  requiredMsg: 'default message - required',
  limitMsg: `default message - LIMIT`,
  emailMsg: 'default message - email',
  onlyNumbersMsg: 'default message - only numbers',
};

export const controller = (options, elements, messages) => {
  ////////////////////////////////////////////////////////
  const {
    required = false,
    limit = false,
    name = false,
    email = false,
    onlyNumbers = false,
    delay = 1500,
    submit = false,
    checked = false,
  } = options;
  const {
    inputField = null,
    inputFields = null,
    textField = null,
    checkBox = null,
    submitBtn = null,
  } = elements;

  const {
    successMsg = defaultMessages.successMsg,
    requiredMsg = defaultMessages.requiredMsg,
    limitMsg = defaultMessages.limitMsg,
    emailMsg = defaultMessages.emailMsg,
  } = messages;

  let inputValue = inputField ? inputField.value : '';
  let inputLength = inputValue.trim().length;
  let parentElement = inputField && inputField.parentNode;

  ////////////////////////////////////////////////////////////
// wird geprueft , was validiert wird. Und wird andere funktion aufgerufen.
  if (required)
    isRequired({
      inputLength,
      textField,
      parentElement,
      requiredMsg,
    });

  if (email)
    setTimeout(() => {
      hasEmail({
        parentElement,
        textField,
        inputValue,
        inputLength,
        emailMsg,
        successMsg,
        required,
      });
    }, delay);

  if (limit > 0)
    setTimeout(() => {
      hasLimit({
        parentElement,
        textField,
        inputLength,
        limit,
        required,
        limitMsg,
        successMsg,
        onlyNumbers,
      });
    }, delay);

  if (name)
    setTimeout(() => {
      hasName({
        inputField,
        textField,
        required,
        successMsg,
      });
    }, delay);

  if (onlyNumbers) hasOnlyNumbers({ inputField });

  if (checked) isCheckedOnSubmit(checkBox);

  if (submit)
    checkAllInputsOnSubmit(
      { inputFields, checkBox, submitBtn },
      (messages = defaultMessages)
    );
};
