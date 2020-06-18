import {createReducer} from 'reduxsauce'
import {produce} from 'immer'
import {ProductTypes} from '~/actions/product'

const initialState = {
  status: '', // done, pending, error
  bundle: {},
}

const getbundlesRequest = produce((draft, action) => {
  draft.status = 'pending'
})
const getbundlesSuccess = produce((draft, action) => {
  draft.status = 'done'
  draft.bundle = action.response
})
const getbundlesFailure = produce((draft, action) => {
  draft.status = 'done'
})

const clearRequest = produce((draft, action) => {
  draft.status = 'done'
})

export const reducer = createReducer(initialState, {
  [ProductTypes.GETBUNDLES_REQUEST]: getbundlesRequest,
  [ProductTypes.GETBUNDLES_SUCCESS]: getbundlesSuccess,
  [ProductTypes.GETBUNDLES_FAILURE]: getbundlesFailure,

  [ProductTypes.CLEAR_REQUEST]: clearRequest,
})
