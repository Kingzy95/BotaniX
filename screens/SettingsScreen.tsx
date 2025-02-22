import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen: React.FC<Props> = () => {
    const [offlineMode, setOfflineMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [locationServices, setLocationServices] = useState(true);

    const clearData = () => {
        Alert.alert(
            'Effacer les données',
            'Êtes-vous sûr de vouloir effacer toutes les données ? Cette action est irréversible.',
            [
                {
                    text: 'Annuler',
                    style: 'cancel',
                },
                {
                    text: 'Effacer',
                    style: 'destructive',
                    onPress: () => {
                        // Implémenter la logique de suppression des données
                    },
                },
            ]
        );
    };

    const renderSettingItem = (
        title: string,
        description: string,
        value: boolean,
        onValueChange: (value: boolean) => void,
        icon: string
    ) => (
        <View style={styles.settingItem}>
            <Ionicons name={icon as any} size={24} color="#2F9E44" style={styles.settingIcon} />
            <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{title}</Text>
                <Text style={styles.settingDescription}>{description}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#767577', true: '#86efac' }}
                thumbColor={value ? '#2F9E44' : '#f4f3f4'}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {renderSettingItem(
                'Mode hors ligne',
                'Télécharger les données pour une utilisation sans connexion',
                offlineMode,
                setOfflineMode,
                'cloud-offline'
            )}

            {renderSettingItem(
                'Notifications',
                'Recevoir des alertes et des conseils',
                notifications,
                setNotifications,
                'notifications'
            )}

            {renderSettingItem(
                'Services de localisation',
                'Améliorer les recommandations basées sur votre région',
                locationServices,
                setLocationServices,
                'location'
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Compte et données</Text>

                <TouchableOpacity style={styles.button} onPress={clearData}>
                    <Ionicons name="trash" size={24} color="#dc2626" />
                    <Text style={styles.buttonTextRed}>Effacer toutes les données</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>À propos</Text>
                <Text style={styles.version}>Version 1.0.0</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    settingIcon: {
        marginRight: 16,
    },
    settingContent: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    settingDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    section: {
        marginTop: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fee2e2',
        borderRadius: 8,
    },
    buttonTextRed: {
        color: '#dc2626',
        fontSize: 16,
        marginLeft: 12,
    },
    version: {
        fontSize: 14,
        color: '#666',
    },
});

export default SettingsScreen;