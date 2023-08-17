import React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useRecoilState } from "recoil"
import { pagesState } from "@/store"
import { Modal } from "@/component/modal"
import { cn } from "@/utils/clsx"
import { RiPencilFill } from 'react-icons/ri'

export const Sidebar = () => {

  const navigate = useNavigate()

  const [query] = useSearchParams()

  const [pages, setPages] = useRecoilState(pagesState)

  const [namePage, setNamePage] = React.useState("")

  const [modalCreatePage, setModalCreateModal] = React.useState(false)

  const toggleModalcreatePage = () => setModalCreateModal(prev => !prev)

  const handleChangePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNamePage(e.target.value)
  }

  const handleEditPageName = (name: string) =>
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setModalCreateModal(true)
      setNamePage(name)
    }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!namePage) return;

    const tempPages = [...pages].map((data) => {
      return data.id === query.get('pageId') ? { ...data, name: namePage } : data
    })
    setPages(tempPages)

    setNamePage("")

    setModalCreateModal(false)
  }

  const moveToTargetPage = (id: string) => () => {
    navigate('/?pageId=' + id)
  }

  const activePage = (id: string) => query.get('pageId') === id

  return (
    <>
      <aside
        // className="w-[] bg-gray-100 min-h-[calc(100vh-130px)]"
        className="bg-gray-100 overflow-auto col-span-2"
        aria-label="root-sidebar"
      >
        <div className="mt-3 rounded-sm mx-2 flex flex-col gap-y-3">
          {pages.map((page) => (
            <div
              key={page.id}
              className={cn(
                "px-4 py-2 flex items-center justify-between bg-[#D9D9D9] cursor-pointer",
                activePage(page.id) ? 'ring-4 ring-red-400' : ''
              )}
              onClick={moveToTargetPage(page.id)}
              role="button"
              tabIndex={0}
            >
              <h2 className="text-lg tracking-wide">{page.name}</h2>
              <button onClick={handleEditPageName(page.name)}>
                <RiPencilFill className="text-2xl" />
              </button>
            </div>
          ))}
        </div>
      </aside>

      <Modal show={modalCreatePage}>
        <div className="bg-white rounded-lg shadow-sm p-6 w-4/12">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-2">
              <label htmlFor="">Edit page name</label>
              <input
                className="rounded-lg focus:outline-gray-300 transition"
                type="text"
                value={namePage}
                onChange={handleChangePageInput} />
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



{/* <div className="mt-3 flex items-center justify-center gap-3" aria-label="button-group">
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
</section> */}