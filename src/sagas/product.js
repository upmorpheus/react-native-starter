import {Alert} from 'react-native'
import {put, select, delay} from 'redux-saga/effects'
import ProductActions from '~/actions/product'

export function* getbundlesRequest(api, action) {
  const {payload} = action
  const response = yield api.getBundles(payload)

  if (response.ok) {
    yield put(ProductActions.getbundlesSuccess(response.data))
  } else {
    yield put(ProductActions.getbundlesFailure())
  }
}
