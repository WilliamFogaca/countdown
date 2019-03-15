import CreateModal from "./Modal.js";

export default function CreateCountdownElement(title, countdown) {
  //Cria elemento
  const containerResult = document.querySelector('.container-result');
  const div = document.createElement('div');
  const h1 = document.createElement('h1');
  const button = document.createElement('button');
  const span = document.createElement('span');
  
  div.setAttribute('data-container-countdown', title);
  h1.classList.add('title');
  h1.innerText = `Tempo para o ${title}`;
  button.classList.add('btn-delete');
  button.innerHTML = '<i class="far fa-trash-alt"></i>';
  span.setAttribute('data-event', title);
  h1.appendChild(button);
  div.appendChild(h1);
  div.appendChild(span);

  containerResult.appendChild(div);
  
  span.innerText = `Faltam ${countdown.total.days} dias, ${countdown.total.hours} horas, ${countdown.total.minutes} minutos e ${countdown.total.seconds} segundos para o ${title}!`;

  //Cria modal
  CreateModal(title);

  countdown.doCountdown(span, title);
}