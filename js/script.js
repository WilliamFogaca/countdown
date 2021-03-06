//Class
import Countdown from "./modules/Countdown.js";

//Components
import CreateErrorMessage from "./modules/components/ErrorMessage.js";
import CreateCountdownElement from "./modules/components/CountdownElement.js";

const actualDate = new Date().toISOString().split('T')[0];

const inputCalendar = document.querySelector('input[type="date"]');
inputCalendar.setAttribute('min', actualDate);

const addDate = document.querySelector('.addDate');

let events = [];

function saveValuesLocalStorage(date, event) {
  const countdown = {
    event: event,
    date: date,
  }

  localStorage[event] = JSON.stringify(countdown);
}

function setValuesLocalStorage() {
  const properties = Object.keys(localStorage);
  properties.forEach((propertie) => {
    const jsonCountdown = JSON.parse(localStorage[propertie]);
    const tempoParaData = new Countdown(`${jsonCountdown.date} 23:59:59 GMT-0300`);

    CreateCountdownElement(jsonCountdown.event, tempoParaData);
    addClickBtnDelete(tempoParaData, jsonCountdown.event);
  });
}

setValuesLocalStorage();

function toggleModal(modal) {
  modal.classList.toggle('ativo');
}

function cliqueForaModal(event, modal) {
  if (event.target === modal) {
    toggleModal(modal);
  }
}

function handleClickDelete(countdown, title, modal) {
  countdown.deleteCountdown(title);
  localStorage.removeItem(title);
  toggleModal(modal);

  const indexofInput = events.indexOf(title);
  events.splice(indexofInput, 1);

  const msgErro = document.querySelector(`[data-erro]`);
  const containerMsgErro = document.querySelector('.container-msg-erro');
  if (msgErro) {
    containerMsgErro.removeChild(msgErro);
  }
}

function addClickBtnDelete(countdown, event) {
  const botoes = document.querySelectorAll('.btn-delete');
  if (botoes) {
    const deleteDate = botoes[botoes.length - 1];
    const containerModal = document.querySelector(`[data-modal="${event}"]`);
    const deleteDateModal = document.querySelector(`[data-delete-date-modal="${event}"]`);
    const fechar = document.querySelector('.fechar');

    deleteDate.addEventListener('click', () => toggleModal(containerModal));

    deleteDateModal.addEventListener('click', () => handleClickDelete(countdown, event, containerModal));

    containerModal.addEventListener('click', (e) => cliqueForaModal(e, containerModal));

    fechar.addEventListener('click', () => toggleModal(containerModal));
  }
}

function handleClick(event) {
  event.preventDefault();
  const inputDate = document.getElementById('date').value;
  const inputEvent = document.getElementById('event').value;

  const msgErro = document.querySelector(`[data-erro]`);
  const containerMsgErro = document.querySelector('.container-msg-erro');

  if (msgErro) {
    containerMsgErro.removeChild(msgErro);
  }

  if (inputDate && inputEvent) {
    const futureDate = new Date(`${inputDate} 23:59:59 GMT-0300`).getTime();
    const actualDate = new Date().getTime();

    if(!((futureDate - actualDate) < 0)) {
      const tempoParaData = new Countdown(`${inputDate} 23:59:59 GMT-0300`);

      if (events.indexOf(inputEvent.toUpperCase()) === -1 && !localStorage[inputEvent]) {
        saveValuesLocalStorage(inputDate, inputEvent);
        CreateCountdownElement(inputEvent, tempoParaData);

        events.push(inputEvent.toUpperCase());
        addClickBtnDelete(tempoParaData, inputEvent);
      } else {
        CreateErrorMessage(inputEvent, 1);
      }
    }else {
      CreateErrorMessage(inputEvent, 3);
    }
  } else {
    CreateErrorMessage(inputEvent, 2);
  }
}

addDate.addEventListener('click', handleClick);
