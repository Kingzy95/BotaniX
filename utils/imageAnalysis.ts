import { Disease, AnalysisHistory } from '@/types';
import * as FileSystem from 'expo-file-system';

// Constantes pour le stockage local
const HISTORY_FILE = `${FileSystem.documentDirectory}analysis_history.json`;
const IMAGES_DIRECTORY = `${FileSystem.documentDirectory}plant_images/`;

// Cette fonction sera remplacée par l'intégration réelle de l'IA
export const analyzePlantImage = async (imageUri: string): Promise<Disease> => {
    try {
        // Simulation d'analyse d'image
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simule le temps de traitement

        // Pour l'instant, retourne une réponse fictive
        const mockResult: Disease = {
            name: 'Mosaïque du manioc',
            symptoms: 'Motifs en mosaïque sur les feuilles, croissance ralentie, déformation des feuilles',
            treatment: 'Utiliser des boutures saines, éliminer les plants infectés, maintenir une bonne hygiène au champ'
        };

        // Sauvegarder l'analyse dans l'historique
        await saveToHistory(imageUri, mockResult);

        return mockResult;
    } catch (error) {
        console.error('Erreur lors de l\'analyse de l\'image:', error);
        throw error;
    }
};

// Fonction pour sauvegarder l'image localement
export const saveImage = async (uri: string): Promise<string> => {
    try {
        // Créer le dossier des images s'il n'existe pas
        const dirInfo = await FileSystem.getInfoAsync(IMAGES_DIRECTORY);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(IMAGES_DIRECTORY, { intermediates: true });
        }

        const filename = `plant_${Date.now()}.jpg`;
        const newPath = `${IMAGES_DIRECTORY}${filename}`;

        await FileSystem.copyAsync({
            from: uri,
            to: newPath
        });

        return newPath;
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'image:', error);
        throw error;
    }
};

// Fonction pour sauvegarder une analyse dans l'historique
export const saveToHistory = async (imageUri: string, diagnosis: Disease): Promise<void> => {
    try {
        const savedImageUri = await saveImage(imageUri);
        const newAnalysis: AnalysisHistory = {
            id: Date.now().toString(),
            imageUri: savedImageUri,
            diagnosis,
            date: new Date().toISOString()
        };

        const history = await loadAnalysisHistory();
        history.unshift(newAnalysis);

        await FileSystem.writeAsStringAsync(
            HISTORY_FILE,
            JSON.stringify(history),
            { encoding: FileSystem.EncodingType.UTF8 }
        );
    } catch (error) {
        console.error('Erreur lors de la sauvegarde dans l\'historique:', error);
        throw error;
    }
};

// Fonction pour charger l'historique des analyses
export const loadAnalysisHistory = async (): Promise<AnalysisHistory[]> => {
    try {
        const fileInfo = await FileSystem.getInfoAsync(HISTORY_FILE);

        if (!fileInfo.exists) {
            return [];
        }

        const historyData = await FileSystem.readAsStringAsync(HISTORY_FILE, {
            encoding: FileSystem.EncodingType.UTF8
        });

        return JSON.parse(historyData);
    } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
        return [];
    }
};

// Fonction pour supprimer une analyse de l'historique
export const deleteAnalysis = async (id: string): Promise<void> => {
    try {
        const history = await loadAnalysisHistory();
        const analysisToDelete = history.find(item => item.id === id);

        if (analysisToDelete) {
            // Supprimer l'image associée
            await FileSystem.deleteAsync(analysisToDelete.imageUri);

            // Mettre à jour l'historique
            const updatedHistory = history.filter(item => item.id !== id);
            await FileSystem.writeAsStringAsync(
                HISTORY_FILE,
                JSON.stringify(updatedHistory),
                { encoding: FileSystem.EncodingType.UTF8 }
            );
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'analyse:', error);
        throw error;
    }
};

// Fonction pour effacer tout l'historique
export const clearHistory = async (): Promise<void> => {
    try {
        // Supprimer toutes les images
        const dirInfo = await FileSystem.getInfoAsync(IMAGES_DIRECTORY);
        if (dirInfo.exists) {
            await FileSystem.deleteAsync(IMAGES_DIRECTORY);
        }

        // Supprimer le fichier d'historique
        const fileInfo = await FileSystem.getInfoAsync(HISTORY_FILE);
        if (fileInfo.exists) {
            await FileSystem.deleteAsync(HISTORY_FILE);
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'historique:', error);
        throw error;
    }
};

// Fonction pour vérifier l'espace de stockage disponible
export const checkStorageSpace = async (): Promise<{
    used: number;
    total: number;
}> => {
    try {
        let totalSize = 0;

        // Calculer la taille des images
        const dirInfo = await FileSystem.getInfoAsync(IMAGES_DIRECTORY);
        if (dirInfo.exists) {
            const images = await FileSystem.readDirectoryAsync(IMAGES_DIRECTORY);
            for (const image of images) {
                const imageInfo = await FileSystem.getInfoAsync(`${IMAGES_DIRECTORY}${image}`);
                if (imageInfo.exists && 'size' in imageInfo) {
                    totalSize += imageInfo.size;
                }
            }
        }

        // Ajouter la taille du fichier d'historique
        const historyInfo = await FileSystem.getInfoAsync(HISTORY_FILE);
        if (historyInfo.exists && 'size' in historyInfo) {
            totalSize += historyInfo.size;
        }

        return {
            used: totalSize,
            total: 1024 * 1024 * 100 // 100MB limite arbitraire
        };
    } catch (error) {
        console.error('Erreur lors de la vérification de l\'espace de stockage:', error);
        throw error;
    }
};