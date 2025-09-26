function handleSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const mensaje = form.mensaje.value.trim();
  const formMessage = document.getElementById('form-message');

  if (!nombre || !email || !mensaje) {
    formMessage.textContent = 'Por favor, completa todos los campos.';
    formMessage.className = 'form-message error';
    formMessage.style.display = 'block';
    return;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    formMessage.textContent = 'Por favor, ingresa un email válido.';
    formMessage.className = 'form-message error';
    formMessage.style.display = 'block';
    return;
  }

  formMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
  formMessage.className = 'form-message success';
  formMessage.style.display = 'block';
  form.reset();

  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav ul li a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});

const gameBoard = document.getElementById("gameBoard");

const cards = [
  "💻", "💻",
  "🌐", "🌐",
  "📊", "📊",
  "🎥", "🎥",
  "🔒", "🔒",
  "🖥️", "🖥️",
  "📱", "📱",
  "⚙️", "⚙️"
];

cards.sort(() => 0.5 - Math.random());

let flippedCards = [];
let matchedCards = [];

function renderBoard() {
  gameBoard.innerHTML = "";
  cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card-game");
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.textContent = symbol; 
    card.classList.add("flipped"); 
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });

  setTimeout(() => {
    document.querySelectorAll(".card-game").forEach(card => {
      card.classList.remove("flipped");
      card.textContent = "";
    });
  }, 3000); 
}

function flipCard() {
  const card = this;
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    card.textContent = card.dataset.symbol;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.symbol === card2.dataset.symbol) {
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert(" ¡Ganaste! Has encontrado todas las parejas."), 300);
    }
  } else {
    card1.classList.remove("flipped");
    card1.textContent = "";
    card2.classList.remove("flipped");
    card2.textContent = "";
  }
  flippedCards = [];
}

renderBoard();
