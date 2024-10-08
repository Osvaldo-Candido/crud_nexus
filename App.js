import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import TextArea from './components/TextArea';
import Post from './components/Post';
import { supabase } from './services/supabaseClient';

export default function App() {
  const [posts, setPosts] = useState('');

  const fetchPosts = async () => {
    const { data, erro } = await supabase
      .from('posts')
      .select('*')
      .order('id', { ascending: false });

    if (erro) {
    }

    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={style.container}>
      <Text style={[style.title, style.afterTitle]}>VITRINE DE IDEIAS</Text>
      <TextArea style={style.textarea} onPostInserted={fetchPosts} />
      <View style={style.scroll}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {posts &&
            posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  data={post}
                  id={post.id}
                  onDelete={fetchPosts}
                />
              );
            })}
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scroll: {
    marginTop: 10,
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    color: '#404040',
    marginBottom: 10,
    marginTop: 5,
    fontWeight: 'bold',
  },
});
