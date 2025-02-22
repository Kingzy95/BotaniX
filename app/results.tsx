import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ResultsScreen() {
    const { imageUri } = useLocalSearchParams();
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    useEffect(() => {
        // Simuler une analyse
        const timer = setTimeout(() => {
            setIsAnalyzing(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!imageUri) {
        return (
            <View style={styles.container}>
                <Text>Aucune image à analyser</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.back()}
                >
                    <Text style={styles.buttonText}>Retour</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: imageUri as string }}
                style={styles.image}
                resizeMode="cover"
            />

            {isAnalyzing ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Analyse en cours...</Text>
                </View>
            ) : (
                <View style={styles.resultContainer}>
                    <Text style={styles.diagnosisTitle}>Mosaïque du manioc</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Symptômes</Text>
                        <Text style={styles.sectionText}>
                            Motifs en mosaïque sur les feuilles, croissance ralentie, déformation des feuilles
                        </Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Traitement recommandé</Text>
                        <Text style={styles.sectionText}>
                            Utiliser des boutures saines, éliminer les plants infectés, maintenir une bonne hygiène au champ
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/(tabs)")}
                    >
                        <Text style={styles.buttonText}>Retour à l'accueil</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 300,
    },
    loadingContainer: {
        padding: 20,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        color: '#666',
    },
    resultContainer: {
        padding: 20,
    },
    diagnosisTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2F9E44',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
    button: {
        backgroundColor: '#2F9E44',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});