import {Alert} from 'react-native'
import {put, select, delay} from 'redux-saga/effects'
import AppActions from '~/actions/app'

export function* loginRequest(api, action) {
  const {payload} = action
  const response = yield api.login(payload)
  if (response.ok) {
    window.token = response.data.access_token
    yield put(AppActions.loginSuccess(response.data))
  } else {
    yield put(AppActions.loginFailure())
    Alert.alert('Gretel', 'Login has been failed!')
  }
}

export function* logoutRequest(api, action) {
  const {msg} = action.payload
  yield put(AppActions.logoutSuccess())
  yield put(AppActions.clearRequest())

  if (msg) {
    Alert.alert('Gretel', msg, [{text: 'Ok', onPress: () => {}}])
  }
}

export function* registerRequest(api, action) {
  const {payload} = action
  const response = yield api.register(payload)

  if (response.ok) {
    yield put(AppActions.registerSuccess(response.data))
  } else {
    Alert.alert('Gretel', 'Registration has been failed!')
    yield put(AppActions.registerFailure())
  }
}
