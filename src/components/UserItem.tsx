import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { normalize } from '../utility/commonFunction';

type UserItemProps = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
  };
};

const UserItem = ({ user }: UserItemProps) => {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

//   console.log('UserItem rendered:', user.id);
  
  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>

        <Text style={styles.email}>{user.email}</Text>

        <Text style={styles.meta}>Age: {user.age}</Text>
      </View>
    </View>
  );
};

export default React.memo(UserItem);

const styles = StyleSheet.create({
  card: {
    //100
    height: normalize(84),
    marginBottom: normalize(10),
    marginTop: normalize(6),

    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: normalize(16),
    borderRadius: normalize(12),
    marginHorizontal: normalize(6),
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Android shadow
    elevation: 3,
  },
  avatar: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(24),
    backgroundColor: '#E8F0FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  avatarText: {
    fontSize: normalize(16),
    fontWeight: '600',
    color: '#1A73E8',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: normalize(16),
    fontWeight: '600',
    color: '#111',
    marginBottom: normalize(2),
  },
  email: {
    fontSize: normalize(14),
    color: '#555',
    marginBottom: normalize(4),
  },
  meta: {
    fontSize: normalize(13),
    color: '#777',
  },
});
