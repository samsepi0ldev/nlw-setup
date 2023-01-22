import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'

const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S'
]
const summaryDates = generateDatesFromYearBeginning()
const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type SummaryProps = Array<{
  id: string
  date: string
  completed: number
  amount: number
}>

export function SummaryTable () {
  const [summary, setSummary] = useState<SummaryProps>([])

  useEffect(() => {
    api.get('/summary')
      .then(res => {
        setSummary(res.data)
      })
  }, [])

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay, i) => (
          <div
            key={weekDay + i}
            className='w-10 h-10 flex items-center justify-center text-zinc-400 text-xl font-bold'
          >
            {weekDay}
          </div>
        ))}
      </div>
      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summary.length && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed}
            />
          )
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => (
          <div
            key={i}
            className='w-10 h-10 rounded-lg border-2 border-zinc-800 bg-zinc-900 opacity-40 cursor-not-allowed'
          ></div>
        ))}
      </div>
    </div>
  )
}