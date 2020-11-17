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

const formatDate = (dateString) => {
  let date = String(Date(dateString)).split(' ')
  date = `${date[0]}, ${date[2]} ${date[1]} ${date[3]}`
  return date
}

export default function Post({
  id,
  date,
  user,
  content,
  media = null,
  liked = false
}) {
  const date_created = formatDate(date)
  const [commentsData, setCommentsData] = useState([])
  const [total, setTotal] = useState(0)
  const [isLiked, setIsLiked] = useState(liked)

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/post/get-comments', {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
        params: { id }
      })
      .then((response) => {
        console.log('comments', response.data)
        if (response.data) {
          console.log('total updated')
          setTotal(response.data.length)
          setCommentsData(response.data)
        }
      })
      .catch((error) => console.log(error))
  }, [total])
  // const handleLiked = () => {
  //   axios.put('http://localhost:5000/api/post/like')
  // }
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
          <div className='like'>
            <InsertEmoticon />
            <span>Like</span>
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
