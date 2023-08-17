import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from "./component/header"
import { Workspace } from "./component/workspace"
import { Footer } from "./component/footer"

export default function Home() {

  const navigate = useNavigate()

  React.useEffect(() => {
    navigate(`/?pageId=09rjfi4f-dno3u4yr98-3089rufn`)
  }, [navigate])

  return (
    <main className="h-screen grid grid-rows-[60px_1fr_60px]">
      <Header />
      <Workspace />
      <Footer />
    </main>
  )
}