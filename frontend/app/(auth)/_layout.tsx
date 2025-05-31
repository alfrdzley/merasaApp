import React from 'react';
import {Stack} from 'expo-router';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#62A8E5', // Warna header
                },
                headerTintColor: '#fff', // Warna teks header
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: false, // Sembunyikan teks "Back" di iOS jika diinginkan
            }}
        >
            <Stack.Screen name="login" options={{title: 'Login'}}/>
            <Stack.Screen name="register" options={{title: 'Create Account'}}/>
        </Stack>
    );
}
