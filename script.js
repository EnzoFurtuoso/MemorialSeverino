const familia = [
    {
        nome: "José(Beto)",
        foto: './img/Beto.jpg',
        netos: [
            { nome: 'Tatiane', foto: './img/Tati.jpg' },
            { nome: 'Bruno', foto: './img/Bruno.jpg'}
        ]
    },

    {
        nome: "Aparecido(Tim)",
        foto: './img/tiotim.jpeg',
        netos: [
            { nome: 'Aparecido(Cido)', foto: '' },
        ]
    },

    {
        nome: "Maria Aparecida(Tânia)",
        foto: './img/Tania.jpg',
        netos: [
            { nome: 'Enzo', foto: './img/Enzo.jpg' },
            { nome: 'Fagner', foto: './img/Fagner.jpg' },
            { nome: 'Venildo', foto: './img/Venildo.jpg' },
        ]
    },

    {
        nome: "Maria do Socorro(Teia)",
        foto: './img/Teia.jpg',
        netos: [
            { nome: 'Anderson', foto: './img/anderso,.jpeg' },
            { nome: 'Leonardo', foto: './img/leo.png' }
        ]
    },

    {
        nome: "Célia",
        foto: './img/Celia.jpg',
        netos: [
            { nome: 'Carlos Eduardo', foto: './img/Dudu.jpg' },
            { nome: 'Celine Mariane', foto: './img/Celine.jpg'}
        ]
    },

    {
        nome: "Sergio",
        foto: './img/Sergio.jpg',
        netos: [
            { nome: 'Luiz Fabiano', foto: './img/Fabiano.jpg' },
            { nome: 'Yasmin', foto: './img/yasmim.jpg',}
        ]
    },

    {
        nome: "Josias(Bim)",
        foto: './img/tiobim.jpg',
        netos: [
            { nome: 'Guilherme', foto: './img/Gui.jpg' },
        ]
    },
   
];


function showSection(sectionId) {
    // Esconde todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.style.display = 'none');

    // Mostra apenas a seção clicada
    document.getElementById(sectionId).style.display = 'block';
}

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