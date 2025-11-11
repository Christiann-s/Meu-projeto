import database from '@react-native-firebase/database';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const SolicitarColeta = () => {
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [residuo, setResiduo] = useState('');

  const enviarSolicitacao = async () => {
    try {
      await database().ref('/solicitacoes').push({
        nome,
        endereco,
        residuo,
        data: new Date().toISOString()
      });
      console.log('Solicitação enviada com sucesso!');
      setNome('');
      setEndereco('');
      setResiduo('');
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Solicitação de Coleta</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome"
        style={styles.input}
      />
      <TextInput
        value={endereco}
        onChangeText={setEndereco}
        placeholder="Endereço"
        style={styles.input}
      />
      <TextInput
        value={residuo}
        onChangeText={setResiduo}
        placeholder="Tipo de Resíduo"
        style={styles.input}
      />
      <Button title="Enviar" onPress={enviarSolicitacao} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10
  }
});

export default SolicitarColeta;