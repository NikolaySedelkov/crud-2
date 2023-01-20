import Post from "./Post.js";
import {Link} from "react-router-dom";

export default function DeleteOrUpdatePost(props){
    return (
            <div className="conteiner__function-post">
                <Post body={props.body} time={props.time} isUpdate={true}/>
                <hr/>
                <Link className="button" to="upd">Изменить</Link>
                <Link className="button" to="/" onClick={ () => {
                        props.deletePostFunc(props.body);
                    }
                }>Удалить</Link>
                <Link id="close-button-open-post" className="button" to="/">x</Link>
            </div>
            
    )
}
