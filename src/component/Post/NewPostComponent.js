import {Routes, Route, NavLink, Link, useParams } from "react-router-dom";
import { useState } from 'react';

const emptyPost = {
    content: "",
    picture: null
}

export default function NewPostComponent(props){
    const [post, setPost] = useState(props.startPost);
    let action;
    if(props.id !== 0)
        action = "Изменить";
    else
        action = "Создать"

    const hangeChangeText = evt => {
        setPost({
            ...post, content: evt.target.value
        })
    }

    const hangeChangePicture = evt => {
        let fr = new FileReader();
        fr.onload = function () {
            setPost({
                ...post, picture: fr.result
            })
        }
        fr.readAsDataURL(evt.target.files[0]);
    }

    const submitForm = () => {
        delete post.picture;
        props.postFunc({...post, id: props.id});
        setPost(emptyPost);
    }
    return (
        <form id="form-pos">
            <div id="conteiner__form-pos">
                <div id="conteiner__navlink">
                    <NavLink to="text">{action} текст</NavLink><NavLink to="foto">{action} Фото/Видео</NavLink>
                </div>
                <Routes>
                    <Route path="text" element={
                        <textarea
                        id="textarea__form-pos" 
                        form="form-pos" 
                        placeholder="Введите текст поста"
                        value={post.content}
                        onChange={hangeChangeText}/>
                    }/>
                    <Route path="foto" element={
                        <>
                            <input
                            id="file__form-pos" 
                            type="file"
                            onChange={hangeChangePicture}/>
                            <figure className="figure-form-pos">
                                <figcaption>
                                    <label className="label-file-form" htmlFor="file__form-pos">
                                        {post.picture?"Изменить изображение":"Добавить изображение!"}
                                    </label>
                                </figcaption>
                                {post.picture?<img id="value__file-form-pos" src={post.picture}/>:null}
                            </figure>
                        </>
                    }/>
                </Routes>
                <button id="buttom__form-pos" type="button" onClick={submitForm}>{action} пост</button>
            </div>
            <Link id="close-button-form-pos" className="button" to="/">x</Link>
        </form>
    )
}


NewPostComponent.defaultProps = {
    startPost: emptyPost,
    id: 0
};