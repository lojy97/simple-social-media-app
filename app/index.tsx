import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { fetchPosts } from "../services/api";
import * as PostCardModule from "../components/PostCard";
import PostCard from "../components/PostCard";
console.log("PostCardModule:", PostCardModule);


export default function HomeScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }
console.log("PostCard is:", PostCard);
  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard
            id={item.id}
            title={item.title}
            body={item.body}
            userName={`User ${item.user_id}`}
            onPress={() => router.push(`/post-details/${item.id}`)}
          />
        )}
      />
    </View>
  );
}
