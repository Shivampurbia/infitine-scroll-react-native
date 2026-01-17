import React from 'react'
import SkeletonItem from './SkeletonItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

const SkeletonList = () => {
      const safeAreaInsets = useSafeAreaInsets();
    
  return (
     <View style={{
        marginTop:safeAreaInsets.top
     }}>
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonItem key={index} />
      ))}
    </View>
  )
}

export default SkeletonList
