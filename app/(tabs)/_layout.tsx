import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#2F9E44',
                },
                headerTintColor: '#fff',
                tabBarActiveTintColor: '#2F9E44',
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'BotaniX',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: 'Bibliothèque',
                    tabBarIcon: ({ color }) => <Ionicons name="book" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="alerts"
                options={{
                    title: 'Alertes',
                    tabBarIcon: ({ color }) => <Ionicons name="alert-circle" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Paramètres',
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}