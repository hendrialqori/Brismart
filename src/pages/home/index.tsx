import { Sidebar } from "./component/sidebar"
import { Canvas } from "./component/canvas"

export default function Home() {
  return (
    <main className="flex w-full min-h-screen">
      <Sidebar />
      <Canvas />
    </main>
  )
}