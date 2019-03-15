export default function CreateErrorMessage(event) {
  const containerMsgErro = document.querySelector('.container-msg-erro');

  const div = document.createElement('div');
  const span = document.createElement('span');

  div.classList.add('msg-erro');
  div.setAttribute('data-erro', event);
  span.innerText = `Já existe um Countdown para ${event}!`;

  div.appendChild(span);
  containerMsgErro.appendChild(div);
}