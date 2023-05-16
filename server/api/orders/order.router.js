const roles = require('../../utils/roles');
const tokenVerify = require('../../utils/tokenVerify');
const verifyRoles = require('../../utils/verifyRoles');
const { createOrders, getAllOrders, getOrdersById, updateStatusOrdersById, updateOrdersById, GetDistanceLivraisonToOrder, GetRefreshStatusOrders } = require('./order.controllers');



const router = require('express').Router();


// Creer une nouvelle commande pour un clients
router.post('/new-order', tokenVerify, verifyRoles(roles.user), createOrders )

// Get all order
router.get('/all-order', tokenVerify, verifyRoles(roles.user), getAllOrders)

//Get order By Id
router.get('/:id/order', tokenVerify, verifyRoles(roles.user), getOrdersById)

// Edité le status d'une commande 
router.patch('/:id/status', tokenVerify, verifyRoles(roles.user), updateStatusOrdersById)

//Estimation de la distance de la livraison km/h
router.get('/distance/:id/order', tokenVerify, verifyRoles(roles.user), GetDistanceLivraisonToOrder)

//Changement de status de la commande du client chasue 10s
router.get('/refresh-status/:id/customers',  tokenVerify, verifyRoles(roles.user), GetRefreshStatusOrders)




module.exports = router;
