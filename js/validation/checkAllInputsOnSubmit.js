import { resetForm } from './functions.js';
import {
  isRequired,
  hasLimit,
  hasEmail,
  isCheckedOnSubmit,
} from './valMethods.js';
import ConfettiGenerator from './vendor/confetti.js';

const confettiSettings = { target: 'my-canvas' };
const confetti = new ConfettiGenerator(confettiSettings);

const loadingBtn = `<span
class="spinner-border me-2 spinner-border-sm"
role="status"
aria-hidden="true"
></span>
Loading...
`;
const initialBtn = `<span
class="spinner-border me-2 spinner-border-sm d-none"
role="status"
aria-hidden="true"
></span>
Senden
`;

const msgData = {
  limitMsg: 'bitte min LIMIT Zeichen eingeben',
};

export const checkAllInputsOnSubmit = (
  { inputFields, checkBox, submitBtn },
  messages
) => {
  const { successMsg, requiredMsg, limitMsg, emailMsg, onlyNumbersMsg } =
    messages;

  const required = (input) =>
    isRequired({
      inputLength: input.value.trim().length,
      textField: input.parentNode.querySelector('.helper'),
      parentElement: input.parentNode,
      requiredMsg: 'Dieses Feld wird benötigt',
    });

  const limit = (input, limit, onlyNumbers = false) =>
    hasLimit({
      parentElement: input.parentNode,
      textField: input.parentNode.querySelector('.helper'),
      inputLength: input.value.trim().length,
      required: required(input),
      successMsg,
      limit: limit,
      limitMsg: msgData.limitMsg || limitMsg,
      onlyNumbers: onlyNumbers,
    });

  const checked = (input) => isCheckedOnSubmit(input);

  const email = (input) => {
    return hasEmail({
      parentElement: input.parentNode,
      textField: input.parentNode.querySelector('.helper'),
      inputValue: input.value,
      inputLength: input.value.trim().length,
      emailMsg: 'falsche Email eingegeben! from Click',
      successMsg,
      required: required(input),
    });
  };

  let checkDataBeforeSubmit = [];

  inputFields.forEach((input) => {
    if (input.hasAttribute('data-firstname')) {
      if (!required(input) && !limit(input, 3))
        checkDataBeforeSubmit.push({
          input: 'data-firstname',
          validated: true,
        });
      else
        checkDataBeforeSubmit.push({
          input: 'data-firstname',
          validated: false,
        });
    } else if (input.hasAttribute('data-lastname')) {
      if (!required(input) && !limit(input, 5))
        checkDataBeforeSubmit.push({
          input: 'data-lastname',
          validated: true,
        });
      else
        checkDataBeforeSubmit.push({
          input: 'data-lastname',
          validated: false,
        });
    } else if (input.hasAttribute('data-check')) {
      !checked(input)
        ? checkDataBeforeSubmit.push({ input: 'data-check', validated: false })
        : checkDataBeforeSubmit.push({ input: 'data-check', validated: true });
    } else if (input.hasAttribute('data-email')) {
      if (!required(input) && !email(input))
        checkDataBeforeSubmit.push({ input: 'data-email', validated: true });
      else
        checkDataBeforeSubmit.push({ input: 'data-email', validated: false });
    } else if (input.hasAttribute('data-number')) {
      if (!limit(input, true) && !required(input))
        checkDataBeforeSubmit.push({ input: 'data-email', validated: true });
      else
        checkDataBeforeSubmit.push({ input: 'data-email', validated: false });
    }
  });

  // SUBMIT
  if (checkDataBeforeSubmit.every((input) => input.validated === true)) {
    console.log(submitBtn);
    submitBtn.innerHTML = loadingBtn;
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ich bin da !!! ;)');
      }, 3000);
    });
    myPromise.then((data) => {
      submitBtn.innerHTML = initialBtn;
      console.log(data);
      confetti.render();
      resetForm(inputFields);
      checkDataBeforeSubmit = [];
    });
  }
};
