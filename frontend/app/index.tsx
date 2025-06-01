import { Redirect } from 'expo-router';

export default function Index() {
    // Mengarahkan ke layar 'home' di dalam grup '(tabs)'
    // Expo Router akan menangani path ini sebagai /home
    return <Redirect href="/home" />;
}
