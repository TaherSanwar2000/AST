import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MyStack from './Navigator/RootNavigator'

const App = () => {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  )
}

export default App