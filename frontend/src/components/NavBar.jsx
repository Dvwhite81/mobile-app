import { View } from 'react-native';
import TabLink from './TabLink';
import styles from '../styles';

const NavBar = () => {
  return (
    <View style={styles.navbar}>
      <TabLink path='/signup' label='Sign Up' />
      <TabLink path='/' label='Home' />
      <TabLink path='/login' label='Log In' />
    </View>
  );
};

export default NavBar;
