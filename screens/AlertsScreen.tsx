import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Alerts'>;

interface Alert {
    id: string;
    title: string;
    description: string;
    type: 'weather' | 'disease' | 'tip';
    date: string;
    isRead: boolean;
}

const mockAlerts: Alert[] = [
    {
        id: '1',
        title: 'Risque de maladie élevé',
        description: 'Les conditions météorologiques actuelles favorisent le développement du mildiou. Surveillez vos cultures.',
        type: 'disease',
        date: '2024-02-22',
        isRead: false,
    },
    {
        id: '2',
        title: 'Conseil de saison',
        description: 'C\'est le moment idéal pour planter le manioc. Assurez-vous d\'utiliser des boutures saines.',
        type: 'tip',
        date: '2024-02-21',
        isRead: true,
    },
];

const AlertsScreen: React.FC<Props> = () => {
    const getIconName = (type: Alert['type']) => {
        switch (type) {
            case 'weather':
                return 'cloud';
            case 'disease':
                return 'warning';
            case 'tip':
                return 'bulb';
            default:
                return 'information-circle';
        }
    };

    const renderAlert = ({ item }: { item: Alert }) => (
        <TouchableOpacity
            style={[
                styles.alertItem,
                !item.isRead && styles.unreadAlert
            ]}
        >
            <View style={styles.alertIconContainer}>
                <Ionicons
                    name={getIconName(item.type)}
                    size={24}
                    color={item.type === 'disease' ? '#dc2626' : '#2F9E44'}
                />
            </View>
            <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>{item.title}</Text>
                <Text style={styles.alertDescription}>{item.description}</Text>
                <Text style={styles.alertDate}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={mockAlerts}
                renderItem={renderAlert}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 16,
    },
    alertItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    unreadAlert: {
        backgroundColor: '#f0fdf4',
    },
    alertIconContainer: {
        marginRight: 16,
        justifyContent: 'center',
    },
    alertContent: {
        flex: 1,
    },
    alertTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    alertDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    alertDate: {
        fontSize: 12,
        color: '#999',
    },
});

export default AlertsScreen;