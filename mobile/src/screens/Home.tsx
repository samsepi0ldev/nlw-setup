import { useFocusEffect, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ActivityLoading } from '../components/ActivityLoading'

import { HabitDay, daySize } from '../components/HabitDay'
import { Header } from '../components/Header'
import { Wrapper } from '../components/Wrapper'
import { api } from '../lib/axios'
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

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
const minimumSummaryDatesSize = 18 * 5
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type SummaryProps = Array<{
  id: string
  date: string
  completed: number
  amount: number
}>

export function Home () {
  const { navigate } = useNavigation()
  const [summary, setSummary] = useState<SummaryProps>([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(useCallback(() => {
    api.get('summary')
      .then(res => {
        setSummary(res.data)
        setLoading(false)
      })
  }, []))

  if (loading) return <ActivityLoading />

  return (
    <Wrapper>
      <Header />
      <View className='mt-6 mb-2 flex-row'>
        {summary.length && weekDays.map((weekDay, index) => (
          <Text
            key={index}
            className='text-zinc-400 font-bold text-xl text-center mx-1'
            style={{
              width: daySize
            }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50
        }}
      >
        <View className='flex-row flex-wrap'>
          {summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })
            return (
              <HabitDay
                key={date.toString()}
                onPress={() => navigate('habit', {
                  date: date.toISOString()
                })}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
          )})}
          {amountOfDaysToFill > 0 && Array
            .from({ length: amountOfDaysToFill })
            .map((_, index) => (
              <View
                key={index}
                className='bg-zinc-900 border-2 border-zinc-800 rounded-lg m-1 opacity-40'
                style={{
                  width: daySize,
                  height: daySize
                }}
              ></View>
            ))}
        </View>
      </ScrollView>
    </Wrapper>
  )
}