import {Component, useState, useEffect} from 'react'

import RepoList from '../RepoList'

import './index.css'

const GithubRepo = () => {
  const [repos, setRepos] = useState([])
  const [page, setPage] = useState(1)

  const getDateOneMonthAgo = () => {
    const today = new Date()
    const oneMonthAgo = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate(),
    )
    return oneMonthAgo.toISOString().split('T')[0]
  }

  const fetchRepos = async () => {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>${getDateOneMonthAgo()}&sort=stars&order=desc&page=${page}`,
    )

    if (response.ok) {
      const {items} = await response.json()
      if (items && Array.isArray(items)) {
        setRepos(prevRepos => [...prevRepos, ...items])
        // Use otherData as needed
        console.log('Remaining data:', typeof items)
      } else {
        console.error('Data is not in the expected format:', items)
      }
    } else {
      console.error('Request failed with status:', response.status)
    }
  }

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return
    setPage(page + 1)
  }

  useEffect(() => {
    fetchRepos()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <div className="container">
      <h1>Most Starred Repos</h1>
      <RepoList repos={repos} />
    </div>
  )
}

export default GithubRepo
