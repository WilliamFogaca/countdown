export default function CreateModal(title) {
  const allModals = document.querySelector('.all-modals');
  const containerModal = document.createElement('div');
  const modal = document.createElement('div');
  const buttonModalFechar = document.createElement('button');
  const p = document.createElement('p');
  const buttonModalApagar = document.createElement('button');
  
  containerModal.classList.add('container-modal');
  containerModal.setAttribute('data-modal', title);
  modal.classList.add('modal');
  buttonModalFechar.classList.add('fechar');
  buttonModalFechar.innerText = 'X';
  p.innerText = 'Tem certeza que deseja apagar esse evento?';
  buttonModalApagar.setAttribute('data-delete-date-modal', title);
  buttonModalApagar.innerText = 'Apagar';
  buttonModalApagar.classList.add('delete-date-modal');

  modal.appendChild(buttonModalFechar);
  modal.appendChild(p);
  modal.appendChild(buttonModalApagar);
  containerModal.appendChild(modal);
  allModals.appendChild(containerModal);
}