import React from 'react'

interface props {
    children: React.ReactNode;
  }

const Container = ({children} : props) => {
  return (
    <div className='mx-auto min-h-screen flex flex-col'>{children}</div>
  )
}

export default Container