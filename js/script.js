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



function toggleModal(event, modal) {
  event.preventDefault();
  const containerModal = document.querySelector('.container-modal');
  containerModal.classList.toggle('ativo');
}

function cliqueForaModal(event) {
  if(event.target === this){
    toggleModal(event);
  }
}

function handleClickDelete(countdown, title, modal) {
  countdown.deleteCountdown(title);
  localStorage.removeItem(title);
  modal.classList.remove('ativo');
  
  const indexofInput = events.indexOf(title);
  events.splice(indexofInput, 1);

  const msgErro = document.querySelector(`[data-erro]`);
  const containerMsgErro = document.querySelector('.container-msg-erro');
  if(msgErro) {
    containerMsgErro.removeChild(msgErro);
  }
}

function addClickBtnDelete(countdown, event) {
  const botoes = document.querySelectorAll('.btn-delete');
  if(botoes) {
    const deleteDate = botoes[botoes.length - 1];
    const containerModal = document.querySelector('.container-modal');
    const deleteDateModal = document.querySelector('.delete-date-modal');
    const fechar = document.querySelector('.fechar');

    deleteDate.addEventListener('click', toggleModal);

    deleteDateModal.addEventListener('click', () => handleClickDelete(countdown, event, containerModal));
    
    containerModal.addEventListener('click', cliqueForaModal);

    fechar.addEventListener('click', toggleModal);

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

console.log(events);

addDate.addEventListener('click', handleClick);
