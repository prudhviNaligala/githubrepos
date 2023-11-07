import React from 'react'
import './index.css'

const RepoList = ({repos}) => {
  console.log(repos)
  return (
    <div>
      {repos.map(repo => (
        <div key={repo.id} className="card">
          <div>
            <img className="img" src={repo.owner.avatar_url} alt={repo.name} />
          </div>
          <div>
            <a href={repo.html_url}>{repo.name}</a>
            <p>{repo.description}</p>
            <div className="stars">
              <div>
                <button className="btn">{repo.stargazers_count}</button>
                <button className="btn">{repo.open_issues_count}</button>
              </div>
              <p className="last">
                Last pushed on{repo.pushed_at} by {repo.name}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RepoList
