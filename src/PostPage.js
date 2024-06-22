import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Missing from './Missing'
import { useContext } from 'react'
import api from './api/posts'
import DataContext from './context/DataContext'
const PostPage = () => {
  const { posts, setPosts, navigate } = useContext(DataContext)
  const { id } = useParams()
  const post = posts.find((post) => post.id.toString() === id)

  const handleDelete = async (id) => {
    try {
      await api.delete('/posts/' + id)
      const postList = posts.filter((post) => post.id !== id)
      setPosts(postList)
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className='editButton'>Edit Post</button>{' '}
            </Link>
            <button
              className='deleteButton'
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>
          </>
        )}
        {!post && (
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
      </article>
    </main>
  )
}

export default PostPage
