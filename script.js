import { familia } from "./familia.js";
import {
  db,
  ref,
  push,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "./firebase-config.js";

// Lista de todas as fotos da pasta img/Fotos
const fotos = [
  "02.jpg",
  "03.jpg",
  "04.jpg",
  "05.jpg",
  "06.jpg",
  "07.jpg",
  "08.jpg",
  "09.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
  "13.jpg",
  "14.jpg",
  "15.jpg",
  "16.jpg",
  "17.jpg",
  "18.jpg",
  "19.jpg",
  "20.jpg",
  "21.jpg",
  "22.jpg",
  "23.jpg",
  "25.jpg",
  "26.jpg",
  "27.jpg",
  "28.jpg",
  "29.jpg",
  "30.jpg",
  "31.jpg",
  "32.jpg",
  "33.jpg",
  "34.jpg",
  "35.jpg",
  "36.jpg",
  "37.jpg",
  "38.jpg",
  "39.jpg",
  "40.jpg",
  "41.jpg",
  "42.jpg",
  "43.jpg",
  "44.jpg",
  "45.jpg",
  "46.jpg",
  "47.jpg",
  "48.jpg",
  "49.jpg",
  "50.jpg",
  "51.jpg",
  "52.jpg",
  "54.jpg",
  "55.jpg",
  "56.jpg",
  "57.jpg",
  "58.jpg",
  "59.jpg",
  "60.jpg",
  "61.jpg",
  "62.jpg",
  "63.jpg",
  "64.JPG",
  "65.JPG",
  "66.jpg",
  "67.jpg",
  "68.jpeg",
  "69.jpeg",
  "69.jpg",
  "70.jpeg",
  "70.jpg",
  "71.jpeg",
  "72.jpeg",
  "72.JPG",
  "73.jpeg",
  "74.jpeg",
  "75.jpeg",
  "76.jpeg",
  "77.jpeg",
  "78.jpeg",
  "79.jpeg",
  "80.jpeg",
  "81.jpeg",
  "82.jpeg",
  "83.jpeg",
  "84.jpeg",
  "85.jpeg",
  "86.jpeg",
  "87.jpeg",
  "88.jpeg",
  "89.jpg",
  "90.jpg",
  "91.jpg",
  "92.jpg",
  "93.jpg",
  "94.jpg",
  "95.jpg",
  "96.jpg",
  "97.jpg",
  "98.jpg",
  "99.jpg",
  "100.jpg",
  "101.jpg",
  "102.jpg",
  "103.jpg",
  "104.jpg",
  "105.jpg",
  "106.jpg",
  "107.jpg",
  "108.jpg",
  "109.jpg",
  "110.jpg",
  "111.jpg",  
  "112.jpg",
  "113.jpg",
];

// Lista de todos os vídeos da pasta img/Videos
const videos = [
  "video01.mp4",
  "video02.mp4",
  "video03.mp4",
  "video04.mp4",
  "Video05.mp4",
  "video06.mp4",
  "Video07.mp4",
  "video070.mp4",
];

// Função para carregar a galeria de fotos
function carregarGaleria() {
  const galeria = document.getElementById("photo-galeria");
  if (!galeria) return;

  fotos.forEach((foto) => {
    const divFoto = document.createElement("div");
    divFoto.classList.add("foto");

    const img = document.createElement("img");
    img.src = `img/Fotos/${foto}`;
    img.classList.add("thumbnail");
    img.alt = `Foto ${foto}`;

    divFoto.appendChild(img);
    galeria.appendChild(divFoto);
  });
}

// Função para carregar a galeria de vídeos
function carregarVideos() {
  const galeriaVideos = document.getElementById("video-galeria");
  if (!galeriaVideos) return;

  videos.forEach((video) => {
    const divVideo = document.createElement("div");
    divVideo.classList.add("video");

    const videoElement = document.createElement("video");
    videoElement.src = `img/Videos/${video}`;
    videoElement.classList.add("thumbnail");
    videoElement.controls = true;

    divVideo.appendChild(videoElement);
    galeriaVideos.appendChild(divVideo);
  });
}

function showSection(sectionId) {
  // Esconde todas as seções
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => (section.style.display = "none"));

  // Mostra apenas a seção clicada
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}

// Tornar a função global
window.showSection = showSection;

// Exibir a seção "biografia" ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  showSection("biografia");
  carregarDepoimentos();
  carregarGaleria();
  carregarVideos();
});

const messageForm = document.getElementById("message-form");
const messagesContainer = document.getElementById("messages");

// Salvar depoimento no Firebase
messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name-input").value.trim();
  const message = document.getElementById("message-input").value.trim();

  if (!name || !message) {
    alert("Por favor, preencha nome e mensagem!");
    return;
  }

  // Salvar no Firebase
  const depoimentosRef = ref(db, "depoimentos");
  push(depoimentosRef, {
    nome: name,
    mensagem: message,
    data: new Date().toISOString(),
  })
    .then(() => {
      // Limpar formulário
      document.getElementById("name-input").value = "";
      document.getElementById("message-input").value = "";
      console.log("Depoimento salvo com sucesso!");
    })
    .catch((error) => {
      alert("Erro ao salvar: " + error.message);
    });
});

// Carregar depoimentos do Firebase em tempo real
function carregarDepoimentos() {
  const depoimentosRef = ref(db, "depoimentos");
  const depoimentosQuery = query(depoimentosRef, limitToLast(50)); // Últimos 50

  onValue(depoimentosQuery, (snapshot) => {
    messagesContainer.innerHTML = ""; // Limpar

    const depoimentos = [];
    snapshot.forEach((childSnapshot) => {
      depoimentos.unshift(childSnapshot.val()); // Adicionar no início (mais recentes)
    });

    depoimentos.forEach((dep) => {
      const messageCard = document.createElement("div");
      messageCard.classList.add("message-card");

      const nameElement = document.createElement("div");
      nameElement.classList.add("name");
      nameElement.textContent = dep.nome;

      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.textContent = dep.mensagem;

      const dataElement = document.createElement("div");
      dataElement.classList.add("data");
      dataElement.style.fontSize = "0.8em";
      dataElement.style.color = "#999";
      dataElement.textContent = new Date(dep.data).toLocaleDateString("pt-BR");

      messageCard.appendChild(nameElement);
      messageCard.appendChild(messageElement);
      messageCard.appendChild(dataElement);

      messagesContainer.appendChild(messageCard);
    });
  });
}

const biografia = document.getElementById("biografia");
const timeline = document.getElementById("timeline");

if (timeline) {
  const fotoavos = `
        <div class="foto-avos">
            <img src="./img/71.JPG" alt="Foto dos avos" class="thumbnail2">
            <img src="./img/vovóo.jpg" alt="Foto dos avos" class="thumbnail2">
        </div>
    `;
  timeline.innerHTML += fotoavos;

  familia.forEach((filho, index) => {
    const filhoHTML = `
      <div class="filho">
        <h2>${filho.nome}</h2>
        <img src="${filho.foto}" alt="${filho.nome}" class="thumbnail2">
        <p class="netos-div">Netos:</p>
        <ul class="netos">
          ${filho.netos
            .map(
              (neto) => `
            <li>
              <img src="${neto.foto}" alt="${neto.nome}" class="thumbnail2">
              <span>${neto.nome}</span>
              ${
                neto.bisnetos
                  ? `
                <ul class="bisnetos">
                  ${neto.bisnetos
                    .map(
                      (bisneto) => `
                    <li>
                      <img src="${bisneto.foto}" alt="${bisneto.nome}" class="thumbnail2">
                      <span>${bisneto.nome}</span>
                    </li>
                  `
                    )
                    .join("")}
                </ul>
              `
                  : ""
              }
            </li>
          `
            )
            .join("")}
        </ul>
      </div>
    `;
    timeline.innerHTML += filhoHTML;
  });
} else {
  console.log("Elemento timeline não encontrado");
}

document.addEventListener("DOMContentLoaded", () => {
  const thumbnail2 = document.querySelectorAll(".thumbnail2");

  thumbnail2.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      // Criar Modal
      const modalFoto = document.createElement("div");
      modalFoto.classList.add("modalFoto");

      //adicionar imagem ao modal
      const img = document.createElement("img");
      img.src = thumbnail.src;
      img.classList.add("modal-img");
      modalFoto.appendChild(img);

      // Adicionar o modal ao body
      document.body.appendChild(modalFoto);

      // Escurecer o fundo
      modalFoto.style.position = "fixed";
      modalFoto.style.top = "0";
      modalFoto.style.left = "0";
      modalFoto.style.width = "100%";
      modalFoto.style.height = "100%";
      modalFoto.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      modalFoto.style.display = "flex";
      modalFoto.style.justifyContent = "center";
      modalFoto.style.alignItems = "center";
      modalFoto.style.zIndex = "1000";
      modalFoto.style.cursor = "pointer";

      // Fechar o modal ao clicar
      modalFoto.addEventListener("click", () => {
        modalFoto.remove();
      });

      // if (thumbnail.classList.contains('enlarged')) {
      //     thumbnail.classList.remove('enlarged');
      // } else {
      //     thumbnail2.forEach(img => img.classList.remove('enlarged'));
      //     thumbnail.classList.add('enlarged');
      // }
    });
  });
});

const fotoPerfil = document.querySelectorAll(".profile-img");

fotoPerfil.forEach((foto) => {
  foto.addEventListener("click", () => {
    const videoId = foto.dataset.videoId;
    const modal = document.getElementById(`modal-${videoId}`);
    modal.classList.add("aberto");
  });
});

const fecharModal = document.querySelectorAll(".fechar-modal");

fecharModal.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    const video = modal.querySelector("video");
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    modal.classList.remove("aberto");
  });
});

const thumbnail = document.querySelectorAll(".thumbnail");

thumbnail.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    const modalFoto = document.createElement("div");
    modalFoto.classList.add("modalFoto");

    const img = document.createElement("img");
    img.src = thumbnail.src;
    img.classList.add("modal-img");
    modalFoto.appendChild(img);
    document.body.appendChild(modalFoto);

    modalFoto.addEventListener("click", () => {
      modalFoto.remove();
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", () => {
      const modalFoto = document.createElement("div");
      modalFoto.classList.add("modalFoto");

      const img = document.createElement("img");
      img.src = thumbnail.src;
      img.classList.add("modal-img");
      modalFoto.appendChild(img);

      document.body.appendChild(modalFoto);

      // Escurecer o fundo
      modalFoto.style.position = "fixed";
      modalFoto.style.top = "0";
      modalFoto.style.left = "0";
      modalFoto.style.width = "100%";
      modalFoto.style.height = "100%";
      modalFoto.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      modalFoto.style.display = "flex";
      modalFoto.style.justifyContent = "center";
      modalFoto.style.alignItems = "center";
      modalFoto.style.zIndex = "1000";
      modalFoto.style.cursor = "pointer";

      // Fechar o modal ao clicar
      modalFoto.addEventListener("click", () => {
        modalFoto.remove();
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const galleryImages = document.querySelectorAll(".thumbnail");
  let currentIndex = 0;

  // Criar o modal, mas não exibi-lo imediatamente
  const modal = document.createElement("div");
  modal.classList.add("gallery-modal");
  modal.style.display = "none"; // Inicialmente escondido
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "1000";

  const modalImage = document.createElement("img");
  modalImage.classList.add("modal-img");
  modalImage.style.maxWidth = "80%";
  modalImage.style.maxHeight = "80%";
  modal.appendChild(modalImage);

  const prevButton = document.createElement("span");
  prevButton.textContent = "❮";
  prevButton.style.position = "absolute";
  prevButton.style.left = "20px";
  prevButton.style.color = "white";
  prevButton.style.fontSize = "40px";
  prevButton.style.cursor = "pointer";
  modal.appendChild(prevButton);

  const nextButton = document.createElement("span");
  nextButton.textContent = "❯";
  nextButton.style.position = "absolute";
  nextButton.style.right = "20px";
  nextButton.style.color = "white";
  nextButton.style.fontSize = "40px";
  nextButton.style.cursor = "pointer";
  modal.appendChild(nextButton);

  document.body.appendChild(modal);

  // Adicionar evento de clique nas imagens da galeria
  galleryImages.forEach((image, index) => {
    image.addEventListener("click", () => {
      currentIndex = index;
      modalImage.src = image.src;
      modal.style.display = "flex"; // Exibir o modal ao clicar
    });
  });

  // Navegar para a imagem anterior
  prevButton.addEventListener("click", () => {
    currentIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    modalImage.src = galleryImages[currentIndex].src;
  });

  // Navegar para a próxima imagem
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    modalImage.src = galleryImages[currentIndex].src;
  });

  // Fechar o modal ao clicar fora da imagem
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"; // Esconder o modal
    }
  });
});

function showTab(tabId) {
  const tabs = document.querySelectorAll(".tab-content");
  tabs.forEach((tab) => (tab.style.display = "none"));

  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.style.display = "block";
  }
}

window.showTab = showTab;

// Conectar com o banco de dados
document
  .getElementById("message-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name-input");
    const messageInput = document.getElementById("message-input");

    if (!nameInput.value || !messageInput.value) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/depoimentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value,
          mensagem: messageInput.value,
        }),
      });

      if (response.ok) {
        alert("Depoimento enviado com sucesso!");
        nameInput.value = "";
        messageInput.value = "";
        loadMessages();
      } else {
        alert("Erro ao enviar depoimento. Tente novamente mais tarde.");
      }
    } catch (error) {
      console.log("Erro", error);
      alert("Erro a conectar ao servidor.");
      nameInput.value = "";
      messageInput.value = "";
    }
  });

async function loadMessages() {
  try {
    const response = await fetch("http://localhost:3000/depoimentos");
    const messages = await response.json();

    const messagensDiv = document.getElementById("messages");
    messagensDiv.innerHTML = "";

    messages.forEach((message) => {
      const messageCard = document.createElement("div");
      messageCard.classList.add("message-card");

      const nameElement = document.createElement("div");
      nameElement.classList.add("name");
      nameElement.textContent = message.nome;

      const messageElement = document.createElement("div");
      messageElement.classList.add("message");
      messageElement.textContent = message.mensagem;

      const dateElement = document.createElement("div");
      dateElement.classList.add("date");
      const date = new Date(message.created_at || Date.now());
      dateElement.textContent = date.toLocaleDateString("pt-BR");

      messageCard.appendChild(nameElement);
      messageCard.appendChild(messageElement);
      messageCard.appendChild(dateElement);

      messagensDiv.appendChild(messageCard);
    });
  } catch (error) {
    console.log("Erro ao carregar mensagens", error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadMessages();
});
