import React,{useState} from 'react';
import Posts from './Posts';
import Post from './Post';
import UpdatePost from './UpdatePost';
import CreatePost from './CreatePost';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { Menu } from 'antd';
import {auth} from '../firebase';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

const App = (props) => {

  const [userExists,setUserExists] = useState(false);

  auth.onAuthStateChanged(function(user) {
    if (user) {
      setUserExists(true);
      console.log('Signed in as '+user.email);
    } else {
      setUserExists(false);
    }
  });

  const handleSignOut = () => {
    auth.signOut()
      .then(() => alert('Successfully signed out.'))
      .catch((err) => {
        alert('An error occurred on sign out.')
        console.error(err);
      })
    ;
  }

  return (
    <div className="app_container">
      <Router>
        <nav className="app_main_navigation">
          <Menu mode="horizontal">
            <Menu.Item key="posts">
              <Link to='/posts'>
                Posts
              </Link>
            </Menu.Item>
            {
              userExists && (
                <Menu.Item key="create_post">
                  <Link to="/create_post">
                    Create New Post
                  </Link>
                </Menu.Item>
              )
            }
            {userExists ? (
              <span className='main_nav_signout_button' onClick={handleSignOut}>
                Sign Out
              </span>
            ) : (
              <Menu.Item key="sign_in" style={{float: 'right'}}>
                <Link to="/sign_in">
                  Sign In
                </Link>
              </Menu.Item>
            )}
          </Menu>
        </nav>

        <Switch>
        <Route path='/sign_in'>
            <SignIn />
          </Route>
          <Route path='/post/:id'>
            <Post />
          </Route>
          <Route path='/create_post'>
            <CreatePost />
          </Route>
          <Route path='/update_post/:id'>
            <UpdatePost />
          </Route>
          <Route path="/posts">
            <Posts user={userExists} />
          </Route>
          <Route path='/'>
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;