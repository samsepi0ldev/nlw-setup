import { Check } from 'phosphor-react-native'
import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native'
import Animated, { RotateInDownLeft, RotateOutDownRight } from 'react-native-reanimated'

import colors from 'tailwindcss/colors'

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean
  title: string
  lineThrough?: boolean
}

export function Checkbox({ checked, title, lineThrough, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      {...rest}
      className='flex-row mb-2 items-center'
      activeOpacity={0.7}
    >
      {checked ? (
        <Animated.View
          entering={RotateInDownLeft}
          exiting={RotateOutDownRight}
          className='w-8 h-8 items-center justify-center rounded-lg bg-green-500'>
          <Check weight='bold' size={20} color={colors.white} />
        </Animated.View>
      ) : (
          <View className='w-8 h-8 rounded-lg bg-zinc-900 border-2 border-zinc-800'></View>
      )}
      <Text
        className='text-base font-regular text-white ml-3'
        style={{
          textDecorationLine: lineThrough && checked ? 'line-through' : 'none',
          opacity: lineThrough && checked ? 0.6 : 1,
          fontFamily: lineThrough ? 'Inter_600SemiBold' : 'Inter_400Regular',
          fontSize: lineThrough ? 20 : 16
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}