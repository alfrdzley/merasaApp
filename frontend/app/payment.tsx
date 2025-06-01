import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Stack, useRouter} from 'expo-router';

export default function PaymentScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Payment Process'}}/>
            <Text style={styles.title}>Payment Screen</Text>
            <Text style={styles.subtitle}>
                Implement your payment process details here.
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => router.replace('/(tabs)/home')}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#62A8E5',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
