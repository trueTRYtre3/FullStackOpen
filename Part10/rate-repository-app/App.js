import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RepositoryList from './src/components/RepositoryList';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
};

export default App;

