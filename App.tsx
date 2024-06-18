import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface User {
  id: number;
  name: string;
  type: 'Docente' | 'Estudante' | 'Técnico Administrativo';
  institution: string;
  permissions: 'Administrador' | 'Coordenador de Pesquisa';
  email: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<User>({ id: 0, name: '', type: 'Docente', institution: '', permissions: 'Administrador', email: '' });
  const [editing, setEditing] = useState(false);

  const createUser = (user: User) => {
    setUsers([...users, { ...user, id: Math.random() }]);
  };

  const updateUser = (user: User) => {
    setUsers(users.map(u => u.id === user.id ? user : u));
    setEditing(false);
    setForm({ id: 0, name: '', type: 'Docente', institution: '', permissions: 'Administrador', email: '' });
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const editUser = (user: User) => {
    setForm(user);
    setEditing(true);
  };

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (editing) {
      updateUser(form);
    } else {
      createUser(form);
    }
    setForm({ id: 0, name: '', type: 'Docente', institution: '', permissions: 'Administrador', email: '' });
  };

  return (
    <View style={styles.container}>
      <Text>Nome</Text>
      <TextInput style={styles.input} value={form.name} onChangeText={(value) => handleChange('name', value)} />
      <Text>Tipo</Text>
      <Picker style={styles.input} selectedValue={form.type} onValueChange={(value) => handleChange('type', value)}>
        <Picker.Item label="Docente" value="Docente" />
        <Picker.Item label="Estudante" value="Estudante" />
        <Picker.Item label="Técnico Administrativo" value="Técnico Administrativo" />
      </Picker>
      <Text>Instituição</Text>
      <TextInput style={styles.input} value={form.institution} onChangeText={(value) => handleChange('institution', value)} />
      <Text>Permissões</Text>
      <Picker style={styles.input} selectedValue={form.permissions} onValueChange={(value) => handleChange('permissions', value)}>
        <Picker.Item label="Administrador" value="Administrador" />
        <Picker.Item label="Coordenador de Pesquisa" value="Coordenador de Pesquisa" />
      </Picker>
      <Text>Email</Text>
      <TextInput style={styles.input} value={form.email} onChangeText={(value) => handleChange('email', value)} />
      <Button title={editing ? "Atualizar usuário" : "Criar usuário"} onPress={handleSubmit} />

      {/* Lista de usuários */}
      {users.map(user => (
        <View key={user.id}>
          <Text>{user.name}</Text>
          <Button title="Editar" onPress={() => editUser(user)} />
          <Button title="Excluir" onPress={() => deleteUser(user.id)} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
});

export default App;