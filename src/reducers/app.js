import {createReducer} from 'reduxsauce'
import {produce} from 'immer'
import {AppTypes} from '~/actions/app'

const initialState = {
  status: '', // done, pending, error
  access_token: '',
  refresh_token: '',
  user: {},
}

const loginRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const loginSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const loginFailure = produce((draft, action) => {
  draft.status = 'error'
})

const logoutRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const logoutSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const logoutFailure = produce((draft, action) => {
  draft.status = 'error'
})

const registerRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const registerSuccess = produce((draft, action) => {
  draft.status = 'done'
})
const registerFailure = produce((draft, action) => {
  draft.status = 'error'
})

const clearRequest = produce((draft, action) => {
  draft.status = 'done'
})

export const reducer = createReducer(initialState, {
  [AppTypes.LOGIN_REQUEST]: loginRequest,
  [AppTypes.LOGIN_SUCCESS]: loginSuccess,
  [AppTypes.LOGIN_FAILURE]: loginFailure,

  [AppTypes.LOGOUT_REQUEST]: logoutRequest,
  [AppTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [AppTypes.LOGOUT_FAILURE]: logoutFailure,

  [AppTypes.REGISTER_REQUEST]: registerRequest,
  [AppTypes.REGISTER_SUCCESS]: registerSuccess,
  [AppTypes.REGISTER_FAILURE]: registerFailure,

  [AppTypes.CLEAR_REQUEST]: clearRequest,
})
