const familia = [
    {
        nome: "José(Beto)",
        foto: './img/Beto.jpg',
        anoNascimento: '07/02/1969',
        netos: [
            { nome: 'Tatiane', foto: '', anoNascimento: '23/12/1994' },
            { nome: 'Bruno', foto: '', anoNascimento: '18/08/1998'}
        ]
    },

    {
        nome: "Aparecido(Tim)",
        foto: '',
        anoNascimento: '27/10/1971',
        netos: [
            { nome: 'Aparecido(Cido)', foto: '', anoNascimento: '31/07/1997' },
        ]
    },

    {
        nome: "Maria Aparecida(Tânia)",
        foto: './img/Tania.jpg',
        anoNascimento: '14/07/1975',
        netos: [
            { nome: 'Enzo', foto: './img/Enzo.jpg', anoNascimento: '30/09/1993' },
            { nome: 'Fagner', foto: '', anoNascimento: '23/12/1996' },
            { nome: 'Venildo', foto: '', anoNascimento: '16/08/1999' },
        ]
    },

    {
        nome: "Maria do Socorro(Teia)",
        foto: '',
        anoNascimento: '31/10/1976',
        netos: [
            { nome: 'Anderson', foto: './img/Polaco.jpg', anoNascimento: '10/09/1995' },
            { nome: 'Leonardo', foto: '', anoNascimento: '29/01/2001' }
        ]
    },

    {
        nome: "Célia",
        foto: './img/Celia.jpg',
        anoNascimento: '21/06/1979',
        netos: [
            { nome: 'Carlos Eduardo', foto: '', anoNascimento: '17/07/2003' },
            { nome: 'Celine Mariane', foto: './img/Celine.jpg', anoNascimento: '16/09/2005'}
        ]
    },

    {
        nome: "Sergio",
        foto: './img/Sergio.jpg',
        anoNascimento: '30/06/1983',
        netos: [
            { nome: 'Luiz Fabiano', foto: '', anoNascimento: '13/12/2009' },
            { nome: 'Yasmin', foto: '', anoNascimento: '09/01/2010'}
        ]
    },

    {
        nome: "Josias(Bim)",
        foto: './img/Bim.jpg',
        anoNascimento: '22/06/1989',
        netos: [
            { nome: 'Guilherme', foto: './img/Gui.jpg', anoNascimento: '04/09/2013' },
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