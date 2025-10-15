const { Basket, addToBasket, removeFromBasket, transactionAllowed, payBasket } = require('../src/ecommerce');

function testAdd() {
    const basket = new Basket();
    const item = { name: 'Carte mère', price: 100 };
    
    addToBasket(basket, item);
    
    return basket.totalPrice === 100 && basket.items.length === 1;
}

function testRemove() {
    const basket = new Basket();
    const item = { name: 'Carte mère', price: 100 };
    
    addToBasket(basket, item);
    removeFromBasket(basket, item);
    
    return basket.totalPrice === 0 && basket.items.length === 0;
}

function testAddRemove() {
    const basket = new Basket();
    const item = { name: 'Carte mère', price: 100 };
    
    addToBasket(basket, item);
    const afterAdd = basket.totalPrice === 100 && basket.items.length === 1;
    
    removeFromBasket(basket, item);
    const afterRemove = basket.totalPrice === 0 && basket.items.length === 0;
    
    return afterAdd && afterRemove;
}

function testTransactionAllowed() {
    const user = { name: 'Perceval', balance: 500 };
    
    const transactionAllowed400 = transactionAllowed(user, 400);
    const transactionAllowed600 = transactionAllowed(user, 600);
    
    return transactionAllowed400 === true && transactionAllowed600 === false;
}

function testPayBasket() {
    const user = { name: 'Perceval', balance: 500 };
    const basket = new Basket();
    const item = { name: 'Carte graphique', price: 300 };
    
    addToBasket(basket, item);
    
    const initialBalance = user.balance;
    payBasket(user, basket);
    const firstPaymentSuccess = user.balance === (initialBalance - 300);
    
    payBasket(user, basket);
    const secondPaymentFailed = user.balance === 200;
    
    return firstPaymentSuccess && secondPaymentFailed;
}

function testAppEcommerce() {
    let success = testAdd();
    success = success && testRemove();
    success = success && testAddRemove();
    success = success && testTransactionAllowed();
    success = success && testPayBasket();
    
    if (success) {
        console.log('OK');
    } else {
        console.log('ERREUR');
    }
    
    return success;
}

module.exports = {
    testAdd,
    testRemove,
    testAddRemove,
    testTransactionAllowed,
    testPayBasket,
    testAppEcommerce
};

if (require.main === module) {
    console.log('Exécution des tests unitaires et fonctionnels...\n');
    
    console.log('Test d\'ajout au panier:', testAdd() ? 'RÉUSSI' : 'ÉCHOUÉ');
    console.log('Test de suppression du panier:', testRemove() ? 'RÉUSSI' : 'ÉCHOUÉ');
    console.log('Test d\'ajout et suppression:', testAddRemove() ? 'RÉUSSI' : 'ÉCHOUÉ');
    console.log('Test de transaction autorisée:', testTransactionAllowed() ? 'RÉUSSI' : 'ÉCHOUÉ');
    console.log('Test de paiement du panier:', testPayBasket() ? 'RÉUSSI' : 'ÉCHOUÉ');
    
    console.log('\nRésultat global des tests:');
    testAppEcommerce();
}