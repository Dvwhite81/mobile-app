import { StyleSheet, View } from 'react-native';

import TabLink from './TabLink';

import theme from '../theme';

const NavBar = () => {
  return (
    <View style={styles.container}>
      <TabLink path={'/'} label={'Home'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.darkBg,
    height: theme.heights.navHeight,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default NavBar;
