/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import Stories from './src/screens/stories';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <Stories />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default App;
