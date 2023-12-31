import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";


const PeopleDirectory = () => {
    const [users, setUsers] = useState(null)
    const [posts, setPosts] = useState(null)
    const fetchUsers = async() => {
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data)
        }catch(err){
            console.log("err",err)
        }
    }

    const fetchPosts = async() => {
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data)
        }catch(err){
            console.log("err",err)
        }
    }

    useEffect(() => {
        fetchUsers()
        fetchPosts()
    },[])

    const getPostForParticularUser = (id) => {
        return posts?.filter((post) => post.userId === id)
    }
    return (
        <div className="directory-container">
            <div>
                <h1 className="heading"> Directory </h1>
            </div>
            <div id="user-list">
                <ul>
                    {users?.map((user) => <li key={user.id}><UserCard user={user} posts={getPostForParticularUser(user.id)}/></li>)}
                </ul>
            </div>
        </div>
    )
}

export default PeopleDirectory