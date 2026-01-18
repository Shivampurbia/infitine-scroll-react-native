# React Native Infinite Pagination (React Query)

## 📖 Overview
This project demonstrates **infinite scrolling pagination** in a React Native application using **React Query** and **FlatList**.  
The implementation focuses on performance, caching, and smooth user experience while handling real-world scenarios such as loading, errors, empty data, and offline state.

---

## ✨ Features
- Infinite scrolling with `FlatList`
- Data fetching and caching using **React Query**
- Pagination with real API data (`dummyjson.com`)
- Skeleton loader for initial loading
- Loader while fetching next page
- Error handling with retry
- Empty state handling
- Network connectivity detection
- Optimized list rendering

---

## 🛠 Tech Stack
- React Native
- TypeScript
- @tanstack/react-query
- FlatList
- @react-native-community/netinfo

---



## 📂 Folder Structure
```
src/
├── api/
│   ├── users.api.ts
│   └── customHooks/
│       └── useInfiniteUsers.ts
├── components/
│   ├── UserItem.tsx
│   ├── SkeletonList.tsx
│   ├── SkeletonItem.tsx
│   └── EmptyState.tsx
├── hooks/
│   └── useNetworkStatus.ts
├── screens/
│   └── UsersScreens.tsx
├── utility/
│   └── commonFunction.ts
└── styles/
```



## 🔄 Pagination Logic
Pagination is implemented using `useInfiniteQuery` with `limit` and `skip`.
getNextPageParam is used to decide whether more data should be loaded and what the next page should be.

Each API response tells us:

how many items were already skipped (skip)

how many items are loaded per request (limit)

the total number of items available (total)

By checking skip + limit < total, we know if there is still data left on the server.
If there is, we calculate the next page number based on how many items have already been fetched.
If not, we return undefined, which tells React Query to stop fetching more pages.

This prevents unnecessary API calls and ensures pagination stops exactly when all data is loaded.

```ts
getNextPageParam: (lastPage) => {
  const { skip, limit, total } = lastPage;
  return skip + limit < total ? (skip / limit) + 2 : undefined;
};
```

## ⚙️ Setup & Running the App

Ensure that your development environment for React Native is properly set up  
(React Native CLI, Android Studio / Xcode, and required SDKs).
The application requires an active Android Emulator or iOS Simulator to be running before execution.
Install project dependencies:
```bash
git clone <repository-url>
cd <project-folder>
npm install
npx react-native run-android 
npx react-native run-ios 
```



