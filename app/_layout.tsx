import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isLoggedIn = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        router.replace("/auth-screen");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [isLoggedIn]);

  return <>{children}</>;
}



export default function RootLayout() {
  return (
    <ProtectedRoute>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="auth-screen" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
