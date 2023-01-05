import React, { Component, useEffect, useState } from 'react';
import { usePost } from '../context/PostContext';


function Post({ title, body, postId }) {

    const {setPostObj} = usePost();
    setPostObj({title: title,
        body: body, postId: postId})


    return (
        <div className='main-content'>
            <h2>{title}</h2>
            <h3>{postId}</h3>
            <p>{body}</p>
                </div>

                );
}

export default Post;
