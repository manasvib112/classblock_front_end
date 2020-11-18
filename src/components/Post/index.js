import React, { useState, useEffect } from 'react'
import './style.css'
import profile from '../../../src/asset/images/profile.jpeg'
import {
  InsertEmoticon,
  InsertCommentRounded,
  LaunchSharp,
  MoreHorizSharp
} from '@material-ui/icons'
import axios from 'axios'
import Comment from '../Comment'
import NewComment from '../NewComment'
import { isEmpty } from 'lodash'

const formatDate = (dateString) => {
  let date = String(Date(dateString)).split(' ')
  date = `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`
  return date
}

export default function Post({ id, date, user, content, media = null }) {
  const userData = JSON.parse(localStorage.getItem('userData'))
  const date_created = formatDate(date)
  const [commentsData, setCommentsData] = useState([])
  const [total, setTotal] = useState(0)
  const Authorization = localStorage.getItem('token')
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState()
  const [likes, setLikes] = useState([])
  // console.log(content, isLiked, likes)
  const handleLike = () => {
    if (isLiked === true) {
      console.log('calling unlike')
      axios
        .put(
          'http://localhost:5000/api/post/unlike',
          { id },
          { headers: { Authorization } }
        )
        .then((response) => {
          if (!isEmpty(response)) {
            setIsLiked(false)
            const val = likeCount - 1
            setLikeCount(val)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      axios
        .put(
          'http://localhost:5000/api/post/like',
          { id },
          { headers: { Authorization } }
        )
        .then((response) => {
          if (!isEmpty(response)) {
            setIsLiked(true)
            const val = likeCount + 1
            setLikeCount(val)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/post/get-comments', {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
        params: { id }
      })
      .then((response) => {
        if (response.data) {
          setTotal(response.data.length)
          setCommentsData(response.data)
        }
      })
      .catch((error) => console.log(error))
    if (likes && userData) {
      let check = likes.filter((item) => item._id === userData.id)
      setIsLiked(check.length > 0)
      // console.log('user', content, check, likes, isLiked)
    }
    axios
      .get('http://localhost:5000/api/post/get-likes', {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
        params: { id }
      })
      .then((response) => {
        // console.log(response)
        if (response) {
          setLikeCount(response.data.count)
          setLikes(response.data.likes)
        }
      })
      .catch((error) => console.log(error))
  }, [total])
  return (
    <div className='post'>
      <div className='post-top-section'>
        <img src={profile} alt='profile' />
        <div className='details'>
          <span>{user}</span>
          <span className='date'>{date_created}</span>
        </div>
        <MoreHorizSharp className='dots' />
      </div>
      <div className='post-middle-section'>
        <p className={media ? 'normal-text' : 'large-text'}>{content}</p>
        {media ? <div className='media-container'></div> : null}

        <div className='audience-interaction'>
          <div
            className={isLiked ? 'like active' : 'like'}
            onClick={handleLike}
          >
            <InsertEmoticon />
            <span>Like </span>
            {likeCount < 1 ? null : <div className={'count'}>{likeCount}</div>}
          </div>
          <div className='comment'>
            <InsertCommentRounded />
            <span>Comment</span>
          </div>
          <div className='share'>
            <LaunchSharp />
            <span>Share</span>
          </div>
        </div>
      </div>
      <div className='divider' />
      <div className='post-bottom-section'>
        <NewComment id={id} total={total} setTotal={setTotal} />
        {commentsData.map((item) => (
          <Comment name={''} body={item.body} name={item.postedBy.name} />
        ))}
      </div>
    </div>
  )
}
