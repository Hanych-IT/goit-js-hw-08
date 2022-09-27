import throttle from 'lodash.throttle';
const feedbackEl = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

initPage();

const onFormInput = event => {
  const { name, value } = event.target;
  try {
    let saveData = load(LOCALE_STORAGE_KEY);
    saveData = saveData ? saveData : {};

    saveData[name] = value;
    save(LOCALE_STORAGE_KEY, saveData);
  } catch (error) {
    console.log(error);
  }
};

const throttleOnFormImput = throttle(onFormInput, 500);

feedbackEl.addEventListener('input', throttleOnFormImput);

function initPage() {
  const saveData = load(LOCALE_STORAGE_KEY);

  if (!saveData) {
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {
    feedbackEl.elements[name].value = value;
  });
}

const handleSubmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  console.log({ Email: email.value, Message: message.value });
  event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
};

feedbackEl.addEventListener('submit', handleSubmit);
