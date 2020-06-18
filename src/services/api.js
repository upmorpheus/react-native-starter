import apisauce from 'apisauce'
import {equals, includes} from 'ramda'
// import Config from "react-native-config"
import {store} from '~/reducers'
import AppActions from '~/actions/app'

const Config = {API_URL: 'http://23.20.37.229/api/v1/'}

const authenticated = api => {
  api.setHeader('Authorization', 'Bearer ' + window.token)
  return api
}

const navigator = response => {
  if (includes('/auth/login', response.config.url)) return
  if (equals(response.status, 401)) {
    store.dispatch(
      AppActions.logoutRequest({
        msg: "You've been logged out. Please log back in.",
      }),
    )
    console.log('Your token has been expired.')
  }
}

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 500000,
  })

  api.addMonitor(navigator)

  const login = payload => api.post('auth/login', payload)
  const register = payload => api.post('auth/register', payload)
  const getBundles = (id = 'fire-exam-prep') => api.get(`bundles/${id}`)

  return {
    login,
    register,
    getBundles,
  }
}

export default {
  create,
}
