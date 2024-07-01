import React, { useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AppContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://projeto2mobile.vercel.app/login', { email, password });
      setUser(response.data.user);
      Alert.alert("Sucesso", "Login bem-sucedido!");
    } catch (error) {
      if (error.response) {
        console.error('Error logging in:', error.response.data);
        Alert.alert("Erro", error.response.data.error || "Erro ao fazer login. Verifique suas credenciais e tente novamente.");
      } else {
        console.error('Error logging in:', error);
        Alert.alert("Erro", "Erro ao fazer login. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Email" 
        style={styles.input}
      />
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Password" 
        secureTextEntry
        style={styles.input}
      />
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default LoginScreen;
