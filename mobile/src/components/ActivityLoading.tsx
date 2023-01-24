import { View, ActivityIndicator } from "react-native";
import colors from "tailwindcss/colors";

export function ActivityLoading () {
  return (
    <View className='flex-1 items-center justify-center bg-background'>
      <ActivityIndicator
        size={48}
        color={colors.violet[500]}
      />
    </View>
  )
}