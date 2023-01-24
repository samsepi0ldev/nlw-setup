import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home'
import { New } from '../screens/New'
import { Habit } from '../screens/Habit'
import { View } from 'react-native'

const Stack = createNativeStackNavigator()

export function AppRoutes () {
  return (
    <View className='flex-1 bg-background'>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='home' component={Home} />
          <Stack.Screen name='new' component={New} />
          <Stack.Screen name='habit' component={Habit} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}