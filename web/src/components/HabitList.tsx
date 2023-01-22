import { useEffect, useState } from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'

import { api } from '../lib/axios'
import dayjs from 'dayjs'

interface HabitType {
  id: string
  title: string
  created_at: string
}

interface HabitInfo {
  possibleHabits: HabitType[]
  completedHabits: string[]
}

interface HabitListProps {
  date: Date
  onCompletedChange: (completed: number) => void
}

export function HabitList({ date, onCompletedChange }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitInfo>()
  const isDateInPast = dayjs(date)
    .endOf('day')
    .isBefore(new Date())

  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString()
      }
    })
      .then(res => setHabitsInfo(res.data))
  }, [])

  async function handleToggleHabit (habitId: string) {
    await api.patch(`habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)
    let completedHabits: string[] = []
    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })
    onCompletedChange(completedHabits.length)
  }
  
  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          disabled={isDateInPast}
          className='flex items-center gap-3 group disabled:cursor-not-allowed'
        >
          <div
            className='bg-zinc-900 border-2 border-zinc-800 rounded-lg w-8 h-8 flex items-center justify-center group-data-[state="checked"]:bg-green-500 group-data-[state="checked"]:border-green-500 transition-colors'>
            <Checkbox.CheckboxIndicator>
              <Check className='text-white' size={20} />
            </Checkbox.CheckboxIndicator>
          </div>
          <span className='font-semibold text-xl text-white leading-tight group-data-[state="checked"]:line-through group-data-[state="checked"]:opacity-50'>
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  )
}