import React from 'react';

interface CommentProps {
  comment: {
    id: string;
    userName: string;
    comment: string;
    date: string;
  };
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <li key={comment.id}>
      <p>{comment.userName}</p>
      <p>{comment.comment}</p>
      <p>{new Date(comment.date).toLocaleDateString()}</p>
    </li>
  );
};

export default Comment;