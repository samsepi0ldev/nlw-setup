import * as Checkbox from '@radix-ui/react-checkbox'
import { Check } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'

const availableWeekDays = [
  'Domingo',
  'Segunda',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
]

export function NewHabitForm () {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function createNewHabit (e: FormEvent) {
    e.preventDefault()
    
    if (!title || weekDays.length === 0) {
      alert('Preencha todos os campos')
      return
    }

    await api.post('/habits', {
      title,
      weekDays
    })
    alert('Habito criado com sucesso!')
    setTitle('')
    setWeekDays([])
  }

  function handleToggleWeekDays (weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays(weekDays => weekDays.filter(wd => wd !== weekDay))
      return
    }
    setWeekDays(weekDays => [...weekDays, weekDay])
  }

  return (
    <form
      onSubmit={createNewHabit}
      className='w-full mt-6 flex flex-col'
    >
      <label
        htmlFor='title'
        className='font-semibold leading-tight text-white'
      >
        Qual seu comprometimento?
      </label>
      <input
        onChange={e => setTitle(e.target.value)}
        value={title}
        className='mt-3 p-4 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400'
        type='text'
        id='title'
        placeholder='Exercícios, dormir bem, etc...'
        autoFocus />
      <label
        htmlFor=''
        className='font-semibold leading-tight text-white mt-4'
      >
        Qual a recorrência?
      </label>
      <div className='flex flex-col gap-2 mt-3'>
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            className='flex items-center gap-3 group'
            checked={weekDays.includes(index)}
            onClick={() => handleToggleWeekDays(index)}
          >
            <div
              className='bg-zinc-900 border-2 border-zinc-800 rounded-lg w-8 h-8 flex items-center justify-center group-data-[state="checked"]:bg-green-500 group-data-[state="checked"]:border-green-500 transition-colors'>
              <Checkbox.CheckboxIndicator>
                <Check className='text-white' size={20} />
              </Checkbox.CheckboxIndicator>
            </div>
            <span className='text-white leading-tight'>
              {weekDay}
            </span>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type='submit'
        className='flex items-center justify-center gap-3 bg-green-600 text-white rounded-lg py-4 mt-6 font-semibold hover:bg-green-500 transition-colors'
      >
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  )
}