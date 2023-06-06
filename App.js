import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

 const fetchPosts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/posts');
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
            <th>User ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostRow key={post.id} post={post} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PostRow({ post }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async (postId) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${postId}/comments`);
      const data = await response.json();
      setComments(data.comments);
      console.log(data.comments);
      setShowComments(true);
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  return (
    <tr>
      <td>{post.id}</td>
      <td>{post.title}</td>
      <td>{post.body}</td>
      <td>{post.userId}</td>
      <td>
        {showComments ? (
          <div>
            <button onClick={() => setShowComments(false)}>Hide Comments</button>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
              ))}
            </ul>
          </div>
        ) : (
          <button onClick={() => fetchComments(post.id)}>View Comments</button>
        )}
      </td>
    </tr>
  );
}

export default App; 