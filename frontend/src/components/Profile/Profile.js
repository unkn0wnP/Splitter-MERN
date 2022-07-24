import React from 'react'
import Navbar from './Navbar'

export default function Profile() {
  const uname = localStorage.getItem("username");
  return (
    <>
    <Navbar username={uname} />
    <div>Profile</div>
    </>
  )
}
