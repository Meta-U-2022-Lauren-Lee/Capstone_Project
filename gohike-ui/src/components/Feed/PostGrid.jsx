import * as React from "react"
import "./Feed.css"
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Select from 'react-select';

export default function PostGrid({ posts }) {
    if (posts == null) {
        return null
    }
    
    return (
        <div className="post-grid">
            {posts.length == 0 ? "No posts to display" :
                posts.map((post, index) => {
                    return (
                        <PostCard
                            key={index}
                            username={post.username}
                            trailName={post.trailName}
                            hikeId={post.hikeId}
                            caption={post.caption}
                            createdAt={post.createdAt}
                            img={post.picture}/>
                    )
                })
            }
        </div>
    )
}

export function PostCard({ username, trailName, hikeId, caption, createdAt, img }) {
    const months = [ "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December" ]
    const history = useNavigate()

    return (
        <div className="post-card">
            <h1 className="post-trail" onClick={() => {
                    history(`/find-hikes/${hikeId}`)
                }}>
                {trailName}
            </h1>
            <h2 className="post-user">
                <span onClick={() => {
                    history(`/view-profile/${username}`)
                }}>{`${username}`}</span>
                <span>{` • ${months[parseInt(createdAt.substring(5,7)) - 1]} ${createdAt.substring(8,10)}, ${createdAt.substring(0,4)}`}</span>
            </h2>
            <div className="post-card-section"> 
                <div className="post-pic-container">
                    <img className="post-pic" src={img}/>
                </div>
                <p className="post-caption">{caption}</p>
            </div>
        </div>
    )
}