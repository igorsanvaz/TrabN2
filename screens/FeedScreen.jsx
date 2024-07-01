import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FeedScreen = () => {
  const { posts, setPosts } = useContext(AppContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://projeto22.vercel.app/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [setPosts]);

  return (
    <ScrollView contentContainerStyle={styles.feedContainer}>
      {posts.map((post) => (
        <View key={post.id} style={styles.post}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    padding: 16,
  },
  post: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: '#333',
  },
});

export default FeedScreen;
