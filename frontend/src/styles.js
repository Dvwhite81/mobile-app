import { StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    backgroundColor: 'darkgray',
    flex: 1,
  },
  page: {
    backgroundColor: 'darkgray',
    display: 'flex',
    height: theme.heights.mainHeight,
    flexDirection: 'column',
    width: '100%',
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: theme.colors.darkBg,
    flexDirection: 'row',
    height: theme.heights.navHeight,
    justifyContent: 'space-around',
    width: '100%',
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextWhite: {
    color: theme.colors.textWhite,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeH1: {
    fontSize: theme.fontSizes.h1,
    fontWeight: theme.fontWeights.bold,
  },
  fontSizeLink: {
    fontSize: theme.fontSizes.link,
    fontWeight: theme.fontWeights.bold,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  formContainer: {
    marginHorizontal: 'auto',
    marginTop: 10,
    textAlign: 'center',
    width: '80%',
  },
  formText: {
    fontSize: 30,
    textAlign: 'center',
  },
  formInput: {
    borderBottomColor: '#8e93a1',
    borderBottomWidth: 0.5,
    height: 48,
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: 'darkmagenta',
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    marginHorizontal: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyles: {
    height: 100,
    marginVertical: 20,
    width: 100,
  },
});

export default styles;
