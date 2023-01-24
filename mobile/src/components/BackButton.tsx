import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'phosphor-react-native'
import { TouchableOpacity } from 'react-native'
import colors from 'tailwindcss/colors'

export function BackButton () {
  const { goBack } = useNavigation()
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goBack}
    >
      <ArrowLeft color={colors.zinc[400]} size={32} />
    </TouchableOpacity>
  )
}
