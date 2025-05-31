import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Link} from 'expo-router';

// Tipe data untuk item di keranjang
interface CartItem {
    id: string;
    name: string;
    price: number; // Simpan harga sebagai angka untuk kalkulasi
    image: string;
    quantity: number;
}

// Data Dummy Awal untuk Keranjang
const initialCartItems: CartItem[] = [
    {
        id: '1',
        name: 'Cappuccino',
        price: 18000,
        image: 'https://via.placeholder.com/100/A9A9A9/FFFFFF?text=Cappuccino',
        quantity: 2,
    },
    {
        id: '2',
        name: 'Espresso',
        price: 10000,
        image: 'https://via.placeholder.com/100/A9A9A9/FFFFFF?text=Espresso',
        quantity: 1,
    },
];

// Komponen untuk setiap item di keranjang
const CartItemCard = ({item, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem}: {
    item: CartItem;
    onIncreaseQuantity: (id: string) => void;
    onDecreaseQuantity: (id: string) => void;
    onRemoveItem: (id: string) => void;
}) => {
    return (
        <View style={styles.cartItem}>
            <Image source={{uri: item.image}} style={styles.itemImage}/>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => onDecreaseQuantity(item.id)} style={styles.quantityButton}>
                        <FontAwesome name="minus" size={14} color="#333"/>
                    </TouchableOpacity>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => onIncreaseQuantity(item.id)} style={styles.quantityButton}>
                        <FontAwesome name="plus" size={14} color="#333"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemActions}>
                <Text style={styles.itemTotalPrice}>
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </Text>
                <TouchableOpacity onPress={() => onRemoveItem(item.id)} style={styles.removeItemButton}>
                    <FontAwesome name="trash" size={20} color="#FF6B6B"/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        // Kalkulasi subtotal setiap kali cartItems berubah
        const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(newSubtotal);
    }, [cartItems]);

    const handleIncreaseQuantity = (itemId: string) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const handleDecreaseQuantity = (itemId: string) => {
        setCartItems(prevItems =>
                prevItems
                    .map(item =>
                        item.id === itemId ? {...item, quantity: Math.max(1, item.quantity - 1)} : item
                    )
            // Anda bisa memilih untuk menghapus item jika kuantitas mencapai 0,
            // atau biarkan minimal 1 dan gunakan tombol hapus terpisah.
            // .filter(item => item.quantity > 0)
        );
    };

    const handleRemoveItem = (itemId: string) => {
        Alert.alert(
            "Remove Item",
            "Are you sure you want to remove this item from your cart?",
            [
                {text: "Cancel", style: "cancel"},
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => setCartItems(prevItems => prevItems.filter(item => item.id !== itemId))
                }
            ]
        );
    };

    if (cartItems.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <MaterialIcons name="remove-shopping-cart" size={60} color="#ccc"/>
                <Text style={styles.emptyText}>Your cart is empty.</Text>
                <Link href="/home" asChild>
                    <TouchableOpacity style={styles.browseButton}>
                        <Text style={styles.browseButtonText}>Shop Now</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            {/* Judul layar di-handle oleh Tabs layout */}
            {/* <Stack.Screen options={{ title: 'My Cart' }} /> */}

            <FlatList
                data={cartItems}
                renderItem={({item}) => (
                    <CartItemCard
                        item={item}
                        onIncreaseQuantity={handleIncreaseQuantity}
                        onDecreaseQuantity={handleDecreaseQuantity}
                        onRemoveItem={handleRemoveItem}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                ListFooterComponent={
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryText}>Subtotal:</Text>
                            <Text style={styles.summaryPrice}>Rp {subtotal.toLocaleString('id-ID')}</Text>
                        </View>
                        {/* Tambahkan biaya lain jika ada */}
                        {/* <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Delivery Fee:</Text>
              <Text style={styles.summaryPrice}>Rp 10,000</Text>
            </View> */}
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={[styles.summaryText, styles.totalText]}>Total:</Text>
                            <Text style={[styles.summaryPrice, styles.totalText]}>
                                Rp {subtotal.toLocaleString('id-ID')} {/* Ganti dengan total akhir jika ada biaya lain */}
                            </Text>
                        </View>
                        <Link href={{pathname: "/payment", params: {totalAmount: subtotal}}} asChild>
                            <TouchableOpacity style={styles.checkoutButton}>
                                <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F4F7FA',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 20,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
    },
    itemImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#E0E0E0',
        padding: 8,
        borderRadius: 5,
    },
    itemQuantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 15,
    },
    itemActions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        minHeight: 70, // Agar align dengan tinggi gambar + detail
    },
    itemTotalPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
    },
    removeItemButton: {
        padding: 5,
    },
    summaryContainer: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryText: {
        fontSize: 16,
        color: '#555',
    },
    summaryPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 10,
        marginTop: 5,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D32F2F', // Warna berbeda untuk total
    },
    checkoutButton: {
        backgroundColor: '#62A8E5',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F4F7FA',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    browseButton: {
        backgroundColor: '#62A8E5',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    browseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
