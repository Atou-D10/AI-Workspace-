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
    });
}