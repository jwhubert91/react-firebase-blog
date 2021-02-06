import React,{useState,useEffect} from 'react';
import PostSnippet from './PostSnippet';
import PageTitle from './PageTitle';
import _ from 'lodash';
import db from '../firebase';

function Posts(props) {

  const [posts,setPosts] = useState([]);

  useEffect(() => {
    let postsRef = db.collection('posts');

    postsRef
      .get()
      .then(posts => {
        posts.forEach(post => {
          let data = post.data();
          const {id} = post;
          let payload = {
            id,
            ...data
          }
          setPosts((posts) => [...posts,payload])
        })
      })
  },[])

  return (
    <div className="posts_container">
      <PageTitle title="Posts" />
      <div className="articles_container">
        {
          _.map(posts,({id,title,content}) => (
            <PostSnippet 
              key={id} 
              id={id}
              title={_.startCase(_.toLower(title))} 
              content={content.substring(0,250)}
              user={props.user}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Posts;