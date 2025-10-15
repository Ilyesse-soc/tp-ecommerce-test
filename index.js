const { Basket, addToBasket, removeFromBasket, payBasket } = require('./src/ecommerce');
const { testAppEcommerce } = require('./tests/testEcommerce');

console.log('='.repeat(60));
console.log('    APPLICATION E-COMMERCE - DEMONSTRATION');
console.log('='.repeat(60));

console.log('\n1. CREATION DU PANIER ET AJOUT DE PRODUITS');
console.log('-'.repeat(45));

const panierActuel = new Basket();
const produit1 = { name: 'Carte mère', price: 100 };
const produit2 = { name: 'Carte graphique', price: 300 };
const utilisateur = { name: 'Ilyesse', balance: 500 };

console.log('Panier initial:', panierActuel);
console.log('Utilisateur initial:', utilisateur);

addToBasket(panierActuel, produit1);
console.log('\nAprès ajout de la carte mère:');
console.log('Panier:', panierActuel);

addToBasket(panierActuel, produit2);
console.log('\nAprès ajout de la carte graphique:');
console.log('Panier:', panierActuel);

console.log('\n2. SUPPRESSION D\'UN PRODUIT DU PANIER');
console.log('-'.repeat(45));

removeFromBasket(panierActuel, produit1);
console.log('Après suppression de la carte mère:');
console.log('Panier:', panierActuel);

console.log('\n3. PROCESSUS DE PAIEMENT');
console.log('-'.repeat(45));

console.log('Tentative de paiement du panier...');
payBasket(utilisateur, panierActuel);
console.log('Utilisateur après paiement:', utilisateur);

console.log('\nTentative de second paiement (solde insuffisant)...');
payBasket(utilisateur, panierActuel);
console.log('Utilisateur après second paiement:', utilisateur);

console.log('\n4. EXECUTION DES TESTS AUTOMATISES');
console.log('-'.repeat(45));

testAppEcommerce();

console.log('\n' + '='.repeat(60));
console.log('    FIN DE LA DEMONSTRATION');
console.log('='.repeat(60));