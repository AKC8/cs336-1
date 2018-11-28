import React from 'react';
import {Link} from 'react-router';

export const Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
        <Link style={{ display: 'block'}} to={'/' + this.props.id}>Edit</Link>
      </div>
    );
  }
});
