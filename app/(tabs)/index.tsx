import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Disease, DiagnoseResult } from '@/types';

type RootStackParamList = {
    Home: undefined;
    Camera: undefined;
    Results: { result: DiagnoseResult };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const commonDiseases: Record<string, Disease> = {
    'mosaique_manioc': {
        name: 'Mosaïque du manioc',
        symptoms: 'Motifs en mosaïque sur les feuilles, croissance ralentie',
        treatment: 'Utiliser des boutures saines, éliminer les plants infectés',
    },
    'mildiou_mais': {
        name: 'Mildiou du maïs',
        symptoms: 'Taches grises ou brunes sur les feuilles',
        treatment: 'Rotation des cultures, application de fongicides naturels',
    }
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [isOffline, setIsOffline] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('camera');
    const [diagnoseResult, setDiagnoseResult] = useState<DiagnoseResult | null>(null);

    const handleCameraPress = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            navigation.navigate('Camera');
        } else {
            alert('Permission de caméra nécessaire pour cette fonctionnalité');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>BotaniX</Text>
                {isOffline && (
                    <View style={styles.offlineAlert}>
                        <Text style={styles.offlineText}>Mode hors ligne actif</Text>
                    </View>
                )}
            </View>

            {/* Main Content */}
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={handleCameraPress}
                >
                    <Ionicons name="camera" size={48} color="#666" />
                    <Text style={styles.cameraText}>Appuyez pour prendre une photo</Text>
                </TouchableOpacity>
            </View>

            {/* Navigation Bar */}
            <View style={styles.navbar}>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setActiveTab('camera')}
                >
                    <Ionicons
                        name="camera"
                        size={24}
                        color={activeTab === 'camera' ? '#2F9E44' : '#666'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setActiveTab('library')}
                >
                    <Ionicons
                        name="book"
                        size={24}
                        color={activeTab === 'library' ? '#2F9E44' : '#666'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setActiveTab('alerts')}
                >
                    <Ionicons
                        name="alert-circle"
                        size={24}
                        color={activeTab === 'alerts' ? '#2F9E44' : '#666'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => setActiveTab('settings')}
                >
                    <Ionicons
                        name="settings"
                        size={24}
                        color={activeTab === 'settings' ? '#2F9E44' : '#666'}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#2F9E44',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    offlineAlert: {
        backgroundColor: '#FEF3C7',
        marginTop: 8,
        padding: 8,
        borderRadius: 4,
    },
    offlineText: {
        color: '#92400E',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    cameraButton: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 32,
        alignItems: 'center',
    },
    cameraText: {
        marginTop: 16,
        color: '#666',
    },
    navbar: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingVertical: 8,
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        padding: 8,
    },
});

export default HomeScreen;