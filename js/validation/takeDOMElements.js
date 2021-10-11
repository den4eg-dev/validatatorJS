const takeDOMElements = ({
  inputField = null,
  textField = null,
  checkBox = null,
  inputFields = null,
  submitBtn = null,
}) => {
  const submitBtn = document.querySelector('#doSubmit');
  const firstNameInputField = document.querySelector('.firstNameInputField #inputFirstName'),
    firstNameTextField = document.querySelector('.firstNameInputField .helper');

  const lastNameInputField = document.querySelector('.lastNameInputField #inputLastName'),
    lastNameTextField = document.querySelector('.lastNameInputField .helper');

  const emailInputField = document.querySelector('.inputEmailField #inputEmail'),
    emailTextField = document.querySelector('.inputEmailField .helper');

  const zipInputField = document.querySelector('.zipInputField #inputZip'),
    zipInputTextField = document.querySelector('.zipInputField .helper');

  const checkInputField = document.querySelector('.form-check #gridCheck');

  const allInputFields = document.querySelectorAll('.form input');

  firstNameInputField.addEventListener('input', checkFirstName);
  firstNameInputField.addEventListener('blur', checkFirstName);
  firstNameInputField.addEventListener('keyup', checkFirstName);

  lastNameInputField.addEventListener('input', checkLastName);
  lastNameInputField.addEventListener('blur', checkLastName);

  emailInputField.addEventListener('input', checkEmailInput);
  emailInputField.addEventListener('blur', checkEmailInput);

  zipInputField.addEventListener('keyup', checkZipInput);
  zipInputField.addEventListener('blur', checkZipInput);
  zipInputField.addEventListener('change', checkZipInput);

  checkInputField.addEventListener('change', () => {
    formValidation({ checked: true }, { checkBox: checkInputField }, {});
  });

  submitBtn.addEventListener('click', (e) => {
    onSubmit(e);
  });

  return { inputField, textField, checkBox, inputFields, submitBtn };
};
