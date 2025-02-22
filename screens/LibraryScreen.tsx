import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Library'>;

const diseaseCategories = [
    {
        id: '1',
        title: 'Maladies du Manioc',
        diseases: [
            { id: '1', name: 'Mosaïque du manioc' },
            { id: '2', name: 'Bactériose du manioc' },
        ]
    },
    {
        id: '2',
        title: 'Maladies du Maïs',
        diseases: [
            { id: '1', name: 'Mildiou du maïs' },
            { id: '2', name: 'Rouille du maïs' },
        ]
    },
    // Ajoutez d'autres catégories selon les besoins
];

const LibraryScreen: React.FC<Props> = ({ navigation }) => {
    const renderCategory = ({ item }: any) => (
        <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <View style={styles.diseaseList}>
                {item.diseases.map((disease: any) => (
                    <TouchableOpacity
                        key={disease.id}
                        style={styles.diseaseItem}
                        onPress={() => navigation.navigate('DiseaseDetail', { disease })}
                    >
                        <Ionicons name="leaf" size={24} color="#2F9E44" />
                        <Text style={styles.diseaseName}>{disease.name}</Text>
                        <Ionicons name="chevron-forward" size={24} color="#666" />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={diseaseCategories}
                renderItem={renderCategory}
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
    categoryContainer: {
        marginBottom: 24,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    diseaseList: {
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    diseaseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    diseaseName: {
        flex: 1,
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
    },
});

export default LibraryScreen;