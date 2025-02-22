import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Disease } from '@/types';
import {
    analyzePlantImage,
    loadAnalysisHistory,
    deleteAnalysis,
    clearHistory
} from '@/utils/imageAnalysis';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC<Props> = ({ route, navigation }) => {
    const { imageUri } = route.params;
    const [isAnalyzing, setIsAnalyzing] = useState(true);
    const [result, setResult] = useState<Disease | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const analyzeImage = async () => {
            try {
                const analysisResult = await analyzePlantImage(imageUri);
                setResult(analysisResult);
            } catch (e) {
                setError('Erreur lors de l\'analyse de l\'image');
            } finally {
                setIsAnalyzing(false);
            }
        };

        analyzeImage();
    }, [imageUri]);

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="cover"
            />

            {isAnalyzing ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Analyse en cours...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText}>Réessayer</Text>
                    </TouchableOpacity>
                </View>
            ) : result ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.diagnosisTitle}>{result.name}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Symptômes</Text>
                        <Text style={styles.sectionText}>{result.symptoms}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Traitement recommandé</Text>
                        <Text style={styles.sectionText}>{result.treatment}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonText}>Retour à l'accueil</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </ScrollView>
    );
};

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
    errorContainer: {
        padding: 20,
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#dc2626',
        marginBottom: 20,
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

export default ResultsScreen;