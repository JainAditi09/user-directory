import React, { useState } from "react";
import PostPopup from "./PostPopup";
import './style.css';
const PostCard = ({ post }) => {
    const [showPopup, togglePostPopup] = useState(false)
    const { title, body } = post
    return (
       <>
         <div className="post" onClick={() => togglePostPopup(true)}>
            <h5>
                {title}
            </h5>
            <p>
                {body}
            </p>
        </div>
        {showPopup && <PostPopup title={title} content={body} onClose={() => togglePostPopup(false)}/>}
       </>
    )
}

export default PostCard