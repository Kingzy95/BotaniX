import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

export default function RootLayout() {
    useEffect(() => {
        LogBox.ignoreLogs(['Warning: ...']); // Ignorer les avertissements non critiques
    }, []);

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="camera"
                options={{
                    presentation: 'fullScreenModal',
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="results"
                options={{
                    presentation: 'card',
                    headerShown: true,
                    headerTitle: "Résultat de l'analyse",
                    headerStyle: {
                        backgroundColor: '#2F9E44',
                    },
                    headerTintColor: '#fff',
                }}
            />
        </Stack>
    );
}