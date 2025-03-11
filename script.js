const familia = [
    {
        nome: "José(Beto)",
        foto: './img/Beto.jpg',
        netos: [
            { nome: 'Tatiane', foto: '' },
            { nome: 'Bruno', foto: './img/Bruno.jpg'}
        ]
    },

    {
        nome: "Aparecido(Tim)",
        foto: './img/Tim.jpg',
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
            { nome: 'Anderson', foto: './img/Polaco.jpg' },
            { nome: 'Leonardo', foto: '' }
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
        foto: './img/Bim.jpg',
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
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('messages');

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const message = messageInput.value.trim();

    if(message !== '') {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
        messageInput.value = '';
    }
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
            <img src="./img/31.jpg" alt="Foto dos avos">
            <img src="./img/16.jpg" alt="Foto dos avos">
        </div>
    `;
    timeline.innerHTML += fotoavos;

    familia.forEach((filho, index) => {
        const filhoHTML = `
      <div class="filho">
        <h2>${filho.nome}</h2>
        <img src="${filho.foto}" alt="${filho.nome}">
        <p class="netos-div">Filhos:</p>
        <ul class="netos">
          ${filho.netos.map((neto) => `
            <li>
              <img src="${neto.foto}" alt="${neto.nome}">
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

const fotoPerfil = document.querySelectorAll('.profile-img');

fotoPerfil.forEach((foto) => {
    foto.addEventListener('click', () => {
        const videoId = foto.dataset.videoId;
        const modal = document.getElementById(`modal-${videoId}`);
        modal.classList.add('aberto');
    });
});

const fecharModal = document.querySelectorAll('.fechar-modal');
 
fecharModal.forEach((fecharModal) => {
    fecharModal.addEventListener('click', () => {
        const modal = fecharModal.parentNode.parentNode;
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