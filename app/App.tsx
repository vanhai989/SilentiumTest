import React from 'react';
import { enableFreeze } from 'react-native-screens';
import AppRoute from './src/navigator';
import { View, StyleSheet } from 'react-native';

enableFreeze(true);
function App(): JSX.Element {

  return (
    <View style={styles.container}>
      <AppRoute />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1
  }
})

export default App;
