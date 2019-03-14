import Countdown from "./modules/Countdown.js";

const addDate = document.querySelector('.addDate');

function handleClickDelete(countdown, title) {
  countdown.deleteCountdown(title);
}

function handleClick(event) {
  event.preventDefault();

  const inputDate = document.getElementById('date').value;
  const inputEvent = document.getElementById('event').value;

  const tempoParaData = new Countdown(`${inputDate} 23:59:59 GMT-0300`);
  tempoParaData.createElement(inputEvent);

  const botoes = document.querySelectorAll('.btn-delete');
  const deleteDate = botoes[botoes.length - 1];
  console.log(deleteDate);

  deleteDate.addEventListener('click', () => handleClickDelete(tempoParaData, inputEvent));
}

addDate.addEventListener('click', handleClick);
