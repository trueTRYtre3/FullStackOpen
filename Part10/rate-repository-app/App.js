import React from 'react';
import Main from './src/components/Main';
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
  return <Main />;
  // return (
  //   <View style={styles.container}>
  //     <RepositoryList />
  //   </View>
  // );
};

export default App;

