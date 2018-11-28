import React from 'react';

import {Comment} from './Comment.jsx';

export const CommentList = React.createClass({
  render: function() {
    const commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment._id} id={comment._id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
