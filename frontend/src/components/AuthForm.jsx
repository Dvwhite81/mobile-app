import { Pressable, TextInput, View } from 'react-native';

import Text from './Text';

import styles from '../styles';

function AuthForm({ name, setName, email, setEmail, password, setPassword, handleSubmit }) {
  return (
    <View style={styles.formContainer}>
      {name !== null && (
        <View style={{ marginHorizontal: 24 }}>
          <Text fontSize="subheading">Name:</Text>
          <TextInput
            style={styles.formInput}
            value={name}
            onChangeText={(text) => setName(text)}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>
      )}
      <View style={{ marginHorizontal: 24 }}>
        <Text fontSize="subheading">Email:</Text>
        <TextInput
          style={styles.formInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCompleteType="email"
          keyboardType="email-address"
        />
      </View>
      <View style={{ marginHorizontal: 24 }}>
        <Text fontSize="subheading">Password:</Text>
        <TextInput
          style={styles.formInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          autoCompleteType="password"
        />
      </View>
      <Pressable onPress={handleSubmit} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

export default AuthForm;
