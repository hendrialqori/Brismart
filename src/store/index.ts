import { atom } from "recoil";

type Pages = {
  id: string;
  name: string,
  image?: Blob | null
}

export const imageState = atom<FileList | null>({
  key: 'imagaState',
  default: null
})

export const pagesState = atom<Pages[]>({
  key: 'pagesState',
  default: []
})

export const temporaryRectState = atom<{
  x: number,
  y: number
} | null>({
  key: 'temporaryRect',
  default: null
})