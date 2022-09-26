import './style.css';
// set strings to password charter options
const lowercaseString: string = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseString: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersString: string = '0123456789';
const symbolsString: string = '~!@#$%^&*()_-+={[}]|:;<,>.?/';

// set elements by ID for DOM manipulation
const generatedPasswordField = <HTMLInputElement>(
  document.getElementById('generated-password')
);
const lengthMessage = <HTMLInputElement>(
  document.getElementById('password-length-message')
);
const checkboxUpper = <HTMLInputElement>document.getElementById('Uppercase');
const checkboxLower = <HTMLInputElement>document.getElementById('Lowercase');
const checkboxNumber = <HTMLInputElement>document.getElementById('Numbers');
const checkboxSymbol = <HTMLInputElement>document.getElementById('Symbols');
const generateButton = <HTMLInputElement>document.getElementById('genButton');
const lengthInput = <HTMLInputElement>document.getElementById('length-input');
const strengthInput = <HTMLInputElement>(
  document.getElementById('password-strength-message')
);
const generationMessage = <HTMLInputElement>(
  document.getElementById('password-generation-message')
);

// password options and output
let characterOptions: string;
let outputPassword: string;
let correctLength: boolean = false;

// show error messaged depending on what was entered
// set the var to true if the correct weight was selected
lengthInput.onkeyup = (): any => {
  if (Number(lengthInput.value) === 0) {
    lengthMessage.innerHTML =
      "<span class='error-message-length'> You know how a password works, right?</span>";
    correctLength = false;
  } else {
    if (!Number(lengthInput.value)) {
      lengthMessage.innerHTML =
        "<span class='error-message-length'> This is just wrong.</span>";
      correctLength = false;
    } else {
      if (Number(lengthInput.value) < 0) {
        lengthMessage.innerHTML =
          "<span class='error-message-length'> Are you trying to be funny.</span>";
        correctLength = false;
      } else if (Number(lengthInput.value) > 15) {
        lengthMessage.innerHTML =
          "<span class='error-message-length'> Did your read the instructions 1 - 15.</span>";
        correctLength = false;
      } else if (Number(lengthInput.value) < 7) {
        lengthMessage.innerHTML =
          "<span class='warning-message-length'> This seems short, but YOLO right?</span>";
        correctLength = true;
      } else {
        lengthMessage.innerHTML =
          "<span class='correct-message-length'> This looks good, good work.</span>";
        correctLength = true;
      }
    }
  }
};

generateButton.onclick = (): any => {
  // reset messages
  characterOptions = '';
  outputPassword = '';
  generatedPasswordField.value = '';
  // Set messages on incorrect selections
  if (
    !checkboxUpper.checked &&
    !checkboxLower.checked &&
    !checkboxNumber.checked &&
    !checkboxSymbol.checked
  ) {
    strengthInput.innerHTML =
      "<span class='error-message-length'> Were the instructions not clear... SELECT SOME.</span>";
  } else {
    strengthInput.innerHTML = '';
  }
  if (Number(lengthInput.value) === 0) {
    lengthMessage.innerHTML =
      "<span class='error-message-length'> You know how a password works, right?</span>";
  }

  // generate password
  if (
    // check if there are no errors
    (!checkboxUpper.checked &&
      !checkboxLower.checked &&
      !checkboxNumber.checked &&
      !checkboxSymbol.checked) ||
    correctLength === false
  ) {
    generationMessage.innerHTML =
      "<span class='error-message-length'> Did that generate a Password... No?  Then try again.</span>";
  } else {
    // clear error messages
    strengthInput.innerHTML = '';
    generationMessage.innerHTML = '';

    // add to usable password characters depending on what boxes are ticked
    if (checkboxUpper.checked === true) {
      characterOptions += uppercaseString;
    }
    if (checkboxLower.checked === true) {
      characterOptions += lowercaseString;
    }
    if (checkboxNumber.checked === true) {
      characterOptions += numbersString;
    }
    if (checkboxSymbol.checked === true) {
      characterOptions += symbolsString;
    }

    // get random numbers from string.length for random password
    let randomNum: number[] = [];

    for (let i: number = 0; i < Number(lengthInput.value); i++) {
      randomNum.push(Math.round(Math.random() * (characterOptions.length - 1)));
    }

    for (let x: number = 0; x < Number(lengthInput.value); x++) {
      outputPassword += characterOptions[randomNum[x]];
    }

    generatedPasswordField.value = outputPassword;
    generationMessage.innerHTML =
      "<span class='correct-message-length'> You know how to type and click. You get a STAR!</span>";
  }
};
