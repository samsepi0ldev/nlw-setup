import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native'

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5
const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)

interface HabitDayProps extends TouchableOpacityProps {}

export function HabitDay({ ...rest }: HabitDayProps) {
  return (
    <TouchableOpacity
      {...rest}
      className='bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1'
      style={{
        width: daySize,
        height: daySize
      }}
      activeOpacity={0.7}
    >
    </TouchableOpacity>
  )
}