const { Basket, addToBasket, payBasket } = require('../src/ecommerce');

function productionTest() {
    console.log('Execution des tests de validation en production...');
    
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    console.log(`Validation sur: ${baseUrl}`);
    
    try {
        const basket = new Basket();
        const item = { name: 'Test Product', price: 10 };
        const user = { name: 'ProductionUser', balance: 50 };
        
        addToBasket(basket, item);
        
        if (basket.totalPrice === 10) {
            payBasket(user, basket);
            
            if (user.balance === 40) {
                console.log('✅ Tests de production réussis - Système opérationnel');
                process.exit(0);
            }
        }
        
        throw new Error('Tests de production échoués');
        
    } catch (error) {
        console.log('❌ Tests de production échoués:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    productionTest();
}