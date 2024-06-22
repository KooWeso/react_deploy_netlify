import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import DataContext from './context/DataContext'

const Home = () => {
  const {
    searchResults: posts,
    isLoading,
    fetchError,
  } = useContext(DataContext)

  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading Posts . . .</p>}
      {!isLoading && fetchError && (
        <p className='statusMsg' style={{ color: 'red' }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p className='statusMsg'>No Posts to Display</p>
        ))}
    </main>
  )
}

export default Home
