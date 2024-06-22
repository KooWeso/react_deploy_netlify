import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const navigate = useNavigate()

  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  )

  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLocaleLowerCase()) ||
        post.title.toLowerCase().includes(search.toLocaleLowerCase())
    )
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  //useAxiosFetch now doing a better job than this =>
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get('/posts')
  //       setPosts(response.data)
  //     } catch (err) {
  //       if (err.response) {
  //         //Not in the 200 response range
  //         console.log(err.response.data)
  //         console.log(err.response.status)
  //         console.log(err.response.headers)
  //       } else console.log(`Error: ${err.message}`)
  //     }
  //   }

  //   fetchPosts()
  // }, [])

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
        format,
        navigate,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export default DataContext
