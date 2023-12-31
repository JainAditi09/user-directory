import React from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
const UserCard = ({ user, posts }) => {
    const { name } = user
    const navigate  = useNavigate()
    return (
        <div className="user-container" onClick={() => navigate(`/user/${user.id}`)}>
            <div>
                <h4>{name}</h4>
            </div>
            <div>
                <h4>Posts : {posts?.length}</h4>
            </div>
        </div>
    )
}

export default UserCard