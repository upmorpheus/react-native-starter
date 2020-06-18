import {takeLatest, all} from 'redux-saga/effects'
import {AppTypes} from '~/actions/app'
import {ProductTypes} from '~/actions/product'
import API from '~/services/api'
import {loginRequest, logoutRequest, registerRequest} from './app'
import {getbundlesRequest} from './product'

const api = API.create()

/**
 * Connect Types to Sagas
 */
export default function* root() {
  yield all([
    // some sagas receive extra parameters in addition to an action
    // App
    takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api),
    takeLatest(AppTypes.LOGOUT_REQUEST, logoutRequest, api),
    takeLatest(AppTypes.REGISTER_REQUEST, registerRequest, api),

    takeLatest(ProductTypes.GETBUNDLES_REQUEST, getbundlesRequest, api),
  ])
}
