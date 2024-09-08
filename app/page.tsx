"use client"

import { useEffect, useState } from "react";



export default function Home() {

  const[input,setInput] = useState<string>('')
  const[searchResult,setsearchResult] = useState<{
    results: string[]
    duration: number
  }>()

  useEffect(() => {
    const fetchData = async () => {
      if(!input) return setsearchResult(undefined)
      
      const res = await fetch(`/api/search?q=${input}`)
    }
    fetchData()
  })


  return (
    <div >
      <input value={input} onChange={(e) => {
        setInput(e.target.value)
      }} type="text"/>
    </div>
  );
}
