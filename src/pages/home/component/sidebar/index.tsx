import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import { imageState, pagesState, temporaryRectState } from "@/store"
import { PiImagesSquareThin } from 'react-icons/pi'
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { BiCheck } from 'react-icons/bi'
import { Modal } from "@/component/modal"
import { uuid } from "@/utils/uuid"
import { cn } from "@/utils/clsx"

export const Sidebar = () => {

  const navigate = useNavigate()

  const [query] = useSearchParams()

  const setImage = useSetRecoilState(imageState)

  const setTemporaryRect = useSetRecoilState(temporaryRectState)

  const [pages, setPages] = useRecoilState(pagesState)

  const [namePage, setNamePage] = React.useState("")

  const [expand, setExpand] = React.useState(false)

  const [modalCreatePage, setModalCreateModal] = React.useState(false)

  const toggleModalcreatePage = () => setModalCreateModal(prev => !prev)

  const handleChangePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamePage(e.target.value)
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setImage(image?.[0] as any)
  }

  const handleCreateTemporaryRect = () => {
    setTemporaryRect({
      x: 50,
      y: 50
    })
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!namePage) return;

    setPages(prev => [...prev, {
      id: uuid(),
      name: namePage
    }])

    setNamePage("")

    setModalCreateModal(false)

    setExpand(true)

  }

  const moveToTargetPage = (id: string) => () => {
    navigate('/?pageId=' + id)
  }


  return (
    <>
      <aside className="w-2/12 bg-gray-100 min-h-screen fixed" aria-label="root-sidebar">
        <div className="p-3">
          <div className="mt-3 flex items-center justify-center gap-3" aria-label="button-group">
            <button
              type="button"
              className="transition bg-white shadow-sm rounded-md font-light px-6 py-2 active:ring-2 active:ring-slate-600"
              onClick={toggleModalcreatePage}
            >
              Add page
            </button>
            <button
              className="transition bg-white shadow-sm rounded-md font-light px-2 py-2 active:ring-2 active:ring-slate-600"
              onClick={handleCreateTemporaryRect}
            >
              <div className="h-6 w-6 border-2 border-black" />
            </button>
            <>
              <label
                htmlFor="add-image"
                className="p-1 transition bg-white shadow-sm rounded-md font-light active:ring-2 active:ring-slate-600 cursor-pointer"
                // onClick={() => navigate('/', { replace: true })}
              >
                <PiImagesSquareThin className="text-3xl" />
              </label>
              <input id="add-image" type="file" className="hidden" onChange={handleImage} />
            </>
          </div>
          <section className="mt-6 px-3" aria-label="page">
            <button type="button" className="tracking-wide flex items-center gap-2 font-medium" onClick={() => setExpand(prev => !prev)}>
              Pages
              {expand ? < MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}

            </button>
            {expand ? (
              <div className="mt-4 flex flex-col gap-y-3" aria-label="page-list-wrapper">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={moveToTargetPage(page.id)}
                    className={cn(
                      "text-[.90rem] tracking-wide flex items-center justify-between px-10",
                      query.get('pageId') === page.id ? 'font-medium' : 'font-light'
                    )}
                    type="button"
                  >
                    <span className="">
                      {page.name}
                    </span>
                    <div className="">
                      {query.get('pageId') === page.id ? (
                        <BiCheck className="ml-auto mt-0" />
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </aside>

      <Modal show={modalCreatePage}>
        <div className="bg-white rounded-lg shadow-sm p-6 w-4/12">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-2">
              <label htmlFor="">Create new page</label>
              <input className="rounded-lg focus:outline-gray-300 transition" type="text" onChange={handleChangePageInput} />
            </div>

            <div className="flex justify-end gap-x-2 pt-3">
              <button
                className="transition px-4 py-2 bg-red-400 active:bg-red-300 rounded-md text-white"
                type="reset"
                onClick={toggleModalcreatePage}
              >
                Cencel
              </button>
              <button
                className="transition px-4 py-2 bg-blue-400 active:bg-blue-300 rounded-md text-white"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>

  )
}