import { Check } from 'phosphor-react-native'
import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native'
import colors from 'tailwindcss/colors'

interface CheckboxProps extends TouchableOpacityProps {
  checked?: boolean
  title: string
}

export function Checkbox({ checked, title, ...rest }: CheckboxProps) {
  return (
    <TouchableOpacity
      {...rest}
      className='flex-row mb-2 items-center'
      activeOpacity={0.7}
    >
      {checked ? (
        <View className='w-8 h-8 items-center justify-center rounded-lg bg-green-500'>
          <Check weight='bold' size={20} color={colors.white} />
        </View>
      ) : (
          <View className='w-8 h-8 rounded-lg bg-zinc-900 border-2 border-zinc-800'></View>
      )}
      <Text className='text-base font-regular text-white ml-3'>{title}</Text>
    </TouchableOpacity>
  )
}