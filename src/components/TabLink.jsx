import { Pressable, View } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const TabLink = ({ path, label }) => {
  return (
    <View>
      <Pressable>
        <Link to={path}>
          <Text color='textWhite' fontSize={'link'} fontWeight={'bold'}>
            {label}
          </Text>
        </Link>
      </Pressable>
    </View>
  );
};

export default TabLink;
