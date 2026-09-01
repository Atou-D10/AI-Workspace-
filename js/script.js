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