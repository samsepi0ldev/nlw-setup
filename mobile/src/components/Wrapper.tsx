import { ReactNode } from 'react'
import { View } from 'react-native'

interface WrapperProps {
  children: ReactNode
}

export function Wrapper (props: WrapperProps) {
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      {props.children}
    </View>
  )
}