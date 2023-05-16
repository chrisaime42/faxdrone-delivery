
const { genSaltSync, hashSync, compareSync, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { getUserByEmail, getUsers, getUsersByRole, getUsersCustomers, getUsersCustomersById, getUsersById, create, updateCoordsUsers, getTotalCustomers } = require("./user.service");


module.exports = {

    //Creer un utilisateur
    createUser: async (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        getUserByEmail(body, (error, exists) => {
            console.log(exists)
            if(exists){
                return res.json({
                    success: 0,
                    message: "l'email est déjà utilisé!"
                })
            }else {
                body.password = hashSync(body.password,salt);
                create(body, (error, results) => {

                    if(error)  {
                        console.log(error);
                        return res.json({
                            success: 0,
                            message: "Erreur de connexion..."
                        }); 
                    }
                    if(results) return res.json({
                        success: 1,
                        message : "Utilisteur enregistré !"
                    })
                })
            }
        })
    },
    //Se logger en tant que User simple
    login: async (req, res) => {
        const body = req.body;
        getUserByEmail(body,(error, results) => {
           // console.log(results)
            if(error){
                console.log(error);
            } 
           if(results) {
                const role = results.role
                
                compare(body.password, results.password, (error, response) => {
                    if(response) {
                        results.password = undefined;
                        console.log('reponse', results);
                        const token = sign({
                            result: [results.role],
                            "userInfo": {
                                "roles": [role]
                            }
                     }, process.env.JWT_TOKEN_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });
                        return res.json({
                            success: 1,
                            message: "Vous etes connecté...",
                            token: token
                        });
                    } else {
                        return res.json({
                            success: 0,
                            message: "Identifiant invalide !"
                        })
                    }
                })
                
           } 
        })
    },
    // Obtenir un utilisateur par son mail
    getUserByEmail : (req, res) => { 
        const body = req.body;
        getUserByEmail(body, (error, results) => {
            if(error) {
                 throw error;
                 return;
            }
            if(!results) {
                return  res.json({
                    success: 0,
                    message: `Verifier l'addresse email svp !`
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    //Obtenir tous les utilisateurs
    getUsers: (req, res) => {
        console.log("current", req.user)
        getUsers((error, results) => {
            if (error) {
                console.log(error);
                return;
            }
            return res.json({
                success: 1,
                length: results?.length,
                data: results
            });
        });
    },
     //Obtenir les utilisateurs par role
     getUsersByRole: async(req, res) => {
        const body = req.body;
        getUsersByRole(body, (error, results) => {
            if(error){
                throw error;
                return;
            }
            if(!results) return res.json({
                success: 0,
                message: `le role n'a pas été trouvé...`
            })
            return res.json({
                success: 1,
                length: results.length,
                data: results
            })
        })
     },
     //Obtenir les utilisateurs clients
     getUsersCustomers : async(req, res) => {
        getUsersCustomers((error, results) => {
            if (error) {
                throw error;
                return;
            }
            return res.json({
                success: 1,
                length: results?.length,
                data: results
            });
        });
     },
      //Obtenir les donnés d'un utilisateur qui soit un client
      getUsersCustomersById: async(req, res) => {

        const id = parseInt(req.params.id);
        getUsersCustomersById(id, (error, results) => {
            if (error) {
                throw error
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: `Identifiant incorrect`
                });
            }
            console.log(results)
            return res.json({
                success: 1,
                data: results
            });
        })
      },
      //Obtenir les données d'un utilisateurs qui ne soit pas un client
      getUsersById : (req, res) => {
        const id = parseInt(req.params.id)
        getUsersById(id, (error, results) => {
            if (error) {
                throw error;
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: `Identifiant incorrecte`
                });
            }
         //   results.password = undefined;
            return res.json({
                success: 1,
                data: results
            });
        })

      },
      // STATS TOTAL CUSTOMERS INSCRITS
      getTotalCustomers : (req, res) => {
        getTotalCustomers((error, results) => {
            if (error) {
                throw error;
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        })

      },
       //Modifier les coordonnés d'un utilisateurs
       updateCoordsUsers : (req, res) => {
        const id = parseInt(req.params.id)
        const body = req.body;
        updateCoordsUsers(body,id, (error, results) => {
            if(error){
                throw error;
                return;
            }

            return res.json({
                success: 1,
                message:" Les coordonnés ont été mise  à jour",
            });
        })
       }
}