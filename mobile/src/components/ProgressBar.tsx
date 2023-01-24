import { View } from 'react-native'

interface ProgressBar {
  progress: number
}

export function ProgressBar(props: ProgressBar) {
  return (
    <View className='w-full h-3 bg-zinc-700 mt-4 rounded-xl'>
      <View
        className='h-3 bg-violet-600 rounded-xl'
        style={{
          width: `${props.progress}%`
        }}
      />
    </View>
  )
}