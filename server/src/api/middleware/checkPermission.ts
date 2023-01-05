import jwtAuthz from 'express-jwt-authz';

export const checkPermissions = (permissions: string | string[]) => {
  // return jwtAuthz( [permissions], {
  return jwtAuthz(typeof permissions === 'string' ? [permissions] : permissions, {
    customScopeKey: 'permissions',
    checkAllScopes: true,
    failWithError: true
  });
};
