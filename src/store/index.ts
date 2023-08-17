import { atom } from "recoil";

export type Highlight = {
  id: string;
  name?: string;
  color?: string;
  pos1: number;
  pos2: number,
  targetPage: number | string
}

export type Pages = {
  id: string;
  name: string,
  image?: {
    data: string;
    pos1: number;
    pos2: number
  },
  highlight?: Highlight[]
}

export const imageState = atom<string>({
  key: 'imagaState',
  default: ""
})

export const pagesState = atom<Pages[]>({
  key: 'pagesState',
  default: [
    {
      id: '09rjfi4f-dno3u4yr98-3089rufn',
      name: 'Gambar 1',
      image: {
        data: "",
        pos1: 0,
        pos2: 0
      },
      highlight: []
    }
  ]
})

export const temporaryRectState = atom<{
  x: number,
  y: number
} | null>({
  key: 'temporaryRect',
  default: null
})

