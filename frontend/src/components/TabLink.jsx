import { NavLink } from 'react-router-dom';
import Text from './Text';

const TabLink = ({ path, label }) => {
  return (
    <NavLink to={path} style={{ textDecoration: 'none' }}>
      <Text color="textWhite" fontSize={'link'} fontWeight={'bold'}>
        {label}
      </Text>
    </NavLink>
  );
};

export default TabLink;
