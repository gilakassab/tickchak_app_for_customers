const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("verifyRoles");
        console.log("RoleId from JWT:", req.roleId);

        if (!req.roleId) {
            return res.status(403).json({ message: "Role is required" });
        }

        const rolesArray = [...allowedRoles];
        console.log("Allowed roles:", rolesArray);
        
        const roleIds = Array.isArray(req.roleId) ? req.roleId : [req.roleId];
        console.log("RoleIds array:", roleIds);

        const result = roleIds.some(role => rolesArray.includes(role));
        console.log("Role match result:", result);

        if (!result) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        console.log("The user has access");
        next();
    }
}

module.exports = verifyRoles;
