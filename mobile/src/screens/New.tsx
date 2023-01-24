import { Check } from 'phosphor-react-native'
import { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { BackButton } from '../components/BackButton'
import { Checkbox } from '../components/Checkbox'
import { Wrapper } from '../components/Wrapper'

const availableWeekDays = [
  'Domingo',
  'Segunda',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function New () {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDays(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(weekDays => weekDays.filter(wd => wd !== weekDay))
      return
    }
    setWeekDays(weekDays => [...weekDays, weekDay])
  }
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />
        <Text className='font-extrabold text-3xl text-white mt-6'>Criar hábito</Text>
        <Text className='font-semibold text-white mt-6 text-base'>Qual seu comprometimento?</Text>
        <TextInput
          className='text-white py-4 px-4 bg-zinc-900 rounded-lg border-2 border-zinc-800 text-base mt-3 font-regular'
          placeholder='Exercícios, dormir bem, etc...'
          placeholderTextColor={colors.zinc[400]} />
        <Text className='font-semibold text-white mt-6 text-base'>Qual a recorrência?</Text>
        <View className='mt-3'>
          {availableWeekDays.map((day, index) => (
            <Checkbox
              key={day}
              title={day}
              onPress={() => handleToggleWeekDays(index)}
              checked={weekDays.includes(index)}
            />
          ))}
        </View>
        <TouchableOpacity
          className='w-full flex-row items-center justify-center rounded-lg bg-green-500 py-4 mt-6'
          activeOpacity={0.7}
        >
          <Check weight='bold' size={20} color='white' />
          <Text className='text-white text-base font-semibold ml-3'>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </Wrapper>
  )
}