import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, Link } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Contoh ikon

const DUMMY_LOGGED_IN_USER = {
    id: 'usr_001',
    username: 'MerasaTester',
    email: 'tester@merasa.app',
};



// Placeholder untuk status autentikasi
// Dalam aplikasi nyata, ini akan datang dari Context, AsyncStorage, dll.
const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // SIMULASI: Anggap pengguna sudah login
                const simulateLoggedIn = true; // Ganti ini menjadi false untuk tes belum login

                if (simulateLoggedIn) {
                    setIsLoggedIn(true);
                    setUsername(DUMMY_LOGGED_IN_USER.username);
                } else {
                    setIsLoggedIn(false);
                    setUsername(null);
                }

                // Simulasi delay untuk loading
                setTimeout(() => {
                    setIsLoading(false);
                }, 1500);

            } catch (e) {
                console.error("Auth check failed", e);
                setIsLoading(false);
                setIsLoggedIn(false);
            }
        };

        checkAuthStatus();
    }, []);

    return { isLoading, isLoggedIn, username };
};



export default function WelcomeScreen() {
    const router = useRouter();
    const { isLoading, isLoggedIn, username } = useAuth();

    useEffect(() => {
        if (!isLoading && isLoggedIn) {
            // Jika sudah login dan loading selesai, arahkan ke home
            const timer = setTimeout(() => {
                router.replace('/(tabs)/home');
            }, 1500); // Delay untuk pesan "Welcome back"
            return () => clearTimeout(timer);
        }
    }, [isLoading, isLoggedIn, router]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#62A8E5" />
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (isLoggedIn) {
        return (
            <View style={styles.container}>
                <FontAwesome name="check-circle" size={80} color="#4CAF50" style={styles.icon} />
                <Text style={styles.title}>Welcome back, {username || 'User'}!</Text>
                <Text style={styles.subtitle}>Redirecting you to the app...</Text>
            </View>
        );
    }

    // Jika belum login
    return (
        <View style={styles.container}>
            <FontAwesome name="coffee" size={80} color="#62A8E5" style={styles.icon} />
            <Text style={styles.title}>Welcome to MerasaApp!</Text>
            <Text style={styles.subtitle}>Discover the best coffee and more around you.</Text>
            <Link href="/(auth)/login" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4F7FA',
    },
    icon: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#62A8E5',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    }
});
