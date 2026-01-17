import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { useInfiniteUsers } from '../api/customHooks/useInfiniteUsers';
import SkeletonList from '../components/SkeletonList';
import UserItem from '../components/UserItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { normalize } from '../utility/commonFunction';
import EmptyState from '../components/EmptyState';
import { useQueryClient } from '@tanstack/react-query';
import { useNetworkStatus } from '../api/customHooks/useNetworkStatus';

const UsersScreens = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const isConnected = useNetworkStatus();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useInfiniteUsers();

  const handleReset = () => {
    //One way to reset the cache
    /* refetch without removing the query will only refetch for all pages just like invalidateQueries,
        thats why we are removing the query first
    */
    // queryClient.removeQueries({ queryKey: ['users'] });
    // refetch();

    //Another way to reset the cache - this will remove reset the cache and refetch the data
    queryClient.resetQueries({ queryKey: ['users'] });
  };

  const users = data?.pages.flatMap(page => page.users) ?? [];

  if (isLoading) {
    return <SkeletonList />;
  }

  if (isError || !isConnected) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorText}>
            {!isConnected ? 'No internet connection' : 'Error loading users'}
          </Text>
          {isRefetching ? (
            <ActivityIndicator />
          ) : (
            <Button disabled={isRefetching} title="Retry" onPress={refetch} />
          )}
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          marginTop: safeAreaInsets.top,
          marginBottom: safeAreaInsets.bottom,
        },
      ]}
    >
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <UserItem user={item} />}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footer}>
              <ActivityIndicator style={styles.footerLoader} />
            </View>
          ) : null
        }
        ListEmptyComponent={isLoading ? null : <EmptyState />}
        refreshing={false}
        onRefresh={refetch}
        getItemLayout={(_, index) => ({
          length: normalize(100),
          offset: normalize(100) * index,
          index,
        })}
      />
      <View style={styles.resetContainer}>
        <Text style={styles.pageText}>{'Page ' + data?.pageParams.length}</Text>

        <Button
          title="Reset"
          onPress={handleReset}
          disabled={isLoading || isRefetching}
        />
      </View>
    </View>
  );
};

export default UsersScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(16),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContent: {
    alignItems: 'center',
    marginTop: 40,
    height: 100,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    height: 48,
    justifyContent: 'center',
  },
  footerLoader: {
    marginVertical: 16,
  },
  resetContainer: {
    paddingHorizontal: normalize(6),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: normalize(12),
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  pageText: {
    fontSize: 16,
    color: '#2584c4',
    fontWeight: '700',
  },
});