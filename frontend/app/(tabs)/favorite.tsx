import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
    Alert,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link} from 'expo-router';

const {width} = Dimensions.get('window');
const productCardWidth = (width - 48) / 2;

interface ProductType {
    id: string;
    name: string;
    price: string;
    image: string;
    sizes?: string[];
    isFavorite?: boolean;
}

const favoriteProducts: ProductType[] = [
    {
        id: '1',
        name: 'Cappuccino',
        price: '18k',
        image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=CappuccinoFav',
        sizes: ['S', 'M', 'L'],
        isFavorite: true,
    },
    {
        id: '4',
        name: 'Latte',
        price: '18k',
        image: 'https://via.placeholder.com/150/A9A9A9/FFFFFF?text=LatteFav',
        sizes: ['S', 'M', 'L'],
        isFavorite: true,
    },
];

const FavoriteProductCard = ({item}: { item: ProductType }) => {
    const handleRemoveFavorite = () => {
        Alert.alert("Remove Favorite", `"${item.name}" would be removed from favorites.`);
    };

    return (
        <Link
            href={{
                pathname: "/product/[id]",
                params: {id: item.id, name: item.name, price: item.price, image: item.image}
            }}
            asChild
        >
            <TouchableOpacity style={styles.productCard}>
                <Image source={{uri: item.image}} style={styles.productImage}/>
                <TouchableOpacity style={styles.favoriteIconOnCard} onPress={handleRemoveFavorite}>
                    <FontAwesome name="heart" size={18} color="#FF6B6B"/>
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
                    <Link
                        href={{
                            pathname: "/product/[id]",
                            params: {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                image: item.image,
                                openAddToCart: 'true'
                            }
                        }}
                        asChild
                    >
                        <TouchableOpacity style={styles.addButton}>
                            <FontAwesome name="shopping-cart" size={16} color="#fff"/>
                        </TouchableOpacity>
                    </Link>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default function FavoriteScreen() {
    if (favoriteProducts.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <FontAwesome name="heart-o" size={60} color="#ccc"/>
                <Text style={styles.emptyText}>You have no favorite items yet.</Text>
                <Link href="/home" asChild>
                    <TouchableOpacity style={styles.browseButton}>
                        <Text style={styles.browseButtonText}>Browse Products</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <FlatList
                data={favoriteProducts}
                renderItem={({item}) => <FavoriteProductCard item={item}/>}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={styles.productList}
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
        paddingTop: 20,
        paddingBottom: 20,
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
        shadowOffset: {width: 0, height: 2},
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 6,
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
