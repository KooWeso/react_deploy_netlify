import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Missing from './Missing'
import api from './api/posts'
import { useContext, useEffect, useState } from 'react'
import DataContext from './context/DataContext'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const { posts, setPosts, navigate, format } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find((post) => post.id.toString() === id.toString())

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, datetime, body: editBody }
    try {
      const response = await api.put('/posts/' + id, updatedPost)
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      )
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (err) {
      console.log(`Edit Error: ${err.message}`)
    }
  }

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post, setEditTitle, setEditBody])
  return (
    <main className='NewPost'>
      {editTitle && (
        <>
          <h2>NewPost</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              type='text'
              id='postTitle'
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post: </label>
            <textarea
              id='postBody'
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            ></textarea>
            <button type='submit' onClick={() => handleEdit(post.id)}>
              Submit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <Missing />
          <p>
            {`Maybe you meant post ${(id + '')[0]}? ==> `}
            <Link to={`/post/${(id + '')[0]}`}>{`Post ${(id + '')[0]}`}</Link>
          </p>
          <p>
            <Link to={'/'}>TO HOME PAGE</Link>
          </p>
        </>
      )}
    </main>
  )
}

export default EditPost
