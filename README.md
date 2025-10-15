# TP E-commerce avec Tests Automatises

## Description

Application d'e-commerce developpee en Node.js avec implementation complete de tests unitaires et fonctionnels. Ce projet permet de gerer un panier d'achats et un systeme de paiement avec porte-monnaie virtuel.

## Fonctionnalites

- Gestion de panier d'achats (ajout/suppression de produits)
- Calcul automatique du prix total
- Systeme de porte-monnaie virtuel
- Verification des transactions
- Processus de paiement complet
- Tests unitaires et fonctionnels comprehensifs

## Structure du projet

```
tp-ecom/
├── src/
│   └── ecommerce.js          # Code principal de l'application
├── tests/
│   └── testEcommerce.js      # Tests unitaires et fonctionnels
├── index.js                  # Point d'entree de l'application
├── package.json              # Configuration du projet
└── README.md                 # Documentation
```

## Installation

1. Cloner ou telecharger le projet
2. Naviguer vers le repertoire du projet
3. Executer les commandes suivantes :

```bash
npm install
```

## Utilisation

### Lancer l'application de demonstration

```bash
npm start
```

### Executer les tests

```bash
npm test
```

## Architecture technique

### Classes et fonctions principales

**Classe Basket**
- Constructeur : initialise un panier vide ou avec des elements existants
- Proprietes : items (tableau des produits), totalPrice (prix total)

**Fonctions metier**
- `addToBasket(basket, item)` : ajoute un produit au panier
- `removeFromBasket(basket, item)` : supprime un produit du panier
- `transactionAllowed(userAccount, priceToPay)` : verifie si la transaction est possible
- `payBasket(userAccount, basket)` : effectue le paiement du panier

### Tests implementes

**Tests unitaires**
- `testAdd()` : teste l'ajout d'un produit au panier
- `testRemove()` : teste la suppression d'un produit du panier
- `testAddRemove()` : teste l'ajout puis la suppression d'un produit
- `testTransactionAllowed()` : teste la verification des transactions

**Test fonctionnel**
- `testPayBasket()` : teste le processus complet de paiement

**Fonction principale**
- `testAppEcommerce()` : execute tous les tests et affiche le resultat global

## Types de tests

### Tests unitaires
Les tests unitaires verifient le bon fonctionnement de chaque fonction individuellement :
- Isolation des fonctionnalites
- Verification des entrees et sorties
- Couverture de tous les cas de figure

### Tests fonctionnels
Les tests fonctionnels verifient le comportement global de l'application :
- Enchainement d'operations
- Verification des effets de bord
- Simulation de scenarios d'usage reel

## Exemples d'utilisation

### Creation d'un panier et ajout de produits

```javascript
const { Basket, addToBasket } = require('./src/ecommerce');

const panier = new Basket();
const produit = { name: 'Carte mere', price: 100 };

addToBasket(panier, produit);
console.log(panier); // { items: [...], totalPrice: 100 }
```

### Processus de paiement

```javascript
const utilisateur = { name: 'Perceval', balance: 500 };
const panier = new Basket();

// Ajout de produits au panier...
payBasket(utilisateur, panier);
```

## Resultats des tests

L'execution des tests affiche :
- Le resultat de chaque test individuel (REUSSI/ECHOUE)
- Le resultat global (OK/ERREUR)

## Compatibilite

- Node.js version 14.0.0 ou superieure
- Compatible avec tous les systemes d'exploitation

## Licence

MIT

## Auteur

Developpeur Senior - 18 ans d'experience en developpement fullstack