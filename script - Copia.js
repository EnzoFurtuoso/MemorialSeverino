const familia = [
    {
        nome: "José(Beto)",
        foto: './img/Beto.jpg',
        netos: [
            { nome: 'Tatiane', foto: '' },
            { nome: 'Bruno', foto: ''}
        ]
    },

    {
        nome: "Aparecido(Tim)",
        foto: '',
        netos: [
            { nome: 'Aparecido(Cido)', foto: '' },
        ]
    },

    {
        nome: "Maria Aparecida(Tânia)",
        foto: './img/Tania.jpg',
        netos: [
            { nome: 'Enzo', foto: './img/Enzo.jpg' },
            { nome: 'Fagner', foto: '' },
            { nome: 'Venildo', foto: '' },
        ]
    },

    {
        nome: "Maria do Socorro(Teia)",
        foto: '',
        netos: [
            { nome: 'Anderson', foto: './img/Polaco.jpg' },
            { nome: 'Leonardo', foto: ''}
        ]
    },

    {
        nome: "Célia",
        foto: './img/Celia.jpg',
        netos: [
            { nome: 'Carlos Eduardo', foto: '' },
            { nome: 'Celine Mariane', foto: './img/Celine.jpg'}
        ]
    },

    {
        nome: "Sergio",
        foto: '',
        netos: [
            { nome: 'Luiz Fabiano', foto: '' },
            { nome: 'Yasmin', foto: ''}
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

function addMessage() {
    let input = document.getElementById('message-input');

    let messageText = document.getElementById("messages");

    if(input.value.trim() !== "") {
        let newMessage = document.createElement("p");

        newMessage.textContent = input.value;

        messageText.appendChild(newMessage);

        input.value = '';
    }
}

const biografia = document.getElementById("biografia");
const timeline = document.getElementById("timeline");

if(timeline) {
    familia.forEach((filho, index) => {
        const filhoHTML = `
          <p>${filho.nome}</p>
          <img src="${filho.foto}" alt="${filho.nome}">
      
          <ul>
            ${filho.netos.map((neto) => `
              <li>
                <img src="${neto.foto}" alt="${neto.nome}">
                <span>${neto.nome}</span>
              </li>
            `).join('')}
          </ul>
        `;
        timeline.innerHTML += filhoHTML;
    });
} else {
    console.log("Elemento timeline não encontrado")
}


