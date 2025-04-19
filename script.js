
import {familia } from './familia.js';
function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');

    // Mostra apenas a seção clicada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}

// Tornar a função global
window.showSection = showSection;

// Exibir a seção "biografia" ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showSection('biografia');
});


const messageForm = document.getElementById('message-form');
const messagesContainer = document.getElementById('messages');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name-input').value;
  const message = document.getElementById('message-input').value;

  const messageCard = document.createElement('div');
  messageCard.classList.add('message-card');

  const nameElement = document.createElement('div');
  nameElement.classList.add('name');
  nameElement.textContent = name;

  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.textContent = message;

  messageCard.appendChild(nameElement);
  messageCard.appendChild(messageElement);

  messagesContainer.appendChild(messageCard);
});

// Carrega as mensagens
const storedMessages = localStorage.getItem('messages');

if(storedMessages) {
    const messages = JSON.parse(storedMessages);
    messages.forEach((message) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
    })
}

// Adicionar mensagem 

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();

    if(message !== '') {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));

        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
        messageInput.value = '';
    }
})


const biografia = document.getElementById("biografia");
const timeline = document.getElementById("timeline");

if(timeline) {

    const fotoavos = `
        <div class="foto-avos">
            <img src="./img/Dudu2.jpg" alt="Foto dos avos" class="thumbnail2">
            <img src="./img/vovóo.jpg" alt="Foto dos avos" class="thumbnail2">
        </div>
    `;
    timeline.innerHTML += fotoavos;

    familia.forEach((filho, index) => {
        const filhoHTML = `
      <div class="filho">
        <h2>${filho.nome}</h2>
        <img src="${filho.foto}" alt="${filho.nome}" class="thumbnail2">
        <p class="netos-div">Filhos:</p>
        <ul class="netos">
          ${filho.netos.map((neto) => `
            <li>
              <img src="${neto.foto}" alt="${neto.nome}" class="thumbnail2">
              <span>${neto.nome}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
    timeline.innerHTML += filhoHTML;
    });
} else {
    console.log("Elemento timeline não encontrado")
}

document.addEventListener("DOMContentLoaded", () => {
    const thumbnail2 = document.querySelectorAll(".thumbnail2");

    thumbnail2.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
            if (thumbnail.classList.contains('enlarged')) {
                thumbnail.classList.remove('enlarged');
            } else {
                thumbnail2.forEach(img => img.classList.remove('enlarged'));
                thumbnail.classList.add('enlarged');
            }
        })
    });
});

const fotoPerfil = document.querySelectorAll('.profile-img');

fotoPerfil.forEach((foto) => {
    foto.addEventListener('click', () => {
        const videoId = foto.dataset.videoId;
        const modal = document.getElementById(`modal-${videoId}`);
        modal.classList.add('aberto');
    });
});

const fecharModal = document.querySelectorAll('.fechar-modal');
 
fecharModal.forEach((button) => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }

        modal.classList.remove('aberto');
    })
})

const thumbnail = document.querySelectorAll(".thumbnail");

thumbnail.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
        const modalFoto = document.createElement('div');
        modalFoto.classList.add('modalFoto');

        const img = document.createElement('img');
        img.src = thumbnail.src;
        img.classList.add('modal-img');
        modalFoto.appendChild(img);
        document.body.appendChild(modalFoto);

        modalFoto.addEventListener('click', () => {
            modalFoto.remove();
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener('click', () => {
            const modalFoto = document.createElement('div');
            modalFoto.classList.add('modalFoto');

            const img = document.createElement('img');
            img.src = thumbnail.src;
            img.classList.add('modal-img');
            modalFoto.appendChild(img);

            document.body.appendChild(modalFoto);

            // Escurecer o fundo
            modalFoto.style.position = 'fixed';
            modalFoto.style.top = '0';
            modalFoto.style.left = '0';
            modalFoto.style.width = '100%';
            modalFoto.style.height = '100%';
            modalFoto.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            modalFoto.style.display = 'flex';
            modalFoto.style.justifyContent = 'center';
            modalFoto.style.alignItems = 'center';
            modalFoto.style.zIndex = '1000';
            modalFoto.style.cursor = 'pointer';


            // Fechar o modal ao clicar
            modalFoto.addEventListener('click', () => {
                modalFoto.remove();
            });
        })
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;

    // Criar o modal, mas não exibi-lo imediatamente
    const modal = document.createElement('div');
    modal.classList.add('gallery-modal');
    modal.style.display = 'none'; // Inicialmente escondido
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const modalImage = document.createElement('img');
    modalImage.classList.add('modal-img');
    modalImage.style.maxWidth = '80%';
    modalImage.style.maxHeight = '80%';
    modal.appendChild(modalImage);

    const prevButton = document.createElement('span');
    prevButton.textContent = '❮';
    prevButton.style.position = 'absolute';
    prevButton.style.left = '20px';
    prevButton.style.color = 'white';
    prevButton.style.fontSize = '40px';
    prevButton.style.cursor = 'pointer';
    modal.appendChild(prevButton);

    const nextButton = document.createElement('span');
    nextButton.textContent = '❯';
    nextButton.style.position = 'absolute';
    nextButton.style.right = '20px';
    nextButton.style.color = 'white';
    nextButton.style.fontSize = '40px';
    nextButton.style.cursor = 'pointer';
    modal.appendChild(nextButton);

    document.body.appendChild(modal);

    // Adicionar evento de clique nas imagens da galeria
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            currentIndex = index;
            modalImage.src = image.src;
            modal.style.display = 'flex'; // Exibir o modal ao clicar
        });
    });

    // Navegar para a imagem anterior
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        modalImage.src = galleryImages[currentIndex].src;
    });

    // Navegar para a próxima imagem
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        modalImage.src = galleryImages[currentIndex].src;
    });

    // Fechar o modal ao clicar fora da imagem
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'; // Esconder o modal
        }
    });
});

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';
    }
}
