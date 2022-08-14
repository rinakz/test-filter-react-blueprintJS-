import { HTMLTable, InputGroup } from '@blueprintjs/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../Redux/action'

function Table() {

  const dispatch = useDispatch()
  
  const { posts } = useSelector (s => s)

  const [search, setSearch] = useState('')
  const [page, setpage] = useState(10)
  const [load, setload] = useState(true)

  useEffect(() => {
    if (load && page <= 100) {
      dispatch(getPosts(page))
      setpage(prev => prev + 10)
      setload(false)
    }
  }, [load])


  useEffect(() => {
    document.addEventListener('scroll', scrollhandler)
    return () => document.removeEventListener('scroll', scrollhandler)
  },[])

  function scrollhandler(e) {
    if((e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight) < 100) {
      setload(true)
    }
  }

  return (
    <div className='tableContainer'>
          <InputGroup 
            className='postSearchInput'
            type={"search"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='search posts'
            round={true}
            large={true}
            leftIcon={"search"}
            />
      <HTMLTable bordered={true} interactive={true} striped={true} condensed={true}>
        <thead>
          <tr>
            {posts[1] && Object.keys(posts[1]).map((el,i) => 
            <th key={i}>{el.toUpperCase()}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {posts.filter(el => search ? 
          (el.title.toLowerCase().includes(search.toLowerCase()) || 
          el.body.toLowerCase().includes(search.toLowerCase())) :
          true).map(el =>
            <tr key={el.id}>
              <td>{el.userId}</td>
              <td>{el.id}</td>
              <td>{el.title}</td>
              <td>{el.body}</td>
            </tr>
          )}
        </tbody>
      </HTMLTable>
    </div>
  )
}

export default Table
