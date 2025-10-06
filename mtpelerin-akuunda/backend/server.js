const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ordersDatabase = new Map();

app.post('/api/mtpelerin/order/created', (req, res) => {
    try {
        const orderData = req.body;
        
        console.log('🎯 Nouvel ordre Akuunda:', {
            orderId: orderData.orderId,
            type: orderData.orderType,
            amount: orderData.amountIn,
            currency: orderData.currencyIn,
            depositAddress: orderData.depositAddress
        });

        if (!orderData.depositAddress) {
            return res.status(400).json({ error: 'Adresse de dépôt manquante' });
        }

        ordersDatabase.set(orderData.orderId, {
            ...orderData,
            status: 'created',
            createdAt: new Date()
        });

        res.json({ success: true, orderId: orderData.orderId });

    } catch (error) {
        console.error('❌ Erreur:', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

app.post('/api/mtpelerin/payment/submitted', (req, res) => {
    const paymentData = req.body;
    console.log('💳 Paiement soumis:', paymentData.orderId);
    
    const order = ordersDatabase.get(paymentData.orderId);
    if (order) order.status = 'payment_submitted';
    
    res.json({ success: true });
});

app.post('/api/mtpelerin/order/completed', (req, res) => {
    const completionData = req.body;
    console.log('✅ Ordre complété:', completionData.orderId);
    
    const order = ordersDatabase.get(completionData.orderId);
    if (order) order.status = 'completed';
    
    res.json({ success: true });
});

app.post('/api/mtpelerin/order/failed', (req, res) => {
    const failureData = req.body;
    console.log('❌ Ordre échoué:', failureData.orderId);
    
    const order = ordersDatabase.get(failureData.orderId);
    if (order) order.status = 'failed';
    
    res.json({ success: true });
});

app.get('/api/mtpelerin/orders', (req, res) => {
    const orders = Array.from(ordersDatabase.entries()).map(([id, order]) => ({
        id,
        ...order
    }));
    
    res.json({
        total: orders.length,
        orders: orders
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        ordersCount: ordersDatabase.size
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend Akuunda Pay démarré sur le port ${PORT}`);
});
