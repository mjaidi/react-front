const AUTHORIZED_ROLES_FOR_ROUTES = [
  {
    route: "/dashboard",
    authorizedRoles: ["admin"]
  },
  {
    route: "/main",
    authorizedRoles: ["admin", "client", "provider", null]
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
