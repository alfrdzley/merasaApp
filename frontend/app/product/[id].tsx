import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const dummyProductDetails = {
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

export default function ProductDetailScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { id, name, price, image } = params;

    if (!id || !name || !price || !image) {
        return (
            <View style={styles.container}>
                <Text>Product data not found.</Text>
            </View>
        );
    }

    const handleAddToCart = () => {
        Alert.alert("Add to Cart", `${name} has been added to your cart.`);
    };

    const handleAddToFavorites = () => {
        Alert.alert("Add to Favorites", `${name} has been added to your favorites.`);
    };

    return (
        <ScrollView style={styles.screen}>
            <Stack.Screen options={{ title: name ? name.toString() : 'Product Detail' }} />
            <Image source={{ uri: image ? image.toString() : 'https://via.placeholder.com/300' }} style={styles.productImage} />

            <View style={styles.detailsContainer}>
                <View style={styles.titleAndFavorite}>
                    <Text style={styles.productName}>{name}</Text>
                    <TouchableOpacity onPress={handleAddToFavorites} style={styles.favoriteButton}>
                        <FontAwesome name="heart-o" size={24} color="#FF6B6B" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.productPrice}>{price}</Text>

                <Text style={styles.descriptionHeader}>Description</Text>
                <Text style={styles.productDescription}>
                    {dummyProductDetails.description}
                </Text>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <MaterialIcons name="add-shopping-cart" size={24} color="#fff" />
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 20,
    },
    titleAndFavorite: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    productName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    favoriteButton: {
        padding: 8,
    },
    productPrice: {
        fontSize: 22,
        fontWeight: '600',
        color: '#4CAF50',
        marginBottom: 20,
    },
    descriptionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    addToCartButton: {
        backgroundColor: '#62A8E5',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderRadius: 30,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
