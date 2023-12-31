import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CountryCard from "../../components/CountryCard";
import PostCard from "../../components/PostCard";
import "./style.css";

const UserProfile = () => {
  const params = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const fetchUsers = async (id) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      setUserDetails(response.data);
      
    } catch (err) {
      console.log("err", err);
    }finally{
        setIsLoading(false)
    }
  };

  const fetchPosts = async (id) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const { data } = response;
      const postData = data?.filter((post) => post.userId == id);
      setPosts(postData);
    } catch (err) {
        console.log("err", err);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchUsers(params.id);
      fetchPosts(params.id);
    }
  }, [params.id]);

  return (
    <>
    {userDetails ? <div className="user-profile">
    <div className="heading">
        <h1>Profile Page</h1>
      </div>
        <div>
            <CountryCard />
        </div>
     
      <div className="name-card">
        <div>
          <h3>
            {userDetails?.name} <br />
          </h3>
          <h4>
            {userDetails?.username} | {userDetails?.company?.catchPhrase}
          </h4>
        </div>
        <div>
          <h4>
            {userDetails?.address?.street}, {userDetails?.address?.city}
          </h4>
          <h4>
            {userDetails?.email} | {userDetails?.phone}
          </h4>
        </div>
      </div>
      <div className="post-container">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div> : <div className="user-profile"> 
    <h3>{isLoading ? 'Loading .....': 'No user Found'}</h3>
    </div>}
    </>
  );
};

export default UserProfile;
