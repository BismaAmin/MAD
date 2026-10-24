import React from 'react';
import { Platform, StyleSheet, View, Text, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ShopProvider } from './frontend/context/ShopContext';
import AppNavigator from './frontend/navigation/AppNavigator';

// 👇 YEH ERROR BOUNDARY ERROR DIKHAYEGI 👇
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Oops! App Crashed</Text>
          <ScrollView style={styles.errorScroll}>
            <Text style={styles.errorText}>
              {this.state.error && this.state.error.toString()}
            </Text>
            <Text style={styles.errorStack}>
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </Text>
          </ScrollView>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ShopProvider>
        <View style={styles.root}>
          {Platform.OS === 'web' && (
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 30px rgba(0,0,0,0.5) inset !important;
                    -webkit-text-fill-color: #FFFFFF !important;
                  }
                `,
              }}
            />
          )}
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </View>
      </ShopProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({ 
  root: { flex: 1 },
  errorContainer: {
    flex: 1,
    backgroundColor: '#ffebee',
    padding: 20,
    paddingTop: 50,
    justifyContent: 'center',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
  },
  errorScroll: {
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: '#b71c1c',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorStack: {
    fontSize: 12,
    color: '#555',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});