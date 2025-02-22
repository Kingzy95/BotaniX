// src/types/index.ts
export interface Disease {
    name: string;
    symptoms: string;
    treatment: string;
}

export interface DiagnoseResult {
    name: string;
    symptoms: string;
    treatment: string;
}

export interface AnalysisHistory {
    id: string;
    imageUri: string;
    diagnosis: Disease;
    date: string;
}

export type RootStackParamList = {
    Home: undefined;
    Camera: undefined;
    Results: { imageUri: string };
    Library: undefined;
    DiseaseDetail: { disease: Disease };
    Settings: undefined;
    Alerts: undefined;
};