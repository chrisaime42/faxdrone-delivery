require('dotenv').config();

const jwt  = require("jsonwebtoken");


const tokenVerify = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader?.startsWith('Bearer ')) return res.json({success: 0, message: `Non autorisé, Contacter l'administrateur`})
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.user = decoded.result;
        req.roles = decoded.userInfo.roles;
        console.log("results : ", req.user);
        next();
    } catch (err) {
        return res.json({
            success:0,
            message: 'token invalide'
        });
    }

}

module.exports = tokenVerify