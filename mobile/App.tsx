import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'

import './src/lib/dayjs'
import { AppRoutes } from './src/routes'
import { ActivityLoading } from './src/components/ActivityLoading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })

  if (!fontsLoaded) return <ActivityLoading />

  return (
    <>
      <AppRoutes />
      <StatusBar style='light' backgroundColor='transparent' translucent />
    </>
  )
}
