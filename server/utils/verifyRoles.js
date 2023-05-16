const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.roles) return res.json({success: 0, message: `Vous n'êtes pas autorisé à voir ce contenu! `});
        const roleArray = [...allowedRoles];
        const result = req.roles.map(role => roleArray.includes(role)).find(val => val === true)
      if (!result) return res.json({success: 0, message: `Vous n'êtes pas autorisé ! Accès refusé`});
        next();
    }
}

module.exports = verifyRoles;