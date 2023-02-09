(function () {
  "use strict";
  // this gets all the required elements from the html file
  const resultEl = document.getElementById("result");
  const lengthEl = document.getElementById("length");
  const lowerEl = document.getElementById("lowercase");
  const upperEl = document.getElementById("uppercase");
  const numberEl = document.getElementById("numbers");
  const symbolEl = document.getElementById("symbols");
  const generateEl = document.getElementById("generate");
  const clipboardEl = document.getElementById("clipboard");
  // this is a variable that has all the function in a dic with keys and values
  const randomFun = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNUmber,
    symbol: getRandomSymbol,
  };
  // we check the value required by th user
  generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    // console.log(length);
    const hasLower = lowerEl.checked;
    const hasUpper = upperEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatedPassword(
      hasLower,
      hasUpper,
      hasNumber,
      hasSymbol,
      length
    );
  });

  //   how to cpoy password to clipboard
  clipboardEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = resultEl.innerText;

    if (!password) {
      return alert("empty generates password first");
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("password copied to clipboard");
  });

  //   the function to genrate the password
  function generatedPassword(lower, upper, number, symbol, length) {
    let generatedPassowrd = "";

    // checking the amount of checked condition
    const Typescount = lower + upper + number + symbol;

    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
      (item) => Object.values(item)[0]
    );
    console.log(typesArr);

    if (Typescount === 0) {
      return "";
    }
    for (let i = 0; i < length; i += Typescount) {
      typesArr.forEach((type) => {
        const funcName = Object.keys(type)[0];
        console.log(funcName);

        generatedPassowrd += randomFun[funcName]();
      });
    }
    const finalPassoword = generatedPassowrd.slice(0, length);

    return finalPassoword;
  }
  // this generates random Lowercase alphabet
  function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }
  // this generates random Uppercase alphabet
  function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }
  // this generates random number
  function getRandomNUmber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  }

  function getRandomSymbol() {
    const Symbols = "!@#$%^&*()_,.?{}[]~";
    return Symbols[Math.floor(Math.random() * Symbols.length)];
  }
})();
