import * as Popover from '@radix-ui/react-popover'
import clsx from 'clsx'

import { ProgressBar } from './ProgressBar'
import dayjs from 'dayjs'
import { HabitList } from './HabitList'
import { useState } from 'react'

interface HabitDayProps {
  date: Date
  amount?: number
  defaultCompleted?: number
}

export function HabitDay({ amount = 0, defaultCompleted = 0, date }: HabitDayProps) {
  const [completed, setCompleted] = useState(defaultCompleted)
  const completedPercentage = amount !== 0 ? Math.round((completed / amount) * 100) : 0
  const dateAndMonth = dayjs(date).format('DD/MM')
  const weekDay = dayjs(date).format('dddd')

  function handleCompleteChange (completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={clsx('w-10 h-10 rounded-lg border-2 transition-colors', {
          'border-zinc-800 bg-zinc-900': completedPercentage === 0,
          'bg-violet-900 border-violet-700': completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600': completedPercentage >= 20 && completedPercentage < 60,
          'bg-violet-700 border-violet-500': completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500': completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-500': completedPercentage >= 80
        })} />
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] w-full p-6 rounded-2xl flex flex-col bg-zinc-900'>
        <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
          <span className='text-zinc-400 font-semibold'>{weekDay}</span>
          <span className='leading-tight text-3xl text-white font-extrabold'>{dateAndMonth}</span>
          
          <ProgressBar progress={completedPercentage} />

          <HabitList
            onCompletedChange={handleCompleteChange}
            date={date}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}