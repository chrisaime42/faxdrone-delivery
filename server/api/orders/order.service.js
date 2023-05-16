const dbConfig = require("../../config/db.config")

module.exports = {

    //Create a new order
    createOrders: (data, callback)=> {
        dbConfig.query(`INSERT INTO orders (customer_id, drone_id, order_date, delivery_date, status) values (?,?,?,?,?)`, 
        [
            data.customer_id,
            data.drone_id,
            data.order_date,
            data.delivery_date,
            data.status,
        ], (error, results) => {
            if  (error) {
                throw error
                return;
            }
            return callback(null, results)

        })
    },
    //Get all order
    getAllOrders: ( callback) => {
        dbConfig.query(`SELECT * FROM orders`,[],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
      //Get a single orders by id
      getOrdersById: (id, callback) => {
        dbConfig.query(`SELECT * FROM orders where id=?`,[id],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results[0])
            }
        );
    },
    // mettre à jour une commande existante
    updateOrdersById : (data, id, callback) => {
        dbConfig.query(`UPDATE orders SET customer_id=? , drone_id=?, order_date=?, delivery_date=?, status=? WHERE  id=? `
        ,[
            data.customer_id,
            data.drone_id,
            data.order_date,
            data.delivery_date,
            data.status,
            id
        ], (error, results) => {
            if(error){
                throw error;
                return;
            }
            return callback(null, results)
        })
    },
    // mettre à jour le status de la commande 
    updateStatusOrdersById : (data, id, callback) => {
        dbConfig.query(`UPDATE orders SET status=? where id=?`,
        [data.status,id], (error, results) => {
            if (error) {
                throw error
            }
            callback(null, results)
        } )
    },
    //obtenir une estimation de la distance de livraison en km/h 
    GetDistanceLivraisonToOrder: (id,callback) => {
        dbConfig.query(`SELECT 2 * 6371 * ASIN(SQRT(POWER(SIN((current_latitude - latitude) * pi()/180 / 2), 2) + 
        COS(latitude * pi()/180) * COS(current_latitude * pi()/180) * POWER(SIN((current_longitude - longitude) * pi()/180 / 2), 2))) AS distance_km
        FROM  users , drones, orders WHERE orders.customer_id = users.id and orders.drone_id = drones.id and orders.id= ?`,[id], (error, results) => {
            if(error) {
                throw error
            }
            callback(null, results)
        })
    },

    //Obtenir une estimation de la distance de livraison d'une commande d'un client

    //Changement de status de la commande du client chaque 10s
    GetRefreshStatusOrders : (id, callback) => {
        dbConfig.query(`SELECT order_id, status FROM orders WHERE customer_id = ? 
        AND DATE_SUB(NOW(), INTERVAL 2 SECOND) < updated_at`, 
        [id], (error, results) => {
            if(error) {
                throw error
            } 
            callback(null, results)
        })
    }
    //obtenir une estimation du temps  de livraison d'une commande d'un client
    
    
}