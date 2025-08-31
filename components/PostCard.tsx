
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  userName?: string;
  avatar?: string;
  onPress: () => void;
}

export default function PostCard({
  id,
  title,
  body,
  userName,
  avatar,
  onPress,
}: PostCardProps) {
  console.log("Loaded PostCard component");
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Image
          source={{ uri: avatar || "https://i.pravatar.cc/150?u=" + id }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{userName || "User " + id}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text numberOfLines={2} style={styles.body}>
        {body}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
  },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8 },
  userName: { fontWeight: "bold" },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  body: { color: "#555" },
});
