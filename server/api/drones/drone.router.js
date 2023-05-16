const roles = require('../../utils/roles')
const tokenVerify = require('../../utils/tokenVerify')
const verifyRoles = require('../../utils/verifyRoles')
const { createDrone, getAllDrones, getDroneById, getTotalDroneBusy, getTotalDroneMaintenance, getTotalDroneAvailable, getAllDroneAvailable, getAllDroneBusy, getCurrentLocationById, getDronesDataById } = require('./drone.controllers')


const router = require('express').Router()


// Ajouter un drone 
 router.post('/new-drone', tokenVerify, verifyRoles(roles.user), createDrone )

 // Obtenir tous les drones
 router.get('/all-drone', tokenVerify, verifyRoles(roles.user), getAllDrones)

 //Obtenir les infos de drone avec l'identifiant
 router.get('/:id/drone', tokenVerify, verifyRoles(roles.user), getDroneById)

 //Stats drones [busy]
 router.get('/stats/busy', tokenVerify, verifyRoles(roles.user), getTotalDroneBusy)

 //Stats drones [maintenance]
 router.get('/stats/maintenance', tokenVerify, verifyRoles(roles.user), getTotalDroneMaintenance)

 //Stats drones [available]
 router.get('/stats/available', tokenVerify, verifyRoles(roles.user), getTotalDroneAvailable)

 //Get All Drone on Available
 router.get('/all/available',  tokenVerify, verifyRoles(roles.user), getAllDroneAvailable)

 // Get All Drone on Busy
 router.get('/all/busy',  tokenVerify, verifyRoles(roles.user), getAllDroneBusy)


// Get current latitude current longitude
router.get('/:id/coords',tokenVerify, verifyRoles(roles.user), getCurrentLocationById)

// Get drone data by Id
router.get('/:id/data',tokenVerify, verifyRoles(roles.user), getDronesDataById)
 



module.exports = router;

