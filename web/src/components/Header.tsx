import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import logo from '../assets/logo.svg'
import { NewHabitForm } from './NewHabitForm'

export function Header () {
  return (
    <header className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      <img src={logo} alt='Logo do NLW Setup' />
      <Dialog.Root>
        <Dialog.Trigger className='px-6 py-4 rounded-lg border border-violet-500 text-white flex items-center gap-3 font-semibold hover:border-violet-300 transition-colors'>
          <Plus className='text-violet-500' size={20} />
          Novo hábito
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0' />
          <Dialog.Content className='w-full max-w-lg bg-zinc-900 p-10 rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <Dialog.Close className='absolute top-6 right-6 text-zinc-400 hover:text-zinc-200 transition-colors'>
              <X size={24} />
            </Dialog.Close>
            <Dialog.Title className='font-extrabold text-3xl text-white'>
              Criar hábito
            </Dialog.Title>
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  )
}