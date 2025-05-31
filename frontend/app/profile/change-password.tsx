import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ChangePasswordScreen() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New password and confirm password do not match.");
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert("Error", "New password must be at least 6 characters long.");
            return;
        }

        // Placeholder untuk logika ubah password
        console.log({ currentPassword, newPassword });
        Alert.alert(
            "Success",
            "Password change request submitted (placeholder).",
            [{ text: "OK", onPress: () => router.back() }]
        );
        // Di sini Anda akan memanggil API untuk mengubah password
        // Setelah berhasil, arahkan pengguna kembali atau ke halaman login
    };

    return (
        <View style={styles.container}>
        <Stack.Screen options={{ title: 'Change Password' }} />

    <Text style={styles.label}>Current Password</Text>
    <View style={styles.inputContainer}>
    <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon} />
    <TextInput
    style={styles.input}
    placeholder="Enter current password"
    placeholderTextColor="#aaa"
    secureTextEntry
    value={currentPassword}
    onChangeText={setCurrentPassword}
    />
    </View>

    <Text style={styles.label}>New Password</Text>
    <View style={styles.inputContainer}>
    <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon} />
    <TextInput
    style={styles.input}
    placeholder="Enter new password"
    placeholderTextColor="#aaa"
    secureTextEntry
    value={newPassword}
    onChangeText={setNewPassword}
    />
    </View>

    <Text style={styles.label}>Confirm New Password</Text>
    <View style={styles.inputContainer}>
    <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon} />
    <TextInput
    style={styles.input}
    placeholder="Confirm new password"
    placeholderTextColor="#aaa"
    secureTextEntry
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    />
    </View>

    <TouchableOpacity style={styles.submitButton} onPress={handleChangePassword}>
    <Text style={styles.submitButtonText}>Save Changes</Text>
    </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F4F7FA',
    },
    label: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        marginTop: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        marginBottom: 10,
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
    submitButton: {
        backgroundColor: '#62A8E5',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 30,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
