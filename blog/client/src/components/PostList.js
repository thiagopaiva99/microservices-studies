import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await axios.get('http://posts.com/posts');
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="mt-4">
      <h2>Posts</h2>
      <div className="d-flex" style={{ gap: '15px' }}>
        {posts &&
          posts.map((post) => (
            <div
              key={post.id}
              className="card"
              style={{ width: '30%', marginBottom: '20px' }}
            >
              <div className="card-body">
                <h3>{post.title}</h3>

                <CommentCreate postId={post.id} />
                <CommentList comments={post.comments} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostList;
