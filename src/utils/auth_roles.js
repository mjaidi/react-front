const AUTHORIZED_ROLES_FOR_ROUTES = [
  {
    route: "/admin",
    authorizedRoles: ["admin"]
  },
  {
    route: "/secret",
    authorizedRoles: ["admin", "client", "supplier", null]
  }
];

const AUTHORIZED_ROLES_FOR_ACTIONS = [
  {
    action: "",
    authorizedRoles: ["admin"]
  }
];

export const isAuthorizedRoute = (path, role) => {
  return AUTHORIZED_ROLES_FOR_ROUTES.find(
    r => r.route === path
  ).authorizedRoles.includes(role);
};
export const isAuthorizedAction = (action, role) => {
  return AUTHORIZED_ROLES_FOR_ACTIONS.find(
    r => r.action === action
  ).authorizedRoles.includes(role);
};
