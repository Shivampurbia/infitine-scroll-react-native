import { StyleSheet, View } from 'react-native'
import React from 'react'

const SkeletonItem = () => {
  return (
     <View style={styles.skeletonContainer}>
    <View style={styles.avatar} />
    <View style={styles.textContainer}>
      <View style={styles.lineShort} />
      <View style={styles.lineLong} />
    </View>
  </View>
  )
}

export default SkeletonItem

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  textContainer: {
    marginLeft: 12,
    flex: 1,
  },
  lineShort: {
    width: '40%',
    height: 10,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
    borderRadius: 4,
  },
  lineLong: {
    width: '70%',
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  
});
