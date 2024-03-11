import { useContext, useState } from 'react';
import { Text as TextNative, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import AuthForm from '../components/AuthForm';
import Text from '../components/Text';
import styles from '../styles';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useContext(AuthContext);
  const handleSubmit = async () => {
    if (name === '' || email === '' || password === '') {
      alert('All fields are required');
      return;
    }

    const resp = await axios.post('http://localhost:8000/api/signup', {
      name,
      email,
      password,
    });

    if (resp.data.error) {
      alert(resp.data.error);
    } else {
      setState(resp.data);
      await AsyncStorage.setItem('auth-rn', JSON.stringify(resp.data));
      alert('Sign Up Successful!');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.page}>
      <AuthForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      <Text style={{ textAlign: 'center' }} fontSize={'subheading'}>
        Already registered?{' '}
        <TextNative
          style={{ color: 'darkred', fontWeight: 'bold' }}
          onPress={() => navigation.navigate('LogIn')}
        >
          Log In
        </TextNative>
      </Text>
    </View>
  );
};

export default SignUp;
