const charLengthRange = document.getElementById('charLengthRange');
const charLengthNumber = document.getElementById('charLengthNumber')
const formPassword = document.getElementById('formPassword')
const includeUppercaseEl = document.getElementById('includeUppercase')
const includeLowercaseEl = document.getElementById('includeLowercase')
const includeNumbersEl = document.getElementById('includeNumbers')
const includeSymbolsEl = document.getElementById('includeSymbols')
const passwordShow = document.getElementById('passwordShow')
const copyToClipBoard = document.getElementById('copyToClipBoard')

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).concat(
    arrayFromLowToHigh(58, 64)
).concat(
    arrayFromLowToHigh(91, 96)
).concat(
    arrayFromLowToHigh(123, 126)
)

charLengthNumber.addEventListener('input', syncCharNumber)
charLengthRange.addEventListener('input', syncCharNumber)

formPassword.addEventListener('submit', i => {
    i.preventDefault()
    const characterAmount = charLengthNumber.value
    const includeUppercase = includeUppercaseEl.checked
    const includeLowercase = includeLowercaseEl.checked
    const includeNumbers = includeNumbersEl.checked
    const includeSymbols = includeSymbolsEl.checked
    const password = generatePassword(characterAmount, includeUppercase, includeLowercase,
        includeNumbers, includeSymbols)
    passwordShow.innerText = password
})

copyToClipBoard.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const passwordCopy = passwordShow.innerText
    if (passwordCopy == "Password" || passwordCopy == "Please Select an Option") {
        return
    }
    textarea.value = passwordCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    alert("Copied the password: " + textarea.value)
    textarea.remove();


})


function generatePassword(characterAmount, includeUppercase, includeLowercase,
    includeNumbers, includeSymbols) {
    let charCode = []
    if (includeLowercase) charCode = charCode.concat(LOWERCASE_CHAR_CODES)
    if (includeUppercase) charCode = charCode.concat(UPPERCASE_CHAR_CODES)
    if (includeNumbers) charCode = charCode.concat(NUMBER_CHAR_CODES)
    if (includeSymbols) charCode = charCode.concat(SYMBOL_CHAR_CODES)

    let message = "Please Select an Option"
    if (charCode == 0) return message

    const passwordChars = []
    for (let i = 0; i < characterAmount; i++) {
        const charCodes = charCode[Math.floor(Math.random() * charCode.length)]
        passwordChars.push(String.fromCharCode(charCodes))
    }
    return passwordChars.join('')
}

function arrayFromLowToHigh(low, high) {
    const array = []
    for (let i = low; i <= high; i++) {
        array.push(i)
    }
    return array
}

function syncCharNumber(i) {
    const value = i.target.value
    charLengthNumber.value = value
    charLengthRange.value = value
}
