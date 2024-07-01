import React, { useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const PostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, setPosts } = useContext(AppContext);

  const handlePost = async () => {
    try {
      const response = await axios.post('https://projeto22.vercel.app/posts', { title, content, userId: user.id });
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Title" 
        style={styles.input}
      />
      <TextInput 
        value={content} 
        onChangeText={setContent} 
        placeholder="Content" 
        multiline
        style={styles.textarea}
      />
      <Button onPress={handlePost} title="Post" />
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
  textarea: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default PostScreen;
