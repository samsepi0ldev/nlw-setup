import { TouchableOpacity, View, Text } from 'react-native'
import { Plus } from 'phosphor-react-native'
import colors from 'tailwindcss/colors'

import Logo from '../assets/logo.svg'
import { useNavigation } from '@react-navigation/native'

export function Header () {
  const { navigate } = useNavigation()
  return (
    <View className='w-full flex-row items-center justify-between'>
      <Logo />
      <TouchableOpacity
        onPress={() => navigate('new')}
        className='px-4 py-3 border border-violet-500 rounded-lg flex-row items-center'
      >
        <Plus weight='bold' size={20} color={colors.violet[500]} />
        <Text className='text-white font-semibold text-base ml-3'>Novo</Text>
      </TouchableOpacity>
    </View>
  )
}