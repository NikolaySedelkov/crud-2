import { useState, useEffect } from 'react';
import {Routes, Route, Link, useParams} from "react-router-dom"
import './App.css';
import Loading from "./component/Loading/Loading.js";
import Posts from "./component/Post/Posts.js";
import NewPostComponent from "./component/Post/NewPostComponent.js";
import DeleteOrUpdatePost from "./component/Post/DeleteOrUpdatePost.js";
import UpdatePost from "./component/Post/UpdatePost.js";


async function getFetch(){
  return     fetch("http://localhost:7777/posts").then((res) => res.json())
}

function App() {
  const [posts, setPosts]       = useState();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError]     = useState(false);
  useEffect( () => {
      getFetch().then(
            (data) => {
              setPosts(data);
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setError(true);
            }
        );
  }, [isLoading, isError])

  const addPost = post => {
    fetch("http://localhost:7777/posts", {
      method: "post",
      body: JSON.stringify(post)
    }).then(
      (data) => {
        getFetch().then(
          (data) => {
            setPosts(data);
          }
        )
      },
      (error) => {
        setError(true);
      }
    )
  }

  const updPost = post => {
    fetch("http://localhost:7777/posts", {
      method: "post",
      body: JSON.stringify(post)
    }).then(
      (data) => {
        setPosts(posts.map(p => p.id === post.id?{...p, content: post.content}:p));
      },
      (error) => {
        setError(true);
      }
    )
  }

  const deletePost = post => {
    fetch(`http://localhost:7777/posts/${post.id}`, {
                        method: "delete"
                    }).then((res) => {
                        if (res.status === 204){
                          setPosts(posts.filter(p => p.id !== post.id));
                        }
                    })
    
  }

  const ChangePost = function(Component){
    let id    = parseInt(useParams().id);
    let time  = Date.now();
    let post  = posts.find(post => post.id === id);
    return <DeleteOrUpdatePost
           body={post} 
           time={time}
           deletePostFunc={deletePost}/>
  }

  const UpdPostWithParams = function(Component){
    let id    = parseInt(useParams().id);
    let post  = posts.find(post => post.id === id);
    return <UpdatePost
            updFunc={updPost}
            post={post}/>
  }

  
  if(isError)
    return (<div className="conteiner__error-block">Ошибка загрузки</div>)

  if(isLoading)
    return (<Loading/>)
  
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
          <div id="conteiner__button-new-post">
            <Link to="posts/new">Новая запись</Link>
          </div>
          <Posts posts={posts}/>
          </>
        }/>
        <Route path="posts/new/*" 
            element={<NewPostComponent postFunc={addPost}/>}/>
        <Route path="posts/:id/*"
            element={<ChangePost/> }/>
        <Route path="posts/:id/upd/*"
            element={<UpdPostWithParams/>}/>
      </Routes>
    </div>
  );
}

export default App;
