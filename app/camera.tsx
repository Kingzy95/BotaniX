import { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>
                    Nous avons besoin de votre permission pour utiliser la caméra
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>Autoriser la caméra</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        console.log("Tentative de prise de photo...");
        if (!cameraRef.current) {
            console.log("Pas de référence à la caméra!");
            return;
        }

        try {
            console.log("Prise de photo en cours...");
            const photo = await cameraRef.current.takePictureAsync();
            console.log("Photo prise!", photo);

            if (photo?.uri) {
                console.log("Navigation vers les résultats avec l'URI:", photo.uri);
                // Essayons une navigation différente
                try {
                    await router.replace({
                        pathname: "/results",
                        params: { imageUri: photo.uri }
                    });
                } catch (navError) {
                    console.error("Erreur de navigation:", navError);
                    // Plan B : Navigation alternative
                    router.navigate({
                        pathname: "/results",
                        params: { imageUri: photo.uri }
                    });
                }
            }
        } catch (e) {
            console.error('Erreur lors de la prise de photo:', e);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing={facing}
                onMountError={(error) => {
                    console.error("Erreur de montage de la caméra:", error);
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.flipButton}
                        onPress={toggleCameraFacing}
                    >
                        <Ionicons name="camera-reverse" size={24} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={takePicture}
                    >
                        <View style={styles.captureCircle} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    message: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 20,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    flipButton: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 50,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'transparent',
        borderWidth: 6,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureCircle: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: 'white',
    },
    closeButton: {
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 50,
    },
    button: {
        padding: 15,
        backgroundColor: '#2F9E44',
        borderRadius: 8,
        margin: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600',
    },
});