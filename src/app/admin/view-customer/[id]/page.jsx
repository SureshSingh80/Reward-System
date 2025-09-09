'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const page = () => {

    const params = useParams();

  return (
    <div>{params.id}</div>
  )
}

export default page