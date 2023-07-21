import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const fieldEmail = document.querySelector('.feedback-form input');
const fieldMessage = document.querySelector('.feedback-form textarea')

const KEY_FORM = "feedback-form-state";

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

//викликаємо функцію для заповнення полів збереженим текстом 
savedTextInField()

//стоворюємо змінну для збереження даних для local storage

let objectDataForm = {};


// окрема функція для отримання даних з local storage або порожнього об"єкту, якщо там нічого немає
function getDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem(KEY_FORM)) ?? {};
}

//зберігаємо дані в local storage
function onInput(evt) {
    evt.preventDefault();

    objectDataForm = getDataFromLocalStorage();

    objectDataForm[evt.target.name] = evt.target.value;

    localStorage.setItem(KEY_FORM, JSON.stringify(objectDataForm));


}

//функція заповнення полів форми збереженими в local storage значеннями 
function savedTextInField() {

    const savedFormData = getDataFromLocalStorage();

    if (savedFormData.email) {
        fieldEmail.value = savedFormData.email;
    }
    if (savedFormData.message) {
        fieldMessage.value = savedFormData.message;
    }
}


//перевіряємо заповнені поля, виводимо їх в консоль та очищуємо local storage і поля форми 
function onSubmit(evt) {
    evt.preventDefault();
    if (!fieldEmail.value || !fieldMessage.value) {
        alert("Заповніть всі поля форми");
        return;
    }

    console.log(objectDataForm);
    localStorage.removeItem(KEY_FORM);
    evt.currentTarget.reset();
}