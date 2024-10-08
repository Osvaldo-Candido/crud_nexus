import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../../services/supabaseClient';

export default function Post(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(props.data.post);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updatePost = async () => {
    const { error } = await supabase
      .from('posts')
      .update({ post: updatedPost })
      .match({ id: props.data.id });

    if (error) {
      alert(error.message);
      return;
    }

    props.onDelete();
    setIsEditing(false);
    alert('Post atualizado com sucesso!');
  };

  const deletePost = async () => {
    const { error } = await supabase
      .from('posts')
      .delete()
      .match({ id: props.data.id });

    if (error) {
      alert(error.message);
      return;
    }

    props.onDelete();
    alert('Post apagado com sucesso!');
  };

  return (
    <View style={style.container}>
      {isEditing ? (
        <TextInput
          style={style.input}
          value={updatedPost}
          onChangeText={setUpdatedPost}
          multiline
        />
      ) : (
        <Text style={style.post}>{props.data.post}</Text>
      )}

      <View style={style.actions}>
        {isEditing ? (
          <>
            <TouchableOpacity style={style.btn} onPress={updatePost}>
              <Text style={style.btnText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn} onPress={toggleEdit}>
              <Text style={style.btnText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={style.btn} onPress={toggleEdit}>
              <Text style={style.btnText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn} onPress={deletePost}>
              <Text style={style.btnText}>Apagar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fafbfc',
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 10,
  },
  post: {
    lineHeight: 20,
    color: '#121212',
    fontSize: 16,
  },
  input: {
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#E7E7E7',
  },
  btnText: {
    color: '#404040',
  },
});
