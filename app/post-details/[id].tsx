import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PostCard from "../../components/PostCard";
import { fetchPosts, fetchComments } from "../../services/api";

interface Post {
  id: number;
  title: string;
  body: string;
  user_id?: number;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function PostDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      try {
        const allPosts = await fetchPosts();
        const selectedPost = allPosts.find((p: Post) => p.id === Number(id));
        setPost(selectedPost);

        const postComments = await fetchComments(Number(id));
        setComments(postComments);
      } catch (err) {
        console.error("Failed to fetch post details:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.center}>
        <Text>Post not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <PostCard
        id={post.id}
        title={post.title}
        body={post.body}
        userName={`User ${post.user_id}`}
        onPress={() => {}}
      />

      <Text style={styles.commentsTitle}>Comments</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?u=${item.email}` }}
                style={styles.commentAvatar}
              />
              <View>
                <Text style={styles.commentAuthor}>{item.name}</Text>
                <Text style={styles.commentEmail}>{item.email}</Text>
              </View>
            </View>
            <Text style={styles.commentBody}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  commentsTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  commentCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentAuthor: { fontWeight: "bold" },
  commentEmail: { color: "gray", fontSize: 12 },
  commentBody: { fontSize: 14, marginTop: 4 },
});
