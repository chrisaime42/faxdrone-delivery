const dbConfig = require("../../config/db.config")

module.exports = {

    //Create a new drone
    create: (data, callback)=> {
        dbConfig.query(`INSERT INTO drones (name, model, max_payload, max_speed, max_flight_time, delivery_address, current_latitude, current_longitude, current_altitude,battery_level, signals, status) values (?,?,?,?,?,?,?,?,?,?,?,?)`, 
        [
            data.name,
            data.model,
            data.max_payload,
            data.max_speed,
            data.max_flight_time,
            data.delivery_address,
            data.current_latitude,
            data.current_longitude,
            data.current_altitude,
            data.battery_level,
            data.signals,
            data.status,
           
        ], (error, results) => {
            if  (error) {
                throw error
                return;
            }
            return callback(null, results)

        })
    },
    //Get all drone
    getAllDrones: ( callback) => {
        dbConfig.query(`SELECT * FROM drones`,[],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
      //Get a single drone by id
      getDroneById: (id, callback) => {
        dbConfig.query(`SELECT * FROM drones where id=?`,[id],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results[0])
            }
        );
    },
    //Stats drones [busy]
    getTotalDroneBusy: (callback) => {
        dbConfig.query(`SELECT COUNT(*) as total FROM drones WHERE status = 'busy'`,[],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
     //Stats drones [en maintenance]
     getTotalDroneMaintenance: (callback) => {
        dbConfig.query(`SELECT COUNT(*) As total FROM drones WHERE status = 'maintenance'`,[],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
     //Stats drones [disponible]
     getTotalDroneAvailable: (callback) => {
        dbConfig.query(`SELECT COUNT(*) As total FROM drones WHERE status = 'available'`,[],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
    // Get All Drone on Available
    getAllDroneAvailable: (callback) => {
        dbConfig.query(`SELECT * FROM drones WHERE status = 'available'`,[],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
     // Get All Drone on Busy
     getAllDroneBusy: (callback) => {
        dbConfig.query(`SELECT * FROM drones WHERE status = 'busy'`,[],(error, results) => {
                if (error) {
                    throw error;
                    return;
                }
                return callback(null, results)
            }
        );
    },
    // Get Signals ok to drone
    
    // Get current latitude current longitude
   getCurrentLocationById: (id, callback) => {
        dbConfig.query(`SELECT id, name, current_latitude, current_longitude FROM drones where id =?`,
        [id], (error, results) => {
            if(error) {
                throw error;
                return;
            }
            return callback(null, results)
        })
   },
   // get Drone Data by Id
   getDronesDataById : (id, callback) => {
    dbConfig.query(`SELECT * FROM drones WHERE id =?`,
    [id], (error, results) => {
        if (error) {
            throw error;
            return;
        }
        callback(null, results)
    })
   }
    
}