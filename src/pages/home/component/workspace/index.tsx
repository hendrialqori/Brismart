import { Sidebar } from "./sidebar"
import { Canvas } from "./canvas"


export const Workspace = () => {
  return (
    <div className="grid grid-cols-9 overflow-hidden">
      <Sidebar />
      <Canvas />
    </div>
  )
}