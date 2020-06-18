import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  loginRequest: ['payload'],
  loginSuccess: ['response'],
  loginFailure: null,

  logoutRequest: ['payload'],
  logoutSuccess: null,
  logoutFailure: null,

  registerRequest: ['payload'],
  registerSuccess: ['response'],
  registerFailure: null,

  clearRequest: null,
});

export const AppTypes = Types;
export default Creators;
