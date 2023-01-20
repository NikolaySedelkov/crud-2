import NewPostComponent from "./NewPostComponent";

export default function UpdatePost({post, updFunc}){
    return <NewPostComponent 
                startPost={post}
                postFunc={updFunc}
                id={post.id}/>;
}