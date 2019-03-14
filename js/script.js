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

    tempoParaData.createElement(jsonCountdown.event);
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
}

function handleClick(event) {
  event.preventDefault();

  const inputDate = document.getElementById('date').value;
  const inputEvent = document.getElementById('event').value;

  if(inputDate && inputEvent) {

    saveValuesLocalStorage(inputDate, inputEvent);

    const tempoParaData = new Countdown(`${inputDate} 23:59:59 GMT-0300`);
    tempoParaData.createElement(inputEvent);
    
    addClickBtnDelete(tempoParaData, inputEvent);
  }
}

addDate.addEventListener('click', handleClick);
