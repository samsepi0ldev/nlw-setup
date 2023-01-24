import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { ScrollView, View, Text } from 'react-native'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { HabitsEmpty } from '../components/HabitsEmpty'
import { ProgressBar } from '../components/ProgressBar'
import { Wrapper } from '../components/Wrapper'
import { api } from '../lib/axios'

interface Params {
  date: string
}

interface HabitType {
  id: string
  title: string
  created_at: string
}

interface HabitInfo {
  possibleHabits: HabitType[]
  completedHabits: string[]
}

export function Habit () {
  const [habitsInfo, setHabitsInfo] = useState<HabitInfo>()
  const completedPercentage = habitsInfo?.possibleHabits.length
    ? Math.round((habitsInfo?.completedHabits.length / habitsInfo?.possibleHabits.length) * 100) 
    : 0

  const route = useRoute()
  const { date } = route.params as Params
  const dayAndMonth = dayjs(date).format('DD/MM')
  const weekDay = dayjs(date).format('dddd')
  const isDateInPast = dayjs(date)
    .endOf('day')
    .isBefore(new Date())

  useEffect(() => {
    api.get('day', {
      params: {
        date: date
      }
    })
      .then(res => setHabitsInfo(res.data))
  }, [])

  async function handleToggleHabit(habitId: string) {
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
  }

  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text className='font-semibold text-base text-zinc-400 mt-6'>{weekDay}</Text>
        <Text className='font-extrabold text-3xl text-white mt-2'>{dayAndMonth}</Text>
        <ProgressBar progress={completedPercentage} />
        <View className='mt-6'>
          {habitsInfo?.possibleHabits.length
            ? habitsInfo?.possibleHabits.map(habit => (
            <Checkbox
              key={habit.id}
              checked={habitsInfo?.completedHabits.includes(habit.id)}
              onPress={() => handleToggleHabit(habit.id)}
              disabled={isDateInPast}
              title={habit.title}
              lineThrough
            />
          ))
            : <HabitsEmpty />
          }
          {isDateInPast && 
            <Text className='text-white font-regular mt-10 text-center'>
              Voce nao pode editar hábitos de uma data passada.
            </Text>
          }
        </View>
      </ScrollView>
    </Wrapper>
  )
}