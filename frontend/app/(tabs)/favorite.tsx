import { Text, View, StyleSheet } from 'react-native';

export default function FavoriteScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Favorite Screen</Text>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
