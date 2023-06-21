const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const dateOfBirth = document.querySelector("#d-o-b");
const email = document.querySelector("#email");
const phoneNumber = document.querySelector("#phone-number");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const passwordRep = document.querySelector("#password-rep");
var check = false;
const allFields = document.querySelectorAll("input");
const passwordWarning = document.querySelector(".warning");
const themeSwitch = document.querySelector(".theme-switch");
    
firstName.addEventListener("input", () =>{ validation1(firstName, 900, "First name must be at least 2 letters long.", "First name must only contain letters." ); });

lastName.addEventListener("input", () =>{ validation1(lastName, 900, "Last name must be at least 2 letters long.", "Last name must only contain letters." ); });

dateOfBirth.addEventListener("change", (e) => {
    dateOfBirth.classList.remove("valid");
    dateOfBirth.classList.remove("invalid");
    var today = new Date();
    var birthDate = new Date(dateOfBirth.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month != 0 && today.getDate() < birthDate.getDate())) { age--; }
    if (parseInt(age) < 16) {
        dateOfBirth.setCustomValidity("You must be 16 or older to register.");
        dateOfBirth.reportValidity();
        dateOfBirth.classList.add("invalid"); }
    else if (parseInt(age) > 16) {
        dateOfBirth.classList.add("valid");
        dateOfBirth.setCustomValidity(""); }
    else {
        dateOfBirth.setCustomValidity("Please enter a valid value");} })

//RFC2822 email validation
const emailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

email.addEventListener("input", (e) => {
    email.setCustomValidity(""); 
    email.classList.remove("valid");
    email.classList.remove("invalid"); })
email.addEventListener("change", () => {
    if (email.value.match(emailformat)) {
        email.setCustomValidity(""); 
        email.classList.add("valid");}
    else {
        email.setCustomValidity("Please enter a valid email adress.");
        email.reportValidity();
        email.classList.add("invalid"); } })

username.addEventListener("input", (e) => { validation1(username, 900, "Username must be at least 2 characters long.", "Pattern mismatch" ); }) 

password.addEventListener("input", (e) => {
    password.setCustomValidity(""); 
    password.classList.remove("valid");
    password.classList.remove("invalid"); })
password.addEventListener("change", () =>{
    check = validation1(password, 900, "Password must be at least 8 characters", "Password must contain at least 1 number or special character and a minimum of 8 characters");
    if (check==true) {
        passwordWarning.style.color="var(--dim-green)";
        passwordWarning.textContent="All good!" }
    else {
        passwordWarning.style.color="var(--dim-red)";
        passwordWarning.textContent="At least 1 number/special and minimum 8 characters"; } });

passwordRep.addEventListener("input", (e) => {
    passwordRep.setCustomValidity(""); 
    passwordRep.classList.remove("valid");
    passwordRep.classList.remove("invalid"); })
passwordRep.addEventListener("change", () =>{
    passwordRep.setCustomValidity("");
    passwordRep.classList.remove("valid");
    passwordRep.classList.remove("invalid");  
    if (passwordRep.value == password.value) {
        passwordRep.classList.add("valid");
        passwordRep.setCustomValidity(""); }
    else {
        passwordRep.setCustomValidity("Passwords don't match !");
        passwordRep.reportValidity();
        passwordRep.classList.remove("valid");
        passwordRep.classList.add("invalid"); } })

function validation1 (field, timeout, valmsg1, valmsg2) {
    var timer;
    clearTimeout(timer);
    field.setCustomValidity("");
    field.classList.remove("valid");
    field.classList.remove("invalid");  
    if (!field.checkValidity()) {
    timer = setTimeout(()=>{
        if (field.validity.tooShort) {
            field.setCustomValidity(valmsg1);
            field.reportValidity();
            field.classList.add("invalid");  }
        else if (field.validity.patternMismatch) {
            field.setCustomValidity(valmsg2);
            field.reportValidity();
            field.classList.add("invalid");   }
        else if (field.value=="") {
            field.setCustomValidity("Please don't leave this field empty!");
            field.reportValidity();
            field.classList.remove("valid");}
        return false; }, timeout); }
    else if (field.checkValidity()) {
        field.classList.add("valid");
        field.setCustomValidity("");
        return true; } } 

//switch theme on switch click
themeSwitch.addEventListener("click", () => {
    if(themeSwitch.textContent=="dark_mode") { darkTheme(themeSwitch); } 
    else { lightTheme(themeSwitch); } })

//switch theme upon prefered color scheme change
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (event.matches) { darkTheme(themeSwitch); } 
    else { lightTheme(themeSwitch); } })

//initially sets the theme according to prefered color scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { 
    darkTheme(themeSwitch); }
else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    lightTheme(themeSwitch); }

function lightTheme(themeSwitch) {
    const html = document.querySelector("html");
    html.classList.remove("theme-dark");
    html.classList.add("theme-light");
    themeSwitch.textContent="dark_mode";  }

function darkTheme(themeSwitch) {
    const html = document.querySelector("html");
    html.classList.remove("theme-light");
    html.classList.add("theme-dark");
    themeSwitch.textContent="light_mode"; }
