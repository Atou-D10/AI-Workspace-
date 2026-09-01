// Récupération des éléments principaux
const navItems = document.querySelectorAll('.nav-item');
const mainContent = document.getElementById('main-content');

// Gestion du clic sur les liens de la sidebar
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Retirer la classe active de tous les liens
        navItems.forEach(nav => nav.classList.remove('active'));
        // Ajouter la classe active au lien cliqué
        item.classList.add('active');

        const page = item.getAttribute('data-page');
        renderPage(page);
    });
});

// Fonction qui affiche le bon contenu selon la page choisie
function renderPage(page) {
    switch (page) {
        case 'summary':
            renderSummaryPage();
            break;
        case 'translation':
            renderTranslationPage();
            break;
        case 'chat':
            renderChatPage();
            break;
        case 'prediction':
            renderPredictionPage();
            break;
        case 'history':
            renderHistoryPage();
            break;
        default:
            mainContent.innerHTML = `
                <h1>Tableau de bord</h1>
                <p>Bienvenue sur votre espace de travail intelligent.</p>
            `;
    }
}

// ===== PARTIE 3 : Résumé de texte =====
function renderSummaryPage() {
    mainContent.innerHTML = `
        <h1>Résumé de texte</h1>
        <p>Collez votre texte ci-dessous pour en générer un résumé.</p>

        <textarea id="summary-input" rows="8" placeholder="Entrez votre texte ici..."></textarea>
        <br>
        <button id="summary-btn">Résumer</button>

        <div id="summary-output"></div>
    `;

    const summaryBtn = document.getElementById('summary-btn');
    const summaryInput = document.getElementById('summary-input');
    const summaryOutput = document.getElementById('summary-output');

    summaryBtn.addEventListener('click', () => {
        const text = summaryInput.value.trim();

        if (text === '') {
            summaryOutput.textContent = "Veuillez entrer un texte à résumer.";
            return;
        }

        // Résumé simulé (on prend juste les premiers mots pour l'exemple)
        const simulatedSummary = text.split(' ').slice(0, 15).join(' ') + '...';
        summaryOutput.textContent = "Résumé : " + simulatedSummary;
        saveToHistory('Résumé de texte', text, simulatedSummary);
    });
}

// ===== PARTIE 4 : Traduction =====
function renderTranslationPage() {
    mainContent.innerHTML = `
        <h1>Traduction</h1>
        <p>Entrez un texte et choisissez la langue de traduction.</p>

        <textarea id="translation-input" rows="6" placeholder="Entrez votre texte ici..."></textarea>
        <br>

        <select id="translation-lang">
            <option value="en">Anglais</option>
            <option value="es">Espagnol</option>
            <option value="de">Allemand</option>
            <option value="ar">Arabe</option>
        </select>
        <br>

        <button id="translation-btn">Traduire</button>

        <div id="translation-output"></div>
    `;

    const translationBtn = document.getElementById('translation-btn');
    const translationInput = document.getElementById('translation-input');
    const translationLang = document.getElementById('translation-lang');
    const translationOutput = document.getElementById('translation-output');

    translationBtn.addEventListener('click', () => {
        const text = translationInput.value.trim();
        const lang = translationLang.options[translationLang.selectedIndex].text;

        if (text === '') {
            translationOutput.textContent = "Veuillez entrer un texte à traduire.";
            return;
        }

        // Traduction simulée
        translationOutput.textContent = `Traduction (${lang}) : ${text} [traduit]`;
        saveToHistory('Traduction', text, `(${lang}) ${text} [traduit]`);
    });
}

// ===== PARTIE 5 : Chat IA =====
function renderChatPage() {
    mainContent.innerHTML = `
        <h1>Chat IA</h1>
        <p>Posez une question à l'assistant IA.</p>

        <textarea id="chat-input" rows="4" placeholder="Écrivez votre message ici..."></textarea>
        <br>
        <button id="chat-btn">Envoyer</button>

        <div id="chat-output"></div>
    `;

    const chatBtn = document.getElementById('chat-btn');
    const chatInput = document.getElementById('chat-input');
    const chatOutput = document.getElementById('chat-output');

    chatBtn.addEventListener('click', () => {
        const message = chatInput.value.trim();

        if (message === '') {
            chatOutput.textContent = "Veuillez entrer un message.";
            return;
        }

        // Réponse simulée
        chatOutput.textContent = "Réponse IA : Voici une réponse simulée à votre message : \"" + message + "\"";
        saveToHistory('Chat', message, "Voici une réponse simulée à votre message : \"" + message + "\"");
    });
}

// ===== PARTIE 6 : Prédiction =====
function renderPredictionPage() {
    mainContent.innerHTML = `
        <h1>Prédiction</h1>
        <p>Entrez vos informations pour obtenir une prédiction.</p>

        <input type="number" id="prediction-age" placeholder="Âge">
        <br>
        <input type="number" id="prediction-income" placeholder="Revenu">
        <br>
        <input type="text" id="prediction-city" placeholder="Ville">
        <br>
        <button id="prediction-btn">Prédire</button>

        <div id="prediction-output"></div>
    `;

    const predictionBtn = document.getElementById('prediction-btn');
    const ageInput = document.getElementById('prediction-age');
    const incomeInput = document.getElementById('prediction-income');
    const cityInput = document.getElementById('prediction-city');
    const predictionOutput = document.getElementById('prediction-output');

    predictionBtn.addEventListener('click', () => {
        const age = ageInput.value.trim();
        const income = incomeInput.value.trim();
        const city = cityInput.value.trim();

        if (age === '' || income === '' || city === '') {
            predictionOutput.textContent = "Veuillez remplir tous les champs.";
            return;
        }

        // Prédiction fictive
        predictionOutput.textContent = `Prédiction : Profil "${city}", ${age} ans, revenu ${income} → Catégorie estimée : Client Standard`;
        saveToHistory('Prédiction', `${city}, ${age} ans, revenu ${income}`, "Catégorie estimée : Client Standard");
    });
}

// ===== GESTION DE L'HISTORIQUE (localStorage) =====
function saveToHistory(service, input, output) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push({
        id: Date.now(),
        service: service,
        input: input,
        output: output,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('history', JSON.stringify(history));
}

function getHistory() {
    return JSON.parse(localStorage.getItem('history')) || [];
}

function deleteHistoryItem(id) {
    let history = getHistory();
    history = history.filter(item => item.id !== id);
    localStorage.setItem('history', JSON.stringify(history));
}

function clearHistory() {
    localStorage.removeItem('history');
}

// ===== PARTIE 7 : Historique =====
function renderHistoryPage() {
    mainContent.innerHTML = `
        <h1>Historique</h1>
        <p>Consultez, recherchez ou supprimez vos requêtes précédentes.</p>

        <input type="text" id="history-search" placeholder="Rechercher dans l'historique...">
        <br>
        <button id="history-clear-btn">Vider l'historique</button>

        <div id="history-list"></div>
    `;

    const searchInput = document.getElementById('history-search');
    const clearBtn = document.getElementById('history-clear-btn');

    displayHistory(getHistory());

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = getHistory().filter(item =>
            item.service.toLowerCase().includes(query) ||
            item.input.toLowerCase().includes(query) ||
            item.output.toLowerCase().includes(query)
        );
        displayHistory(filtered);
    });

    clearBtn.addEventListener('click', () => {
        const confirmClear = confirm("Êtes-vous sûr de vouloir vider tout l'historique ?");
        if (confirmClear) {
            clearHistory();
            displayHistory([]);
        }
    });
}

function displayHistory(items) {
    const historyList = document.getElementById('history-list');

    if (items.length === 0) {
        historyList.innerHTML = '<p>Aucun élément dans l\'historique.</p>';
        return;
    }

    historyList.innerHTML = items
        .slice()
        .reverse()
        .map(item => `
            <div class="history-item" data-id="${item.id}">
                <strong>${item.service}</strong> — <span class="history-date">${item.date}</span>
                <p><em>Entrée :</em> ${item.input}</p>
                <p><em>Résultat :</em> ${item.output}</p>
                <button class="history-delete-btn" data-id="${item.id}">Supprimer</button>
            </div>
        `).join('');

    document.querySelectorAll('.history-delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.getAttribute('data-id'));
            deleteHistoryItem(id);
            displayHistory(getHistory());
        });
    });
}