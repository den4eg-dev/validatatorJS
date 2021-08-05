import { takeDOMElements } from './DOMElement.js';
import { statesRender } from './states-options.js';
import { controller } from './validation/controller.js';

statesRender();

const DOMElements = [
  { name: 'submit', selector: '#doSubmit' },
  {
    name: 'firstName',
    selector: '.firstNameInputField #inputFirstName',
    errorText: '.firstNameInputField .helper',
  },
  {
    name: 'lastName',
    selector: '.lastNameInputField #inputLastName',
    errorText: '.lastNameInputField .helper',
  },
  {
    name: 'email',
    selector: '.inputEmailField #inputEmail',
    errorText: '.inputEmailField .helper',
  },
  {
    name: 'zip',
    selector: '.zipInputField #inputZip',
    errorText: '.zipInputField .helper',
  },
  {
    name: 'checkbox',
    selector: '.form-check #gridCheck',
  },
  {
    name: 'allFields',
    selector: '.form input',
    many: true,
  },
];

// wird alle Elemente, die oben  beschrieben sind,  aus dem DOM genohmen.
const [submit, firstName, lastName, email, zip, checkbox, allFields] =
  takeDOMElements(DOMElements); // funktion , die Elemente zurueck gibt

const onChangeFirstName = () =>
  controller(
    {
      required: true,
      limit: 3,
    },
    {
      inputField: firstName.input,
      textField: firstName.errorText,
    },
    {
      successMsg: 'du hast geschaft!!!',
      requiredMsg: 'Dieses Feld wird benötigt',
      limitMsg: `bitte min LIMIT Zeichen eingeben`,
    }
  );

const onChangeLastName = () =>
  controller(
    {
      required: true,
      limit: 5,
      delay: 1000, // default 1500 ms
    },
    {
      inputField: lastName.input,
      textField: lastName.errorText,
    },
    {
      successMsg: 'du hast geschaft!!!',
      requiredMsg: 'Dieses Feld wird benötigt',
      limitMsg: `bitte min LIMIT Zeichen eingeben`,
    }
  );

// funk , die input steuern.  Die Werte werden weiter uebergeben.
const onChangeEmail = () =>
  controller(
    {
      required: true,
      email: true,
    },
    {
      inputField: email.input,
      textField: email.errorText,
    },
    {
      successMsg: 'du hast geschaft!!!',
      requiredMsg: 'Dieses Feld wird benötigt',
      emailMsg: `falsche Email eingegeben!`,
    }
  );

const onChangeZip = () =>
  controller(
    {
      required: true,
      onlyNumbers: true,
      limit: 5,
    },
    {
      inputField: zip.input,
      textField: zip.errorText,
    },
    {
      successMsg: 'du hast geschaft!!!',
      requiredMsg: 'Dieses Feld wird benötigt',
    }
  );
const onSubmit = (event) => {
  event.preventDefault();

  controller(
    { submit: true },
    {
      checkBox: checkbox.input,
      inputFields: allFields.input,
      submitBtn: submit.input,
    },
    { successMsg: 'du hast geschaft!!!' }
  );
};


//LISTENERS
firstName.input.addEventListener('input', onChangeFirstName);
firstName.input.addEventListener('blur', onChangeFirstName);
firstName.input.addEventListener('keyup', onChangeFirstName);

lastName.input.addEventListener('input', onChangeLastName);
lastName.input.addEventListener('blur', onChangeLastName);
lastName.input.addEventListener('keyup', onChangeLastName);

email.input.addEventListener('input', onChangeEmail);
email.input.addEventListener('blur', onChangeEmail);

zip.input.addEventListener('keyup', onChangeZip);
zip.input.addEventListener('blur', onChangeZip);
zip.input.addEventListener('change', onChangeZip);

checkbox.input.addEventListener('change', (e) => {
  controller({ checked: true }, { checkBox: e.target }, {});
});

submit.input.addEventListener('click', (e) => {
  onSubmit(e);
});
