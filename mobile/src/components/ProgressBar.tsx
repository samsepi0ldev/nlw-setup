import { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'

interface ProgressBar {
  progress: number
}

export function ProgressBar({ progress }: ProgressBar) {
  const animatedProgress = useSharedValue(progress)
  const style = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`
    }
  })

  useEffect(() => {
    animatedProgress.value = withTiming(progress)
  }, [progress])

  return (
    <View className='w-full h-3 bg-zinc-700 mt-4 rounded-xl'>
      <Animated.View
        className='h-3 bg-violet-600 rounded-xl'
        style={style}
      />
    </View>
  )
}