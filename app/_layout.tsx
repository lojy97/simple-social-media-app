import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: "Posts" }} 
      />
      <Stack.Screen 
        name="post-details/[id]" 
        options={{ title: "Post Details" }} 
      />
    </Stack>
  );
}
