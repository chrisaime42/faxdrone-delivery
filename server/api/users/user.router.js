const { createUser, login, getUserByEmail, getUsers, getUsersByRole, getUsersCustomers, getUsersCustomersById, getUsersById, updateCoordsUsers, getTotalCustomers } = require('./user.controllers')
const tokenVerify = require('../../utils/tokenVerify')
const verifyRoles = require('../../utils/verifyRoles')
const roles = require('../../utils/roles')

const router = require('express').Router()


//Se Connecter
router.post('/auth/login', login)

// Creer un utilisateur
router.post('/auth/register', createUser)

//Create customers by user admin
router.post('/admin/auth/register', tokenVerify, verifyRoles(roles.user), createUser)

//Obtenir un utilisateur par son mail
router.post('/email/user',tokenVerify,verifyRoles(roles.user), getUserByEmail)

//Obtenir tous les utilisateurs
router.get('/all/user',tokenVerify,verifyRoles(roles.user), getUsers)

//Obtenir les utlisateurs par role
router.get('/role/user',tokenVerify, verifyRoles(roles.user),  getUsersByRole)

//Obtenir les utilisateurs clients
router.get('/customers/user', tokenVerify, verifyRoles(roles.user),  getUsersCustomers)

//Obtenir les donnés d'un utilisateur qui soit un client
router.get('/customers/:id/user', tokenVerify, verifyRoles(roles.user),  getUsersCustomersById)

//Obtenir les données d'un utilisateurs qui ne soit pas un client
router.get('/:id/user', tokenVerify, verifyRoles(roles.user),  getUsersById)

// STATS TOTAL CUSTOMERS INSCRITS
router.get('/stats/customers', tokenVerify, verifyRoles(roles.user),  getTotalCustomers)

//Modifier les coordonnés d'un utilisateurs
router.patch('/coords/:id/user', tokenVerify,verifyRoles(roles.user,roles.customer), updateCoordsUsers)



module.exports = router;