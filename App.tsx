/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UsersScreens from './src/screens/UsersScreens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <UsersScreens />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
