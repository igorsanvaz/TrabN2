import React, { useState } from 'react';
import axios from 'axios';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const users = 'https://projeto2mobile.vercel.app/users';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const gravarDados = async () => {
    console.log("Tentando gravar dados com:", { email, password });

    if (!email || !password) {
      Alert.alert("Erro", "Email e password são obrigatórios.");
      return;
    }

    try {
      const response = await axios.post(users, {
        email: email,
        password: password // Certifique-se de usar 'password' para corresponder ao backend
      }, {
        timeout: 10000 // Aumentando o timeout para 10 segundos
      });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      console.log("Dados gravados com sucesso:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Erro ao gravar dados:", error.response.data);
        Alert.alert("Erro", "Erro ao realizar cadastro: " + error.response.data.error);
      } else if (error.request) {
        console.error("Erro ao gravar dados: Nenhuma resposta recebida", error.request);
        Alert.alert("Erro", "Erro ao realizar cadastro: Nenhuma resposta recebida do servidor.");
      } else {
        console.error("Erro ao gravar dados:", error.message);
        Alert.alert("Erro", "Erro ao realizar cadastro: " + error.message);
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
      <Button onPress={gravarDados} title="Register" />
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

export default RegisterScreen;
