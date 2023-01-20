import Post from "./Post.js";

export default function Posts({posts=[]}){
    console.log(posts);
    const time = Date.now();
    return (
        <div id="conteiner__posts">
            {
                posts.map(post => <Post key={post.created} body={post} time={time}/>)
            } 
        </div>
    );
}