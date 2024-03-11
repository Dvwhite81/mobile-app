import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import Main from './src/Main';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <StatusBar style='auto' />
    </>
  );
};

export default App;
