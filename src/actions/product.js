import {createActions} from 'reduxsauce'

const {Types, Creators} = createActions({
  getbundlesRequest: ['payload'],
  getbundlesSuccess: ['response'],
  getbundlesFailure: null,

  clearRequest: null,
})

export const ProductTypes = Types
export default Creators
