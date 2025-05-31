import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import {Link, useRouter} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Login Failed", "Please enter both email and password.");
            return;
        }
        // TODO: Implementasi logika login dengan backend
        console.log("Attempting login with:", {email, password});
        // Jika login berhasil:
        // 1. Simpan token/sesi pengguna
        // 2. Panggil fungsi untuk update status auth global (misal, dari Context)
        // 3. Arahkan ke halaman utama
        Alert.alert(
            "Login Successful (Placeholder)",
            "Welcome back!",
            [{text: "OK", onPress: () => router.replace('/(tabs)/home')}]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to continue your journey.</Text>

            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={20} color="#888" style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder="Email or Username"
                    placeholderTextColor="#aaa"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.forgotPasswordButton}
                              onPress={() => Alert.alert("Forgot Password", "Navigation to forgot password screen (placeholder).")}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Link href="/(auth)/register" asChild>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Register</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4F7FA',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        marginBottom: 15,
        width: '100%',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#333',
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#62A8E5',
    },
    loginButton: {
        backgroundColor: '#62A8E5',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 16,
        color: '#666',
    },
    linkText: {
        fontSize: 16,
        color: '#62A8E5',
        fontWeight: 'bold',
    },
});
