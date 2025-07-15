import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        const data = await response.json();
        setPosts(data)
      }
      catch (error) {
        console.log("포스트를 가져오지 못했어요:", error)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div>로딩 중...</div>
  }

  return (
    <div>
      <h2>게시글 목록</h2>
      {posts.map(post => (
        <div key={post.id} style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

export default PostList