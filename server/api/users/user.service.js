const dbConfig = require("../../config/db.config")

module.exports = {
    //Creer un utilisateur
    create: (data, callback) => {

        dbConfig.query(`INSERT INTO users (username,email, password, latitude,
            longitude, role) values (?,?,?,?,?,?)`,[
                data.username,
                data.email,
                data.password,
                data.latitude,
                data.longitude,
                data.role
            ],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
    //S'inscrire en tant qu'utilisateur ou client
    Register: (data, callback) => {
        dbConfig.query(`INSERT INTO users (username,email, password,
            role) values (?,?,?,?)`,[
                data.username,
                data.email,
                data.password,
                data.latitude,
                data.longitude,
                data.role
            ],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
    //Obtenir un utilisteur par son email
    getUserByEmail : (data, callback) => {
        dbConfig.query(`SELECT * FROM users WHERE email = ?`, [data.email]
        ,(error, results) => {
            if (error) {
                throw error;
                return;
            }
            return callback(null, results[0])
        })
    },
    //Obtenir tous les utilisateurs
    getUsers: callback => {

        dbConfig.query(`SELECT * from users`,[],
        (error, results ) => {
            if (error) {
                throw error;
                return;
            }
            return callback(null, results)
        })
    },
    //Obtenir les utlisateurs par role
    getUsersByRole: (data, callback) => {
        dbConfig.query(`SELECT * from users WHERE role = ?`, [data.role],
        (error, results) => {
            if (error) {
                throw error;
                return;
            }
            return callback(nul, results)
        })
    },
    //Obtenir les utilisateurs clients
    getUsersCustomers: (data, callback) => {
        dbConfig.query(`SELECT * FROM users WHERE role = 'customer'`,[],
        (error, results) => {
            if (error) {
                throw error;
                return;
            }
            return callback(null, results )
        })
    },
    //Obtenir les donnés d'un utilisateur qui soit un client
    getUsersCustomersById: (id, callback) => {
        dbConfig.query(`SELECT * FROM users WHERE id = ? AND role = 'customer'
        `, [id],
        (error, results) => {
            if (error){
                throw error;
                return;
            }
            return callback(null, results?.[0])
        })
    },
    //Obtenir les données d'un utilisateurs qui ne soit pas un client
    getUsersById: (id, callback) => {
        dbConfig.query(`SELECT * FROM users WHERE id = ? AND role != 'customer'

        `, [id],
        (error, results) => {
            if (error) {
                throw error;
                return;
            }
            return callback(null, results?.[0])
        })
    },
    // STATS TOTAL CUSTOMERS INSCRITS
    getTotalCustomers: (id, callback) => {
        dbConfig.query(`SELECT COUNT(*) FROM users WHERE role = 'customer';'
        `, [],
        (error, results) => {
            if (error) {
                throw error;
                return;
            }
            return callback(null, results)
        })
    },
    //Modifier les coordonnés d'un utlisateurs
    updateCoordsUsers: (data,id, callback) => {
        dbConfig.query(`UPDATE users 
        SET latitude = ?, longitude = ? 
        WHERE id = ?`, [data.latitude, data.longitude, id],
        (error, results) => {
            if(error) {
                throw error;
                return;
            }
            return callback(null, results)
        })
    }

}