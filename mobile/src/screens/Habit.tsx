import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import { ScrollView, View, Text } from 'react-native'
import { BackButton } from '../components/BackButton'
import { Wrapper } from '../components/Wrapper'

interface Params {
  date: string
}

export function Habit () {
  const route = useRoute()
  const { date } = route.params as Params
  const dayAndMonth = dayjs(date).format('DD/MM')
  const weekDay = dayjs(date).format('dddd')
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text className='font-semibold text-base text-zinc-400 mt-6'>{weekDay}</Text>
        <Text className='font-extrabold text-3xl text-white mt-2'>{dayAndMonth}</Text>
      </ScrollView>
    </Wrapper>
  )
}