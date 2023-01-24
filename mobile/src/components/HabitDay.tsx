import clsx from 'clsx'
import { useState } from 'react'
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from 'react-native'

const weekDays = 7
const screenHorizontalPadding = (32 * 2) / 5
const dayMarginBetween = 8
export const daySize = (Dimensions.get('screen').width / weekDays) - (screenHorizontalPadding + 5)

interface HabitDayProps extends TouchableOpacityProps {
  date: Date
  amount?: number
  defaultCompleted?: number
}

export function HabitDay({ date, amount = 0, defaultCompleted = 0, ...rest }: HabitDayProps) {
  const completedPercentage = amount !== 0 ? Math.round((defaultCompleted / amount) * 100) : 0

  return (
    <TouchableOpacity
      {...rest}
      className={clsx('bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1', {
        ['border-zinc-800 bg-zinc-900']: completedPercentage === 0,
        ['bg-violet-900 border-violet-700']: completedPercentage > 0 && completedPercentage < 20,
        ['bg-violet-800 border-violet-600']: completedPercentage >= 20 && completedPercentage < 60,
        ['bg-violet-700 border-violet-500']: completedPercentage >= 40 && completedPercentage < 60,
        ['bg-violet-600 border-violet-500']: completedPercentage >= 60 && completedPercentage < 80,
        ['bg-violet-500 border-violet-500']: completedPercentage >= 80
      })}
      style={{
        width: daySize,
        height: daySize
      }}
      activeOpacity={0.7}
    >
    </TouchableOpacity>
  )
}