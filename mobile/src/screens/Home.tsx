import { useNavigation } from '@react-navigation/native'
import { View, Text, ScrollView } from 'react-native'

import { HabitDay, daySize } from '../components/HabitDay'
import { Header } from '../components/Header'
import { Wrapper } from '../components/Wrapper'
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

export function Home () {
  const { navigate } = useNavigation()
  return (
    <Wrapper>
      <Header />
      <View className='mt-6 mb-2 flex-row'>
        {weekDays.map((weekDay, index) => (
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
          {summaryDates.map(date => (
            <HabitDay
              key={date.toString()}
              onPress={() => navigate('habit', {
                date: date.toISOString()
              })}
            />
          ))}
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