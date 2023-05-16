const { create, getAllDrones, getDroneById, getTotalDroneBusy, getTotalDroneMaintenance, getAllDroneBusy, getCurrentLocationById, getDronesDataById, getTotalDroneAvailable, getAllDroneAvailable } = require("./drone.service");



module.exports = {

    // Ajouter un  Drone 
    createDrone: async(req, res) => {
        const body = req.body;
        create(body, (error,results) => {
            if(error)  {
                console.log(error);
                return res.json({
                    success: 0,
                    message: "Erreur de connexion..."
                }); 
            }
            if(results) return res.json({
                success: 1,
                message : "Le Drone a été Ajouté !"
            })
        })
    },
    //get All drone
    getAllDrones : async(req, res) => {
        getAllDrones((error, results) => {
            if(error) {
                throw error;
                return;
            }
            return res.json({
                success: 1,
                length: results.length,
                data: results
            })
        })
    },
    //Get a single drone by id
    getDroneById: async(req, res) => {
        const id = parseInt(req.params.id)
        getDroneById(id, (error, results) => {
            if(error) {
                throw error
                return;
            }
            if(!results) return res.json({
                success: 0,
                message: `le drone n'a pas été trouvé...`
            })
            return res.json({
                success: 1,
                data: results
            })
        })

    },
    //Stats drones [busy]
    getTotalDroneBusy: async(req, res) => {
        getTotalDroneBusy((error, results) => {
            if(error) {
                throw error
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })

    },
    //Stats drones [en maintenance]
    getTotalDroneMaintenance: async(req, res) => {
        getTotalDroneMaintenance((error, results) => {
            if(error) {
                throw error
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })

    },
     //Stats drones [disponible]
     getTotalDroneAvailable: async(req, res) => {
        getTotalDroneAvailable((error, results) => {
            if(error) {
                throw error
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })

    },
    // Get All Drone on Available
    getAllDroneAvailable: async(req, res) => {
        getAllDroneAvailable((error, results) => {
            if(error) {
                throw error
                return;
            }
            return res.json({
                success: 1,
                length: results.length,
                data: results
            })
        })

    },
    // Get All Drone on Busy
    getAllDroneBusy: async(req, res) => {
        getAllDroneBusy((error, results) => {
            if(error) {
                throw error
                return;
            }
            return res.json({
                success: 1,
                length: results.length,
                data: results
            })
        })

    },
    // Get current latitude current longitude
    getCurrentLocationById: async(req, res) => {
        const id = parseInt(req.params.id)
        getCurrentLocationById(id,(error, results) => {
            if(error) {
                throw error
                return;
            }
            return res.json({
                success: 1,
                length: results.length,
                data: results
            })
        })

    },
    // get Drone Data by Id
    getDronesDataById: async(req, res) => {
        const id = parseInt(req.params.id)
        getDronesDataById(id,(error, results) => {
            if(error) {
                throw error
                return;
            }
            return res.json({
                success: 1,
                length: results.length,
                data: results
            })
        })

    }
}