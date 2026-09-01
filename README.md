# AI Workspace

Application web (HTML, CSS, JavaScript, sans framework) simulant une plateforme d'utilisation de services d'Intelligence Artificielle : résumé de texte, traduction, chat IA, prédiction, et historique des requêtes.

## Fonctionnalités

- **Tableau de bord** : statistiques et graphiques (démo visuelle)
- **Chat IA** : connecté à l'API Groq (modèle `openai/gpt-oss-120b`)
- **Résumé de texte** : connecté à l'API Groq
- **Traduction** : connectée à l'API Groq
- **Prédiction** : simulation fictive générée par l'API Groq
- **Historique** : sauvegarde locale (`localStorage`) des requêtes, avec recherche, suppression et vidange

## Configuration de la clé API (obligatoire pour les fonctionnalités IA)

Ce projet utilise l'API [Groq](https://console.groq.com) (gratuite, sans carte bancaire) pour les modules Chat, Résumé, Traduction et Prédiction.

### Étapes

1. Crée un compte sur https://console.groq.com
2. Va dans **API Keys** et clique sur **Create API Key**
3. Copie la clé générée
4. À la racine du dossier `js/`, crée un fichier nommé `config.js`
5. Colle ce contenu dedans, en remplaçant par ta propre clé :

```javascript
const GROQ_API_KEY = "ta_cle_ici";
```

6. Ce fichier est volontairement exclu du dépôt Git (voir `.gitignore`) pour ne jamais exposer de clé API publiquement. Sans ce fichier, l'application se lance mais les modules IA afficheront une erreur de connexion.

