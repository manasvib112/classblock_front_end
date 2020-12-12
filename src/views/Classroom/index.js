import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ClassNewPost from '../../components/ClassNewPost'
import Header from '../../components/Header'
import Post from '../../components/Post'
import './style.css'
import { TitleSkeleton, PostSkeleton } from '../../views/Skeleton'

export default function Homepage(props) {
  console.log(props.match)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem('userData'))
  )
  const [classData, setClassData] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/classroom/class/${props.match.params.id}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then((response) => {
        console.log(response.data)
        setClassData(response.data.result)
        setPosts(response.data.result.posts.reverse())
        setTotalPosts(response.data.result.posts.length)
        setLoading(false)
      })
      .catch((error) => console.log(error))
  }, [totalPosts])

  return (
    <div className='classroom-wrapper'>
      <div className='classroom-container'>
        <Header user={userData ? userData.name : ''} />
        <div className='classroom-main'>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              <h1 className='title'>{classData ? classData.name : 'None'}</h1>

              <div className='classroom-timeline'>
                <ClassNewPost
                  classId={props.match.params.id}
                  total={totalPosts}
                  setTotal={setTotalPosts}
                />
                {posts.length ? (
                  posts.map((item) => (
                    <Post
                      key={item._id}
                      id={item._id}
                      user={item.postedBy.name}
                      content={item.content}
                      date={item.date_created}
                      likes={item.likes}
                      media={item.media}
                      image={item.postedBy.image}
                    ></Post>
                  ))
                ) : (
                  <h2>No Posts yet</h2>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <div>
      <TitleSkeleton />
      <div className='classroom-timeline'>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  )
}
