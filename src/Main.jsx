import { StyleSheet, View } from 'react-native';
import { Routes, Route } from 'react-router-native';
import NavBar from './components/NavBar';
import Home from './pages/Home';

const Main = () => {
  return (
    <View style={styles.container}>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'darkgray',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
  },
});

export default Main;
