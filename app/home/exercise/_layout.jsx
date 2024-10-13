import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function ExerciseLayout() {
    return (
        <View className="px-3 pt-7">
            <Slot />
        </View>
    );
}