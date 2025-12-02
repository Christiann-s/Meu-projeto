import Constants from 'expo-constants';

// Detecta o IP automaticamente
const host = Constants.expoConfig?.hostUri;
const IP = host ? host.split(':')[0] : "localhost";

export const API_URL = " 192.168.18.5";
