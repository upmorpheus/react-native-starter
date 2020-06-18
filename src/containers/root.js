import 'react-native-gesture-handler'
import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useSelector} from 'react-redux'
import _ from 'lodash'
import {Login, Register, Bundle, Product} from '~/containers'

const Stack = createStackNavigator()

const RootContainer = props => {
  const token = useSelector(state => state.app.access_token)
  window.token = token
  const isSignedIn = !_.isEmpty(token)
  const initialRoute = isSignedIn ? 'Product' : 'Bundle'
  const title = useSelector(state => state.product.bundle?.bundle?.title)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{headerShown: true}}>
        <Stack.Screen name="Bundle" component={Bundle} options={{ title }} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootContainer
