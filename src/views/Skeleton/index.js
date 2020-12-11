import { Skeleton } from '@material-ui/lab'
import React from 'react'
import './style.css'

export default function index() {
  return (
    <div className='skeleton-view'>
      <TitleSkeleton />
      <div className='skeleton-body'>
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  )
}

export function TitleSkeleton() {
  return <Skeleton animation='wave' variant='text' height={120} width={640} />
}

export function ClassCardSkeleton() {
  return (
    <Skeleton
      className='skeleton-class-card'
      animation='wave'
      variant='rect'
      height='170px'
      width={500}
    ></Skeleton>
  )
}

export function PostSkeleton() {
  return (
    <div className='post'>
      <div className='post-top-section'>
        <Skeleton
          animation='wave'
          variant='circle'
          height='44px'
          width='44px'
        />
        <div className='details' style={{ marginLeft: '10px' }}>
          <Skeleton animation='wave' variant='text' height='30px' width='40%' />
          <Skeleton animation='wave' variant='text' height='20px' width='20%' />
        </div>
      </div>
      <div className='post-middle-section'>
        <Skeleton
          animation='wave'
          style={{ marginLeft: '20px', marginBottom: '5px' }}
          variant='text'
          height='30px'
          width='80%'
        />
        <Skeleton animation='wave' variant='rect' height='200px' width='100%' />

        <div className='audience-interaction'>
          <Skeleton animation='wave' height='45px' width='100px' />
          <Skeleton animation='wave' height='45px' width='100px' />
          <Skeleton animation='wave' height='45px' width='100px' />
        </div>
      </div>
      <div className='post-bottom-section'>{/* <Comment/> */}</div>
    </div>
  )
}
