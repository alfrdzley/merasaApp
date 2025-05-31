import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView} from 'react-native';
import {Link, useRouter} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function RegisterScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Registration Failed", "Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Registration Failed", "Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Registration Failed", "Password must be at least 6 characters long.");
            return;
        }
        // TODO: Implementasi logika register dengan backend
        console.log("Attempting registration with:", {username, email, password});
        Alert.alert(
            "Registration Successful (Placeholder)",
            "Your account has been created. Please login.",
            [{text: "OK", onPress: () => router.replace('/(auth)/login')}]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and start your culinary journey!</Text>

            <View style={styles.inputContainer}>
                <FontAwesome name="user" size={20} color="#888" style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#aaa"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome name="envelope" size={20} color="#888" style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
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

            <View style={styles.inputContainer}>
                <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon}/>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#aaa"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <Link href="/(auth)/login" asChild>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Login</Text>
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
    registerButton: {
        backgroundColor: '#4CAF50', // Warna berbeda untuk register
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        marginTop: 10,
    },
    registerButtonText: {
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
