import React, { useEffect, useState } from 'react';
import {Slot, SplashScreen, Stack, useRouter, useSegments} from 'expo-router';
import { ActivityIndicator, View, StyleSheet } from 'react-native';


const DUMMY_LOGGED_IN_USER_CONTEXT = {
  id: 'usr_001',
  username: 'MerasaTester',
  email: 'tester@merasa.app',
  token: 'dummy-secure-token-for-context',
};

// Placeholder untuk Auth Context/Hook
// Gantilah ini dengan implementasi Auth Context Anda yang sebenarnya


const useAuthContext = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  // Ganti nilai default isAuthenticated di sini untuk simulasi
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default: false
  const [currentUser, setCurrentUser] = useState<typeof DUMMY_LOGGED_IN_USER_CONTEXT | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // SIMULASI: Cek apakah pengguna "sudah login"
      // Untuk tes, Anda bisa set isAuthenticated ke true di sini secara manual
      const simulateUserIsLoggedIn = true; // <-- GANTI INI UNTUK SIMULASI

      if (simulateUserIsLoggedIn) {
        // TODO: Dalam aplikasi nyata, Anda akan memuat token dari AsyncStorage
        // dan mungkin mengambil detail pengguna dari backend.
        setIsAuthenticated(true);
        setCurrentUser(DUMMY_LOGGED_IN_USER_CONTEXT);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }

      setTimeout(() => { // Simulasi network delay
        setIsAuthLoading(false);
      }, 500);
    };
    checkAuth();
  }, []); // Jalankan sekali saat komponen dimuat

  // Fungsi untuk login (akan dipanggil dari layar Login)
  const login = (userData: React.SetStateAction<{ id: string; username: string; email: string; token: string; } | null>, token: any) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    // TODO: Simpan token ke AsyncStorage
    // AsyncStorage.setItem('userToken', token);
    // AsyncStorage.setItem('userData', JSON.stringify(userData));
  };

  // Fungsi untuk logout (akan dipanggil dari layar Profile)
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    // TODO: Hapus token dari AsyncStorage
    // AsyncStorage.removeItem('userToken');
    // AsyncStorage.removeItem('userData');
  };


  // Dalam implementasi Context API yang sebenarnya, Anda akan menyediakan
  // state ini (isAuthenticated, isAuthLoading, currentUser, login, logout) melalui Provider.
  // Untuk contoh ini, kita hanya mengembalikan nilainya.
  return { isAuthenticated, isAuthLoading, currentUser, login, logout };
};


// ... (sisa kode RootLayout)
// Pastikan logika di dalam RootLayout's useEffect menggunakan
// `isAuthenticated` dari `useAuthContext()` ini.


export default function RootLayout() {
  const { isAuthenticated, isAuthLoading } = useAuthContext(); // Gunakan hook auth Anda
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Sembunyikan splash screen setelah loading selesai
    if (!isAuthLoading) {
      SplashScreen.hideAsync();
    }
  }, [isAuthLoading]);

  useEffect(() => {
    if (isAuthLoading) return; // Jangan lakukan apa-apa jika masih loading

    const inAuthGroup = segments[0] === '(auth)';

    if (isAuthenticated && inAuthGroup) {
      // Pengguna sudah login TAPI masih di grup (auth) -> arahkan ke tabs
      router.replace('/(tabs)/home');
    } else if (!isAuthenticated && !inAuthGroup && segments[0] !== undefined) {
      // Pengguna belum login TAPI mencoba akses grup selain (auth) -> arahkan ke login
      // Pastikan segments[0] !== undefined untuk menghindari redirect dari layar welcome awal (index.tsx)
      // Jika index.tsx (WelcomeScreen) sudah menangani ini, logika di sini bisa disesuaikan
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, isAuthLoading, segments, router]);

  if (isAuthLoading) {
    // Anda bisa menampilkan splash screen atau loading indicator di sini
    // Expo Router menangani splash screen secara default
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
    );
  }

  // Slot akan merender rute yang cocok berdasarkan status autentikasi dan navigasi
  return <Stack />;
}

// Pastikan app.json Anda memiliki "main": "expo-router/entry"
// dan plugin "expo-router"
