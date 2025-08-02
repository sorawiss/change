import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/auth-screen");
      } else {
        router.replace("/");
      }
    }
  }, [user, isLoading, router]);

  // Don't render anything while loading to avoid navigation conflicts
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}



export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <SafeAreaProvider>
          <Stack >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth-screen" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}
