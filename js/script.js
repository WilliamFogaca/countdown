import Countdown from "./modules/Countdown.js";

const addDate = document.querySelector('.addDate');

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

    tempoParaData.createElementCountdown(jsonCountdown.event);
    addClickBtnDelete(tempoParaData, jsonCountdown.event);
  });
}

setValuesLocalStorage();

function addClickBtnDelete(countdown, event) {
  const botoes = document.querySelectorAll('.btn-delete');
  if(botoes) {
    const deleteDate = botoes[botoes.length - 1];
    deleteDate.addEventListener('click', () => handleClickDelete(countdown, event));
  }
}

function handleClickDelete(countdown, title) {
  countdown.deleteCountdown(title);
  localStorage.removeItem(title);
  const msgErro = document.querySelector(`[data-erro]`);
  const containerMsgErro = document.querySelector('.container-msg-erro');
  if(msgErro) {
    containerMsgErro.removeChild(msgErro);
  }
}

let events = [];

function handleClick(event) {
  event.preventDefault();
  const inputDate = document.getElementById('date').value;
  const inputEvent = document.getElementById('event').value;
  if(inputDate && inputEvent) {
    const msgErro = document.querySelector(`[data-erro]`);
    const containerMsgErro = document.querySelector('.container-msg-erro');

    if(msgErro) {
      containerMsgErro.removeChild(msgErro);
    }

    const tempoParaData = new Countdown(`${inputDate} 23:59:59 GMT-0300`);

    if(events.indexOf(inputEvent.toUpperCase()) === -1 && !localStorage[inputEvent]) {
      saveValuesLocalStorage(inputDate, inputEvent);
      tempoParaData.createElementCountdown(inputEvent);
      events.push(inputEvent.toUpperCase());
      addClickBtnDelete(tempoParaData, inputEvent);
    }else {
      tempoParaData.createElementError(inputEvent);
    }
  }
}

addDate.addEventListener('click', handleClick);
