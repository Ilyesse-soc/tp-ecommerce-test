# Configuration CI/CD avec GitHub Actions

## Vue d'ensemble

Ce projet utilise GitHub Actions pour automatiser l'integration continue (CI) et le deploiement continu (CD). Le pipeline garantit la qualite du code et automatise les deploiements.

## Architecture CI/CD

### Workflows disponibles

1. **Integration Continue (CI)** - `.github/workflows/ci.yml`
2. **Deploiement Continu (CD)** - `.github/workflows/deploy.yml`

## Configuration requise sur GitHub

### Secrets a configurer

Allez dans **Settings > Secrets and variables > Actions** de votre repository GitHub et ajoutez :

#### Pour le deploiement Heroku
```
HEROKU_API_KEY=votre-cle-api-heroku
HEROKU_EMAIL=votre-email-heroku
```

#### Pour les notifications Slack (optionnel)
```
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

#### Pour SonarCloud (optionnel)
```
SONAR_TOKEN=votre-token-sonar
```

### Environnements a configurer

1. **Staging Environment**
   - Name: `staging`
   - URL: `https://tp-ecommerce-staging.herokuapp.com`
   
2. **Production Environment**
   - Name: `production` 
   - URL: `https://tp-ecommerce-prod.herokuapp.com`
   - Require reviewers: Activez cette option

## Workflow d'Integration Continue

### Declencheurs
- Push sur les branches `main` et `develop`
- Pull requests vers `main`

### Etapes executees
1. **Tests sur matrices de versions Node.js** (16.x, 18.x, 20.x)
2. **Installation des dependances**
3. **Verification syntaxique** (ESLint)
4. **Execution des tests unitaires**
5. **Analyse de couverture de code**
6. **Audit de securite**
7. **Analyse qualite avec SonarCloud**

### Commandes locales equivalentes
```bash
npm ci
npm run lint
npm run test
npm run test:coverage
npm audit
```

## Workflow de Deploiement Continu

### Deploiement en Staging
**Declencheur:** Push sur la branche `main`

**Etapes:**
1. Tests complets
2. Construction de l'application
3. Deploiement sur Heroku Staging
4. Tests de smoke automatiques

### Deploiement en Production
**Declencheur:** Creation d'une release GitHub

**Etapes:**
1. Deploiement prealable reussi en staging
2. Construction optimisee pour la production
3. Deploiement sur Heroku Production
4. Tests de validation en production
5. Notifications de succes

### Rollback automatique
En cas d'echec du deploiement en production :
1. Rollback automatique vers la version precedente
2. Notification d'echec par Slack

## Guide de mise en production

### Etapes pour deployer

1. **Developpement et tests locaux**
   ```bash
   npm run dev
   npm run test
   npm run lint
   ```

2. **Push vers develop pour tests CI**
   ```bash
   git checkout develop
   git add .
   git commit -m "feature: nouvelle fonctionnalite"
   git push origin develop
   ```

3. **Creation d'une Pull Request vers main**
   - Les tests CI se declenchent automatiquement
   - Validation requise avant merge

4. **Merge vers main** (deploie en staging)
   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

5. **Creation d'une release** (deploie en production)
   - Aller sur GitHub > Releases > Create a new release
   - Creer un tag (ex: v1.0.0)
   - Publier la release

## Monitoring et Debugging

### Verifier les logs des workflows
1. Aller dans l'onglet **Actions** de votre repository
2. Selectionner le workflow concerne
3. Examiner les logs de chaque etape

### Tests en local avant push
```bash
# Tests complets
npm run precommit

# Tests individuels  
npm run test
npm run test:smoke
npm run lint
```

### Verification des deployments
```bash
# Test de l'application en staging
npm run test:smoke
BASE_URL=https://tp-ecommerce-staging.herokuapp.com npm run test:smoke

# Test de l'application en production  
BASE_URL=https://tp-ecommerce-prod.herokuapp.com npm run test:production
```

## Bonnes pratiques

### Structure des commits
```
type: description courte

type peut etre:
- feat: nouvelle fonctionnalite
- fix: correction de bug
- test: ajout/modification de tests
- docs: documentation
- refactor: refactorisation
- style: formatting, etc.
```

### Gestion des branches
- `main`: branche principale (production-ready)
- `develop`: branche de developpement
- `feature/*`: branches de fonctionnalites
- `hotfix/*`: corrections urgentes

### Tests obligatoires
- Tests unitaires : 100% de couverture souhaitee
- Tests de smoke : verification basique
- Tests de production : validation complete

## Troubleshooting

### Echecs communs et solutions

#### "npm audit" echec
```bash
npm audit fix
```

#### Tests d'eslint echoues  
```bash
npm run lint:fix
```

#### Deploiement Heroku echec
- Verifier les secrets HEROKU_API_KEY et HEROKU_EMAIL
- Verifier que les applications Heroku existent
- Consulter les logs Heroku

#### Tests de couverture insuffisants
- Ajouter des tests pour les fonctions non couvertes
- Verifier la configuration nyc

## Support

Pour toute question sur la CI/CD :
1. Consulter les logs GitHub Actions
2. Verifier la configuration des secrets
3. Tester localement avec les memes commandes
4. Contacter l'equipe DevOps si necessaire