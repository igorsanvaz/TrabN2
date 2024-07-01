import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import AppContext from '../context/AppContext';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://projeto22.vercel.app/user', { params: { userId: user.id } });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [setUser]);

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.userName}>{user?.name}</Text>
      <Text style={styles.userEmail}>{user?.email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 18,
    color: '#555',
  },
});

export default ProfileScreen;
