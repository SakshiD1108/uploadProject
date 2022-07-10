import Role from "./Role";
export default authorize;

function authorize(Role = []) {
  // Roles param can be a single Role string (e.g. Role.User or 'User')
  // or an array of Roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof Role === "string") {
    Role = [Role];
  }

  return [
    // authorize based on user Role
    (req, res, next) => {
      console.log(req.Role, Role);
      if (Role.length && !Role.includes(req.Role)) {
        // user's Role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }
      // authentication and authorization successful
      next();
    },
  ];
}
