export default function CreateErrorMessage(event, erroType) {
  const containerMsgErro = document.querySelector('.container-msg-erro');

    const div = document.createElement('div');
    const span = document.createElement('span');

    div.classList.add('msg-erro');
    div.setAttribute('data-erro', event);
    if(erroType === 1) {
      span.innerText = `Já existe um Countdown para ${event}!`;
    } else if(erroType === 2) {
      span.innerText = `Os campos acima são obrigatórios!`;
    }

    div.appendChild(span);
    containerMsgErro.appendChild(div);
}