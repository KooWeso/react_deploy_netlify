import React from 'react'
import { useState, useContext } from 'react'
import api from './api/posts'
import DataContext from './context/DataContext'

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const { posts, setPosts, format, navigate } = useContext(DataContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? (Number(posts.at(-1).id) + 1).toString() : '1'
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, datetime, body: postBody }
    try {
      const response = await api.post(`/posts`, newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log(`Submit Error: ${error.message}`)
    }
  }

  return (
    <main className='NewPost'>
      <h2>NewPost</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type='text'
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post: </label>
        <textarea
          id='postBody'
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost
