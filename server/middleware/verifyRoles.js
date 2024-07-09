const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        

        if (!req.roleId) {
            return res.status(403).json({ message: "Role is required" });
        }

        const rolesArray = [...allowedRoles];
        
        
        const roleIds = Array.isArray(req.roleId) ? req.roleId : [req.roleId];

        const result = roleIds.some(role => rolesArray.includes(role));
       

        if (!result) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        
        next();
    }
}

module.exports = verifyRoles;
