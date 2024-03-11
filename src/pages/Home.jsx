import { StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from '../components/Text';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text fontSize={'h1'}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.heights.mainHeight,
    width: '100%',
  },
});

export default Home;
