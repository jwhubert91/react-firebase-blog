import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';

const PostSnippet = (props) => {
  return (
    <div className="post_snippet_container">
      <Card
        style={{marginTop: 16}}
        type="inner"
        title={props.title}
        extra={<div className="post_snippet_links_container">
                {props.user && <Link to={`/update_post/${props.id}`} style={{marginRight: '15px', color: "gray"}}>Edit</Link>}
                <Link to={`/post/${props.id}`}>Read Full Article</Link>
              </div>
        }
      >
        <p>
          {props.content}
        </p>
      </Card>
    </div>
  );
}

export default PostSnippet;