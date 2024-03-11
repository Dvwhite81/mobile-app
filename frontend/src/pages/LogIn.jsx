import { useContext, useState } from 'react';
import { Text as TextNative, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthForm from '../components/AuthForm';
import Text from '../components/Text';
import styles from '../styles';
import { AuthContext } from '../context/auth';

const LogIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useContext(AuthContext);

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      alert('All fields are required');
      return;
    }

    const resp = await axios.post('http://localhost:8000/api/login', {
      email,
      password,
    });

    if (resp.data.error) {
      alert(resp.data.error);
    } else {
      setState(resp.data);
      await AsyncStorage.setItem('auth-rn', JSON.stringify(resp.data));
      alert('Log In Successful!');
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.page}>
      <AuthForm
        name={null}
        setName={null}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
      <Text style={{ textAlign: 'center' }} fontSize={'subheading'}>
        Not registered?{' '}
        <TextNative
          style={{ color: 'darkred', fontWeight: 'bold' }}
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign Up
        </TextNative>
      </Text>
      <Text style={{ marginTop: 10, textAlign: 'center' }} fontSize={'subheading'}>
        Forgot Password?
      </Text>
    </View>
  );
};

export default LogIn;
