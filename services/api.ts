import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.API_URL;

async function handleResponse(res: Response) {
  if (!res.ok) {
    const text = await res.text(); 
    throw new Error(`Error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function fetchPosts() {
    console.log("BASE_URL = ", BASE_URL);

  const res = await fetch(`${BASE_URL}/posts`);
  return handleResponse(res);
}

export async function fetchComments(postId: number) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return handleResponse(res);
}
