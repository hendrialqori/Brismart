import { LiaDownloadSolid } from 'react-icons/lia'
import { blobToBase64 } from '@/utils/blobToBase64'
import { useSetRecoilState } from 'recoil'
import { pagesState as pagesStateStore } from '@/store'
import { uuid } from '@/utils/uuid'
import { useSearchParams } from 'react-router-dom'

export const Header: React.FC = () => {

  const [query] = useSearchParams()

  const setPagesState = useSetRecoilState(pagesStateStore)

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const base64image = await blobToBase64(files?.[0] as unknown as File)

    setPagesState(prev => {
      return prev.map((page) =>
        page.id === query.get('pageId')
          ? {
            ...page,
            image: {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              ...page.image!,
              data: String(base64image)
            }
          }
          : page)
    })
  }

  const handleAddPagesState = () => {
    setPagesState(prev => {
      return [
        ...prev,
        {
          id: uuid(),
          name: "Gambar " + (prev.length + 1),
          highlight: []
        }
      ]
    })
  }

  const handleAddRectanglePerPagesState = () => {
    setPagesState(prev => {
      return prev.map((page) => page.id === query.get('pageId') ?
        {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          ...page, highlight: [...page.highlight!, {
            id: uuid(),
            pos1: 10,
            pos2: 10,
            targetPage: '-',
            color: "gray",
            name: '-'
          }]
        }
        : page)
    })
  }

  return (
    <header className='bg-gray-300'>
      <nav className='px-5 py-3 flex items-center gap-x-4'>
        <>
          <label
            htmlFor="add-image"
            className='bg-gray-700 p-2 rounded-sm transition active:bg-gray-500 cursor-pointer'
          // onClick={() => navigate('/', { replace: true })}
          >
            <LiaDownloadSolid className="text-white text-2xl" />
          </label>
          <input id="add-image" type="file" className="hidden" onChange={handleAddImage} />
        </>
        <button
          className='bg-gray-700 p-3 rounded-sm transition active:bg-gray-500'
          onClick={handleAddRectanglePerPagesState}
        >
          <div className='h-4 w-4 bg-gray-100' aria-label='square' />
        </button>
        |
        <button
          onClick={handleAddPagesState}
          className='bg-gray-700 py-2 px-3 rounded-md transition active:bg-gray-500 text-white'
        >
          Add Page
        </button>
      </nav>
    </header>
  )
} 