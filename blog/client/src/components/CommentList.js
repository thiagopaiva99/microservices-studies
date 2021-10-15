import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      <p>{comments.length} comments</p>
      <ul>
        {comments &&
          comments.map(
            (comment) =>
              comment.status === 'approved' && (
                <li key={comment.id}>{comment.content}</li>
              )
          )}
      </ul>
    </div>
  );
};

export default CommentList;
