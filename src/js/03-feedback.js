// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message,
// в которых сохраняй текущие значения полей формы.Пусть ключом для хранилища будет строка "feedback-form-state".
// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы.
// В противном случае поля должны быть пустыми.
// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.
// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.
const throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input');
const textareaEl = document.querySelector('textarea');
const buttonEl = document.querySelector('button');
const FORM_KEY = 'feedback-form-state';
const localObj = {
  email: '',
  message: '',
};

formEl.addEventListener('input', throttle(textInput, 500));

function textInput(evt) {
  if (evt.target.type === 'email') {
    localObj.email = evt.target.value;
    localStorage.setItem(FORM_KEY, JSON.stringify(localObj));
  } else if (evt.target.type === 'textarea') {
    localObj.message = evt.target.value;
    localStorage.setItem(FORM_KEY, JSON.stringify(localObj));
  }
}

fillInput();

function fillInput() {
  try {
    inputEl.value = JSON.parse(localStorage.getItem(FORM_KEY)).email;
    textareaEl.value = JSON.parse(localStorage.getItem(FORM_KEY)).message;
  } catch (error) {
    inputEl.value = '';
    textareaEl.value = '';
  }
}

buttonEl.addEventListener('click', onclickSubmit);

function onclickSubmit(evt) {
  evt.preventDefault();
  console.log(localObj);
  localStorage.removeItem(FORM_KEY);
  formEl.reset();
}
