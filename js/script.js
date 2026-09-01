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

                <div class="grid stats-grid">
                    <div class="stat-card">
                        <p class="stat-label">Nombre de jeux de données</p>
                        <p class="stat-value">24</p>
                        <p class="stat-change">+3 ce mois-ci</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Nombre de requêtes</p>
                        <p class="stat-value">1,256</p>
                        <p class="stat-change">+18% ce mois-ci</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Nombre de modèles disponibles</p>
                        <p class="stat-value">12</p>
                        <p class="stat-change">+2 ce mois-ci</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Utilisateurs actifs</p>
                        <p class="stat-value">8</p>
                        <p class="stat-change">+2 ce mois-ci</p>
                    </div>
                    <div class="stat-card">
                        <p class="stat-label">Tâches exécutées</p>
                        <p class="stat-value">342</p>
                        <p class="stat-change">+22% ce mois-ci</p>
                    </div>
                </div>

                <div class="grid charts-grid">
                    <div class="chart-card">
                        <div class="chart-header">
                            <p class="chart-title">Requêtes par jour</p>
                            <select id="chart-period" class="chart-filter">
                                <option value="7">7 derniers jours</option>
                                <option value="30">30 derniers jours</option>
                                <option value="90">90 derniers jours</option>
                            </select>
                        </div>
                        <img src="images/chart-line.png" alt="Graphique requêtes par jour" class="chart-img">
                    </div>
                    <div class="chart-card">
                        <p class="chart-title">Répartition des requêtes par service</p>
                        <img src="images/chart-donut.png" alt="Graphique répartition des requêtes" class="chart-img">
                    </div>
                </div>

                <div class="grid tables-grid">
                    <div class="table-card">
                        <p class="table-title">Activité récente</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Activité</th>
                                    <th>Service</th>
                                    <th>Utilisateur</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Résumé du document_projet.pdf</td>
                                    <td>Résumé de texte</td>
                                    <td>Admin User</td>
                                    <td>21/05/2024 14:32</td>
                                </tr>
                                <tr>
                                    <td>Classification de sentiments</td>
                                    <td>Classification</td>
                                    <td>Admin User</td>
                                    <td>21/05/2024 14:21</td>
                                </tr>
                                <tr>
                                    <td>Traduction FR → EN</td>
                                    <td>Traduction</td>
                                    <td>Admin User</td>
                                    <td>21/05/2024 14:15</td>
                                </tr>
                                <tr>
                                    <td>Discussion sur l'IA générative</td>
                                    <td>Chat</td>
                                    <td>Admin User</td>
                                    <td>21/05/2024 14:05</td>
                                </tr>
                                <tr>
                                    <td>Génération d'idées de projet</td>
                                    <td>Idées</td>
                                    <td>Admin User</td>
                                    <td>21/05/2024 13:50</td>
                                </tr>
                            </tbody>
                        </table>
                        <a href="#" class="table-link">Voir tout l'historique</a>
                    </div>

                    <div class="table-card">
                        <p class="table-title">Modèles populaires</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Modèle</th>
                                    <th>Utilisations</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>mistral-7b-instruct</td>
                                    <td>532</td>
                                </tr>
                                <tr>
                                    <td>gpt-4-turbo</td>
                                    <td>389</td>
                                </tr>
                                <tr>
                                    <td>llama-3-8b</td>
                                    <td>256</td>
                                </tr>
                                <tr>
                                    <td>bert-base-uncased</td>
                                    <td>179</td>
                                </tr>
                                <tr>
                                    <td>google-translate-v1</td>
                                    <td>142</td>
                                </tr>
                            </tbody>
                        </table>
                        <a href="#" class="table-link">Voir tous les modèles</a>
                    </div>
                </div>
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

    summaryBtn.addEventListener('click', async() => {
        const text = summaryInput.value.trim();

        if (text === '') {
            summaryOutput.textContent = "Veuillez entrer un texte à résumer.";
            return;
        }

        summaryOutput.textContent = "Résumé en cours...";
        summaryBtn.disabled = true;

                try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GROQ_API_KEY
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [
                        { role: "system", content: "Tu es un assistant qui résume des textes en français, de manière claire et concise, en 2 à 3 phrases maximum." },
                        { role: "user", content: text }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                summaryOutput.textContent = "Erreur API : " + data.error.message;
                return;
            }

            const summary = data.choices[0].message.content;
            summaryOutput.textContent = "Résumé : " + summary;

            saveToHistory('Résumé de texte', text, summary);

        } catch (error) {
            summaryOutput.textContent = "Erreur de connexion à l'API : " + error.message;
        } finally {
            summaryBtn.disabled = false;
        }
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

    translationBtn.addEventListener('click', async() => {
        const text = translationInput.value.trim();
        const lang = translationLang.options[translationLang.selectedIndex].text;

        if (text === '') {
            translationOutput.textContent = "Veuillez entrer un texte à traduire.";
            return;
        }

        translationOutput.textContent = "Traduction en cours...";
        translationBtn.disabled = true;

                try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GROQ_API_KEY
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [
                        { role: "system", content: `Tu es un traducteur. Traduis le texte donné par l'utilisateur en ${lang}. Réponds uniquement avec la traduction, sans explication ni commentaire.` },
                        { role: "user", content: text }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                translationOutput.textContent = "Erreur API : " + data.error.message;
                return;
            }

            const translation = data.choices[0].message.content;
            translationOutput.textContent = `Traduction (${lang}) : ${translation}`;

            saveToHistory('Traduction', text, translation);

        } catch (error) {
            translationOutput.textContent = "Erreur de connexion à l'API : " + error.message;
        } finally {
            translationBtn.disabled = false;
        }
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

    chatBtn.addEventListener('click', async() => {
        const message = chatInput.value.trim();

        if (message === '') {
            chatOutput.textContent = "Veuillez entrer un message.";
            return;
        }

        chatOutput.textContent = "Réflexion en cours...";
        chatBtn.disabled = true;

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GROQ_API_KEY
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [
                        { role: "user", content: message }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                chatOutput.textContent = "Erreur API : " + data.error.message;
                return;
            }

            const reply = data.choices[0].message.content;
            chatOutput.textContent = "Réponse IA : " + reply;

            saveToHistory('Chat', message, reply);

        } catch (error) {
            chatOutput.textContent = "Erreur de connexion à l'API : " + error.message;
        } finally {
            chatBtn.disabled = false;
        }

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

    predictionBtn.addEventListener('click', async() => {
        const age = ageInput.value.trim();
        const income = incomeInput.value.trim();
        const city = cityInput.value.trim();

        if (age === '' || income === '' || city === '') {
            predictionOutput.textContent = "Veuillez remplir tous les champs.";
            return;
        }
        predictionOutput.textContent = "Analyse en cours...";
        predictionBtn.disabled = true;

                const profileText = `Âge : ${age}, Revenu : ${income}, Ville : ${city}`;

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GROQ_API_KEY
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    messages: [
                        { role: "system", content: "Tu simules un modèle de prédiction marketing fictif. À partir d'un profil (âge, revenu, ville), donne une catégorie de client plausible (ex: Client Standard, Client Premium, Client Économique, Jeune Actif, etc.) et une justification en une phrase. Réponds au format : 'Catégorie : ... — Justification : ...'. Précise bien qu'il s'agit d'une estimation fictive à but pédagogique." },
                        { role: "user", content: profileText }
                    ]
                })
            });

            const data = await response.json();

            if (data.error) {
                predictionOutput.textContent = "Erreur API : " + data.error.message;
                return;
            }

            const prediction = data.choices[0].message.content;
            predictionOutput.textContent = "Prédiction : " + prediction;

            saveToHistory('Prédiction', profileText, prediction);

        } catch (error) {
            predictionOutput.textContent = "Erreur de connexion à l'API : " + error.message;
        } finally {
            predictionBtn.disabled = false;
        }
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