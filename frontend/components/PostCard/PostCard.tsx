'use client';

import React, { useState } from 'react';
import './postcard.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addCommentThunk, toggleLikeThunk,  } from '@/redux/features/post/postSlice';

type Props = {
  post: any;
  user: any;
};

const PostCard = ({ post, user }: Props) => {
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const currentUser = useAppSelector(state => state.users.currentUser);
  const userId = currentUser?.id;
  const dispatch = useAppDispatch();

  const handleLike = (id: string, userId: string) => {
    dispatch(toggleLikeThunk({ id, userId }));
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    const data = {
      userId: userId,
      text: commentText
    }
    dispatch(addCommentThunk({ id: post.id, data }));

    setCommentText('');
    setShowComments(true);
  };

  const isLiked = post.likes?.some((like: any) => like.userId === userId);

  return (
    <div className="post-card" style={{ marginBottom: '10px' }}>
      <div className="post-header">
        <img
          src={user?.profilePicture || '/default-avatar.png'}
          className="avatar"
        />
        <div>
          <h4>{user?.firstName} {user?.lastName}</h4>
          <p className="role">{user?.location}</p>
        </div>
      </div>

      <p className="post-text">{post.text}</p>

      {post.image && post.image.length > 0 && (
        <div className="image-gallery">
          {post.image.map((imageUrl: string, index: number) => (
            <img
              key={index}
              src={imageUrl}
              style={{ marginBottom: '3px' }}
              className="post-image"
              alt={`Post image ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="divider"></div>

      <div className="post-actions">
        <button
          onClick={() => handleLike(post.id, userId)}
          style={{
            color: isLiked ? 'blue' : 'black',
            fontWeight: isLiked ? 'bold' : 'normal',
          }}
        >
          👍 {isLiked ? 'Liked' : 'Like'}
        </button>

        <button onClick={() => setShowComments(!showComments)}>
          💬 Comment
        </button>

        <button>🔁 Repost</button>
        <button>✉ Send</button>
      </div>

      {showComments && (
        <div className="comments-section">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="comment-input"
          />
          <button
            className="comment-btn"
            onClick={handleComment}
            disabled={!commentText.trim()}
          >
            Post
          </button>

          <div className="comments-list">
            {post.comments?.map((c: any) => (
              <div key={c.id} className="comment-item">
                <strong>{c.user?.firstName} {c.user?.lastName}:</strong> {c.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;