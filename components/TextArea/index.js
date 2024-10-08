import React, { useState } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '../../services/supabaseClient';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function TextArea({ onPostInserted }) {
  const [post, setPost] = useState('');

  const handleChange = (value) => {
    setPost(value);
  };

  const handleInsertPost = async (post) => {
    const { data, error } = await supabase.from('posts').insert({ post });
    if (error) {
      console.log(error);
    }
    setPost('');
    onPostInserted();
  };

  return (
    <View style={style.container}>
      <TextInput
        style={style.textArea}
        onChangeText={handleChange}
        value={post}
        multline={true}
        placeholder="Digite alguma coisa"
        placeholderTextColor="gray"
        numberOfLines={4}
      />

      <View>
        <TouchableOpacity
          style={style.btn}
          onPress={() => handleInsertPost(post)}
        >
          <Text style={style.btnText}>PUBLICAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlignVertical: 'top',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#34724B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
