import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Author from '../../components/Author'
import Header from '../../components/Header'
import Post from '../../components/Post'
import './style.css'
import Loading from '../../components/Loading'

export default function Homepage(props) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  useEffect(() => {
    if (!localStorage.getItem('userData')) {
      console.log('if part run')
      axios
        .get('http://localhost:5000/api/user/current', {
          headers: {
            Authorization: token
          }
        })
        .then((response) => {
          if (response.data) {
            setUserData(response.data)
            localStorage.setItem('userData', JSON.stringify(response.data))
          }
        })
        .catch((error) => console.log(error))
    }
    axios
      .get('http://localhost:5000/api/post/myposts', {
        headers: {
          Authorization: token
        }
      })
      .then((response) => {
        setData(response.data.mypost)
        setTotalPosts(response.data.length)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }, [totalPosts])
  return (
    <div className='home-wrappper'>
      <div className='home-container'>
        <div className='home-main'>
          <Header user={userData ? userData.name : ''} />
          <div className='body-section'>
            <Author total={totalPosts} setTotal={setTotalPosts} />
            {data
              ? data.map((item) => (
                  <Post
                    key={item._id}
                    id={item._id}
                    user={item.postedBy.name}
                    content={item.content}
                    date={item.date_created}
                    likes={item.likes}
                  />
                ))
              : "Sorry! you Don't Have any post"}
            {loading ? <Loading /> : null}
          </div>
        </div>
      </div>
    </div>
  )
}
