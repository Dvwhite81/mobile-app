import { Text as NativeText } from 'react-native';
import styles from '../styles';

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textWhite' && styles.colorTextWhite,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'link' && styles.fontSizeLink,
    fontSize === 'h1' && styles.fontSizeH1,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
