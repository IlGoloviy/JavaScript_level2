const regexpName = /^([a-z]+)$/gim;
const regexpEmail = /^([a-z0-9\.-]+)@mail\.ru$/gim;
const regexpPhone = /^\+7\(([0-9]{3})\)([0-9]{3})\-([0-9]{4})$/gim;

window.onload = () => {
  const btn = document.getElementById('btn');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('tel');
  btn.addEventListener('click', () => {
    name.style.border = "1px solid rgb(169, 169, 169)";
    email.style.border = "1px solid rgb(169, 169, 169)";
    phone.style.border = "1px solid rgb(169, 169, 169)";
    if (regexpName.test(name.value) !== true) {
      name.style.border = "2px solid red";
      name.value = '';
      name.setAttribute('placeholder', 'NAME IS NOT CORRECT! enter repeat please...');
    }
    if (regexpEmail.test(email.value) !== true) {
      email.style.border = "2px solid red";
      email.value = '';
      email.setAttribute('placeholder', 'EMAIL IS NOT CORRECT! enter repeat please...');
    }
    if (regexpPhone.test(phone.value) !== true) {
      phone.style.border = "2px solid red";
      phone.value = '';
      phone.setAttribute('placeholder', 'PHONE IS NOT CORRECT! enter repeat please...');
    }
  });
}