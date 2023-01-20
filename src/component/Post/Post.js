import {Link} from "react-router-dom"

export default function Post({body, time, isUpdate=false}){
    return (
        <div className="conteiner__post">
            <p className="header-post">
                {`User#${body.id} `}
                <span className="date-timer-post">{`${Math.floor((time - new Date(body.created)) / 60000)} мин`}</span>
                {isUpdate?null:<Link to={"posts/" + body.id}>✍️</Link>}
            </p><hr/>
            <p className="body-post">{body.content}</p>
        </div>
    );
}