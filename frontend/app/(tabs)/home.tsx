import React from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';

const { width } = Dimensions.get('window');
const productCardWidth = (width - 48) / 2; // 16 padding kiri + 16 padding kanan + 16 padding antar item

// Define ProductType interface
interface ProductType {
    id: string;
    name: string;
    price: string;
    image: string;
    sizes?: string[];
}

// Data Dummy
const categories = [
    { id: '1', name: 'COFFEE', icon: <FontAwesome name="coffee" size={16} color="#666" /> },
    { id: '2', name: 'NON-COFFEE', icon: <MaterialIcons name="local-drink" size={16} color="#666" /> },
];

const products: ProductType[] = [
    {
        id: '1',
        name: 'Cappuccino',
        price: '18k',
        image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=Cappuccino', // Ganti dengan URL gambar Anda
        sizes: ['S', 'M', 'L'],
    },
    {
        id: '2',
        name: 'Espresso',
        price: '10k',
        image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=Espresso', // Ganti dengan URL gambar Anda
    },
    {
        id: '3',
        name: 'Americano',
        price: '10k',
        image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=Americano', // Ganti dengan URL gambar Anda
        sizes: ['L'],
    },
    {
        id: '4',
        name: 'Latte',
        price: '18k',
        image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=Latte', // Ganti dengan URL gambar Anda
        sizes: ['S', 'M', 'L'],
    },
    {
        id: '5',
        name: 'Mocha',
        price: '20k',
        image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=Mocha', // Ganti dengan URL gambar Anda
        sizes: ['M', 'L'],
    },
];

// Komponen Kartu Produk
const ProductCard = ({ item }: { item: ProductType }) => {
    return (
        <Link
            href={{
                pathname: "/product/[id]",
                params: { id: item.id, name: item.name, price: item.price, image: item.image }
            }}
            asChild
        >
            <TouchableOpacity style={styles.productCard}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <TouchableOpacity style={styles.favoriteIconOnCard} onPress={() => console.log('Favorite toggled for:', item.name)}>
                    <FontAwesome name="heart-o" size={18} color="#888" />
                </TouchableOpacity>
                <Text style={styles.productName}>{item.name}</Text>
                {item.sizes && (
                    <View style={styles.sizeContainer}>
                        {item.sizes.includes('S') && <Text style={styles.sizeText}>S</Text>}
                        {item.sizes.includes('M') && <Text style={styles.sizeText}>M</Text>}
                        {item.sizes.includes('L') && <Text style={styles.sizeText}>L</Text>}
                    </View>
                )}
                <View style={styles.productFooter}>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => console.log('Added to cart (from card):', item.name)}>
                        <FontAwesome name="plus" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Link>
    );
};


export default function HomeScreen() {
    return (
        <View style={styles.screen}>
            <View style={styles.headerBackground}>
                <View style={styles.headerTop}>
                    <View style={styles.locationContainer}>
                        <FontAwesome name="map-marker" size={20} color="#fff" />
                        <Text style={styles.locationText}>PPU, Kalimantan Timur</Text>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome name="phone" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.searchContainer}>
                    <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#888"
                        style={styles.searchInput}
                    />
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.mainContent}>
                <Text style={styles.categoriesTitle}>Categories</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <TouchableOpacity key={category.id} style={styles.categoryButton}>
                            {category.icon}
                            <Text style={styles.categoryText}>{category.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <FlatList
                    data={products}
                    renderItem={({ item }) => <ProductCard item={item} />}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.productList}
                    scrollEnabled={false} // Karena sudah di dalam ScrollView utama
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F4F7FA',
    },
    headerBackground: {
        backgroundColor: '#62A8E5',
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    mainContent: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    categoriesTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 20,
        marginBottom: 15,
    },
    categoriesContainer: {
        paddingBottom: 10, // Memberi ruang jika ada shadow
        marginBottom:10,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    categoryText: {
        marginLeft: 8,
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    productList: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: productCardWidth,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    favoriteIconOnCard: {
        position: 'absolute',
        top: 18,
        right: 18,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 5,
        borderRadius: 15,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    sizeContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    sizeText: {
        fontSize: 10,
        color: '#777',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 5,
        marginRight: 4,
        overflow: 'hidden',
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    addButton: {
        backgroundColor: '#62A8E5',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 50,
    },
});
