const { createOrders, getAllOrders, getOrdersById, updateOrdersById, updateStatusOrdersById, GetDistanceLivraisonToOrder, GetRefreshStatusOrders } = require("./order.service")


module.exports = {
    
    //Create new order to clients
    createOrders : async(req, res) => {
        const body = req.body
        
        createOrders(body, (error, results) => {
            if(error){
                throw error;
                return;
            }
            res.json({
                success: 1,
                message: "Commande ajoutée"
            })
        })
    },
    // Get all order
    getAllOrders: (req, res) => {
        getAllOrders((error, results) => {
            if(error) {
                throw error;
                return;
            }
            res.json({
                success: 1,
                length: results.length,
                data: results
            })
        })
    },
    // Get order by Id
    getOrdersById : (req, res) => {
        const id = parseInt(req.params.id)
        getOrdersById(id, (error, results) => {
            if(error){
                throw error;
                return;
            }
            res.json({
                success : 1,
                data : results
            })
        })
    },
    // update Order already exists
    updateOrdersById : (req, res) => {
        const body = req.body;
        const id = parseInt(req.params.id)
        updateOrdersById(body, id, (error, results) => {
            if(error) {
                throw error;
                return;
            }
            res.json({
                success: 1,
                message: "Commande modifié..."
            })
        })
    },
    // Edité le status d'une commande 
    updateStatusOrdersById : (req, res) => {
        const body = req.body;
        const id = parseInt(req.params.id)
        updateStatusOrdersById(body, id, (error, results) => {
            if(error) {
                throw error;
                return;
            }
            if(!results){
                res.json({
                    success: 0,
                    message: "Commande introuvable..."
                })
            }
            res.json({
                success: 1,
                message: "Status de la commande modifié!"
            })
        })
    },
    // Estimation de la distance de la livraison km/h
    GetDistanceLivraisonToOrder : (req, res) => {
        const id = parseInt(req.params.id)

        GetDistanceLivraisonToOrder(id, (error,results) => {
            if(error){
                throw error;
                return;
            }
            if(!results) {
                res.json({
                    success : 0,
                    message: "Commande introuvable !"              
                  })
            }
            res.json({
                success: 1,
                data: results
            })
        })
    },
    //Changement de status de la commande du client chasue 10s
    GetRefreshStatusOrders : (req, res) => {
        const id = parseInt(req.params.id)
        GetRefreshStatusOrders(id, (error, results) => {
            if(error) {
                throw error;
                return;
            }
            if(!results){
                res.json({
                    success: 0,
                    message : "Identifiant introuvable!"
                })
            }
            res.json({
                success: 1,
                message: "Status refresh",
                data: results
            })
        })
    }

}