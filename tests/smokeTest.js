const { transactionAllowed } = require('../src/ecommerce');

function smokeTest() {
    console.log('Execution des tests de smoke...');
    
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    console.log(`Tests sur l'environnement: ${baseUrl}`);
    
    const user = { name: 'TestUser', balance: 100 };
    const result = transactionAllowed(user, 50);
    
    if (result === true) {
        console.log('✅ Test de smoke réussi - Application fonctionnelle');
        process.exit(0);
    } else {
        console.log('❌ Test de smoke échoué');
        process.exit(1);
    }
}

if (require.main === module) {
    smokeTest();
}