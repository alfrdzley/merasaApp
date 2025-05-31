import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Untuk ikon
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'; // Untuk ikon QRIS

// Anda mungkin ingin meneruskan total belanja dari layar Cart
// Untuk contoh ini, kita gunakan nilai statis atau dari params jika ada
const DUMMY_ORDER_TOTAL = 50000; // Contoh total belanja

export default function PaymentScreen() {
    const router = useRouter();
    const params = useLocalSearchParams(); // Jika Anda mengirim total via params
    const orderTotal = params.totalAmount ? parseFloat(params.totalAmount.toString()) : DUMMY_ORDER_TOTAL;

    const [selectedMethod, setSelectedMethod] = useState<string | null>(null); // 'qris' atau 'cod'

    const handleConfirmPayment = () => {
        if (!selectedMethod) {
            alert('Please select a payment method.');
            return;
        }

        if (selectedMethod === 'qris') {
            // Logika untuk menampilkan QRIS atau memproses pembayaran QRIS
            alert(`Proceeding with QRIS payment for Rp ${orderTotal.toLocaleString('id-ID')}. (Placeholder)`);
            // Biasanya navigasi ke halaman status pesanan atau kembali ke home setelah 'pembayaran'
        } else if (selectedMethod === 'cod') {
            // Logika untuk pesanan Cash on Delivery
            alert(`Order placed with Cash on Delivery for Rp ${orderTotal.toLocaleString('id-ID')}. (Placeholder)`);
        }
        // Setelah konfirmasi, mungkin arahkan ke halaman sukses atau detail pesanan
        // Untuk contoh, kita kembali ke home
        router.replace('/(tabs)/home');
    };

    return (
        <ScrollView style={styles.screen}>
            <Stack.Screen options={{ title: 'Confirm Payment' }} />

            <View style={styles.summaryContainer}>
                <Text style={styles.summaryTitle}>Order Summary</Text>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total Amount:</Text>
                    <Text style={styles.summaryValue}>Rp {orderTotal.toLocaleString('id-ID')}</Text>
                </View>
            </View>

            <View style={styles.methodSelectionContainer}>
                <Text style={styles.methodSelectionTitle}>Select Payment Method</Text>

                <TouchableOpacity
                    style={[
                        styles.methodButton,
                        selectedMethod === 'qris' && styles.selectedMethod,
                    ]}
                    onPress={() => setSelectedMethod('qris')}>
                    <MaterialCommunityIcons name="qrcode-scan" size={28} color={selectedMethod === 'qris' ? '#fff' : '#62A8E5'} />
                    <Text style={[styles.methodButtonText, selectedMethod === 'qris' && styles.selectedMethodText]}>
                        QRIS
                    </Text>
                </TouchableOpacity>

                {selectedMethod === 'qris' && (
                    <View style={styles.qrisContainer}>
                        <Text style={styles.qrisInstruction}>
                            Scan the QR code below using your payment app:
                        </Text>
                        {/* Placeholder untuk gambar QRIS */}
                        <Image
                            source={{ uri: 'https://via.placeholder.com/200x200/000000/FFFFFF?text=Dummy+QRIS+Code' }}
                            style={styles.qrisImage}
                        />
                        <Text style={styles.qrisNote}>This is a placeholder QR code.</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={[
                        styles.methodButton,
                        selectedMethod === 'cod' && styles.selectedMethod,
                    ]}
                    onPress={() => setSelectedMethod('cod')}>
                    <FontAwesome name="money" size={28} color={selectedMethod === 'cod' ? '#fff' : '#34A853'} />
                    <Text style={[styles.methodButtonText, selectedMethod === 'cod' && styles.selectedMethodText]}>
                        Cash on Delivery (COD)
                    </Text>
                </TouchableOpacity>

                {selectedMethod === 'cod' && (
                    <View style={styles.codContainer}>
                        <Text style={styles.codInstruction}>
                            You will pay in cash when the order arrives.
                        </Text>
                        <Text style={styles.codNote}>
                            Please prepare the exact amount: Rp {orderTotal.toLocaleString('id-ID')}
                        </Text>
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={[styles.confirmButton, !selectedMethod && styles.disabledButton]}
                onPress={handleConfirmPayment}
                disabled={!selectedMethod}>
                <Text style={styles.confirmButtonText}>Confirm & Place Order</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F4F7FA',
    },
    summaryContainer: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'center',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 16,
        color: '#555',
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F',
    },
    methodSelectionContainer: {
        marginHorizontal: 16,
        marginBottom: 20,
    },
    methodSelectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    methodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    selectedMethod: {
        backgroundColor: '#62A8E5', // Warna biru untuk QRIS terpilih
        borderColor: '#62A8E5',
    },
    methodButtonText: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 15,
        color: '#333',
    },
    selectedMethodText: {
        color: '#fff',
    },
    qrisContainer: {
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    qrisInstruction: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10,
    },
    qrisImage: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    qrisNote: {
        fontSize: 12,
        color: '#777',
        fontStyle: 'italic',
    },
    codContainer: {
        padding: 15,
        backgroundColor: '#E8F5E9', // Latar belakang hijau muda untuk COD
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#C8E6C9',
    },
    codInstruction: {
        fontSize: 14,
        color: '#388E3C',
        textAlign: 'center',
        marginBottom: 5,
    },
    codNote: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
    },
    confirmButton: {
        backgroundColor: '#4CAF50', // Warna hijau untuk konfirmasi
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 30, // Memberi ruang dari bawah
        marginTop: 10,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#BDBDBD', // Warna abu-abu jika tombol dinonaktifkan
    },
});
