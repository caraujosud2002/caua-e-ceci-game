// Estado do jogo
let currentQuestionIndex = 0;
let heartsInterval;

// Perguntas do quiz
const quizQuestions = [
    {
        question: "Onde foi nosso primeiro encontro?",
        options: ["Shopping", "Rodoviária", "Parque"],
        correct: 1
    },
    {
        question: "Qual comida você sempre pede quando saímos?",
        options: ["Pizza", "Hambúrguer", "Sushi"],
        correct: 1
    },
    {
        question: "Qual foi a primeira viagem que fizemos juntos?",
        options: ["São Paulo", "Campinas", "Rio de Janeiro"],
        correct: 1
    },
    {
        question: "O que eu sempre faço que te faz rir?",
        options: ["Cantar", "Dançar", "Contar piadas"],
        correct: 1
    },
    {
        question: "Qual presente eu já te dei que você mais gostou?",
        options: ["Flores", "Quadro", "Chocolate"],
        correct: 1
    },
    {
        question: "Qual foi o filme ou série que vimos mais vezes juntos?",
        options: ["Friends", "The Chosen", "Marvel"],
        correct: 1
    },
    {
        question: "Quem é mais provável de esquecer um compromisso: eu ou você?",
        options: ["Você", "Eu", "Os dois igual"],
        correct: 1
    },
    {
        question: "Qual apelido carinhoso eu mais uso com você?",
        options: ["Amor", "Gata", "Princesa"],
        correct: 1
    },
    {
        question: "Onde tiramos aquela foto que você mais gosta?",
        options: ["Praia", "Igreja em Birigui", "Casa"],
        correct: 1
    },
    {
        question: "Qual foi o momento mais engraçado do nosso namoro até agora?",
        options: ["Te maquiando", "Cozinhando juntos", "No cinema"],
        correct: 0
    },
    {
        question: "Filme que o Cauã mais gostou de assistir com a Ceci",
        options: ["Titanic", "Minecraft", "Vingadores"],
        correct: 1
    },
    {
        question: "O que o Cauã mais sente saudades",
        options: ["De conversar", "De abraçar", "De passear"],
        correct: 1
    },
    {
        question: "O que o Cauã mais se irrita",
        options: ["Com o trânsito", "Com os outros", "Com o trabalho"],
        correct: 1
    },
    {
        question: "O que o Cauã mais se arrepende",
        options: ["De não estudar mais", "De demorar para voltar com a Ceci", "De não viajar mais"],
        correct: 1
    },
    {
        question: "O que o Cauã vai mais gostar quando casar",
        options: ["Ter uma casa própria", "Rafa e Bia não serem os adultos que mandam", "Viajar mais"],
        correct: 1
    },
    {
        question: "Como o Cauã está hoje",
        options: ["Feliz e animado", "Triste com saudades", "Ansioso"],
        correct: 1
    },
    {
        question: "Quem sofre mais com a missão",
        options: ["A Ceci", "Claro que sou eu", "Os dois igual"],
        correct: 1
    }
];

// Inicialização do jogo
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

function initializeGame() {
    // Elementos da tela inicial
    const startButton = document.getElementById('start-button');
    const gameTitle = document.getElementById('game-title');
    const hintMessage = document.getElementById('hint-message');
    
    // Evento do botão START (que não funciona)
    startButton.addEventListener('click', function() {
        // Animação de shake
        startButton.classList.add('shake');
        
        // Mostrar mensagem de dica
        hintMessage.classList.remove('hidden');
        hintMessage.classList.add('show');
        
        // Remover animação após completar
        setTimeout(() => {
            startButton.classList.remove('shake');
        }, 500);
        
        // Esconder mensagem após 3 segundos
        setTimeout(() => {
            hintMessage.classList.remove('show');
            setTimeout(() => {
                hintMessage.classList.add('hidden');
            }, 300);
        }, 3000);
    });
    
    // Evento do título (que realmente funciona)
    gameTitle.addEventListener('click', function() {
        showGallery();
    });
    
    // Botão continuar da galeria
    document.getElementById('continue-gallery').addEventListener('click', function() {
        showQuiz();
    });
    
    // Botões de engajamento
    setupEngagementButtons();
    
    // Botão jogar de novo
    document.getElementById('play-again').addEventListener('click', function() {
        restartGame();
    });
}

function showScreen(screenId) {
    // Esconder todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar tela específica
    document.getElementById(screenId).classList.add('active');
}

function showGallery() {
    showScreen('gallery-screen');
    
    // Adicionar efeito fade-in às fotos
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach((item, index) => {
        item.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
}

function showQuiz() {
    showScreen('quiz-screen');
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showFinalScreen();
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    const optionButtons = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('quiz-feedback');
    
    // Esconder feedback
    feedback.classList.remove('show');
    feedback.classList.add('hidden');
    
    // Carregar pergunta
    questionText.textContent = question.question;
    
    // Carregar opções
    optionButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.onclick = () => selectOption(index);
        btn.disabled = false;
        btn.style.opacity = '1';
    });
    
    // Animação de entrada
    document.getElementById('question-container').classList.add('fade-in');
}

function selectOption(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const feedback = document.getElementById('quiz-feedback');
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Desabilitar botões
    optionButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.6';
    });
    
    // Mostrar feedback
    feedback.classList.remove('hidden');
    
    if (selectedIndex === question.correct) {
        // Resposta correta
        feedback.textContent = "Certa resposta! ❤️";
        feedback.classList.add('correct');
        feedback.classList.remove('incorrect');
        
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    } else {
        // Resposta incorreta
        feedback.textContent = "Tenta de novo! 😅";
        feedback.classList.add('incorrect');
        feedback.classList.remove('correct');
        
        setTimeout(() => {
            // Reabilitar botões para nova tentativa
            optionButtons.forEach(btn => {
                btn.disabled = false;
                btn.style.opacity = '1';
            });
            feedback.classList.remove('show');
            setTimeout(() => {
                feedback.classList.add('hidden');
            }, 300);
        }, 1500);
    }
    
    feedback.classList.add('show');
}

function showFinalScreen() {
    showScreen('final-screen');
    startHeartAnimation();
}

function startHeartAnimation() {
    const heartsContainer = document.getElementById('hearts-container');
    
    // Limpar corações existentes
    heartsContainer.innerHTML = '';
    
    // Criar corações caindo
    heartsInterval = setInterval(() => {
        createFallingHeart();
    }, 300);
}

function createFallingHeart() {
    const heartsContainer = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    // Posição aleatória horizontal
    heart.style.left = Math.random() * 100 + '%';
    
    // Duração aleatória da animação
    const duration = Math.random() * 3 + 2; // 2-5 segundos
    heart.style.animationDuration = duration + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remover coração após animação
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, duration * 1000);
}

function setupEngagementButtons() {
    const btn1 = document.getElementById('engagement-btn-1');
    const btn2 = document.getElementById('engagement-btn-2');
    const btn3 = document.getElementById('engagement-btn-3');
    const btn4 = document.getElementById('engagement-btn-4');
    
    btn1.addEventListener('click', function() {
        btn1.classList.add('hidden');
        btn2.classList.remove('hidden');
        btn2.classList.add('bounce');
    });
    
    btn2.addEventListener('click', function() {
        btn2.classList.add('hidden');
        btn3.classList.remove('hidden');
        btn3.classList.add('bounce');
    });
    
    btn3.addEventListener('click', function() {
        btn3.classList.add('hidden');
        btn4.classList.remove('hidden');
        btn4.classList.add('bounce');
    });
    
    btn4.addEventListener('click', function() {
        btn4.classList.add('pulse');
        setTimeout(() => {
            btn4.classList.remove('pulse');
        }, 1000);
    });
}

function restartGame() {
    // Parar animação de corações
    if (heartsInterval) {
        clearInterval(heartsInterval);
    }
    
    // Resetar estado do quiz
    currentQuestionIndex = 0;
    
    // Resetar botões de engajamento
    document.getElementById('engagement-btn-1').classList.remove('hidden');
    document.getElementById('engagement-btn-2').classList.add('hidden');
    document.getElementById('engagement-btn-3').classList.add('hidden');
    document.getElementById('engagement-btn-4').classList.add('hidden');
    
    // Voltar para tela inicial
    showScreen('home-screen');
    
    // Esconder mensagem de dica
    const hintMessage = document.getElementById('hint-message');
    hintMessage.classList.remove('show');
    hintMessage.classList.add('hidden');
}

// Adicionar suporte a touch para dispositivos móveis
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevenir zoom duplo toque em iOS
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

let lastTouchEnd = 0;

