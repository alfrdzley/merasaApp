import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';

// Data Pengguna Dummy
const DUMMY_USER = {
    username: 'Alfrdz',
    email: 'alfrdz@example.com',
    phoneNumber: '+62 812 3456 7890',
};

interface ProfileInfoRowProps {
    icon: keyof typeof FontAwesome.glyphMap; // More specific type for FontAwesome icon names
    label: string;
    value: string;
}

const ProfileInfoRow = ({ icon, label, value }: ProfileInfoRowProps) => (
    <View style={styles.infoRow}>
        <FontAwesome name={icon} size={20} color="#555" style={styles.infoIcon} />
        <View>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

export default function ProfileScreen() {
    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: () => {
                        console.log("User logged out");
                        // Implementasi logika logout: clear token, redirect ke login screen
                        // router.replace('/login'); // Contoh
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.screen}>
            {/* Judul "Profile" sudah diatur di (tabs)/_layout.tsx */}
            {/* <Stack.Screen options={{ title: 'My Profile' }} /> */}

            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <FontAwesome name="user-circle" size={80} color="#62A8E5" />
                </View>
                <Text style={styles.username}>{DUMMY_USER.username}</Text>
                <Text style={styles.email}>{DUMMY_USER.email}</Text>
            </View>

            <View style={styles.infoSection}>
                <ProfileInfoRow icon="envelope" label="Email" value={DUMMY_USER.email} />
                <ProfileInfoRow icon="phone" label="Phone Number" value={DUMMY_USER.phoneNumber} />
            </View>

            <View style={styles.actionsSection}>
                <Link href="/profile/change-password" asChild>
                    <TouchableOpacity style={styles.actionButton}>
                        <MaterialIcons name="lock-outline" size={24} color="#444" style={styles.actionIcon} />
                        <Text style={styles.actionText}>Change Password</Text>
                        <FontAwesome name="chevron-right" size={16} color="#ccc" />
                    </TouchableOpacity>
                </Link>

                {/* Tambahkan action lain jika perlu */}
                <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert("Edit Profile", "Navigation to edit profile screen.")}>
                    <MaterialIcons name="edit" size={24} color="#444" style={styles.actionIcon} />
                    <Text style={styles.actionText}>Edit Profile</Text>
                    <FontAwesome name="chevron-right" size={16} color="#ccc" />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={24} color="#D32F2F" style={styles.actionIcon} />
                    <Text style={[styles.actionText, styles.logoutText]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F4F7FA',
    },
    header: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 10,
    },
    avatarContainer: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#E9F5FF'
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#777',
    },
    infoSection: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop:10,
        marginBottom: 10,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    infoRowLast: { // This style is defined but not used, consider removing if not needed
        borderBottomWidth: 0,
    },
    infoIcon: {
        marginRight: 20,
        width: 24, // Untuk alignment
        textAlign: 'center',
    },
    infoLabel: {
        fontSize: 13,
        color: '#888',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    actionsSection: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop:10,
        marginBottom: 20,
        paddingVertical: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    actionButtonLast: { // This style is defined but not used, consider removing if not needed
        borderBottomWidth: 0,
    },
    actionIcon: {
        marginRight: 15,
    },
    actionText: {
        flex: 1,
        fontSize: 16,
        color: '#444',
        fontWeight:'500'
    },
    logoutButton: {
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#D32F2F',
    },
});
