import { create } from 'zustand'
import { ICryptroDetailRespone } from '../interface/cryptroDetail'

const initStore = {
    cryptro: {
        data: [],
        loading: false,
        error: null,
    },
    fetchCryptro: {
        data: [],
        loading: false,
        error: null,
    },
}

type cryptroType = {
    [x: string]: any
    data: ICryptroDetailRespone[],
    loading: boolean,
    error: null | any ,
}

type UseCryptoListStoreType = {
  cryptro: cryptroType,
  fetchCryptro: cryptroType,
  setCryptroList:(value:cryptroType) => void,
  setfetchCryptroList:(value:cryptroType) => void,
  clearCryptro:()=>void,
}

export const useCryptoListStore = create<UseCryptoListStoreType>((set) => ({
  ...initStore,
  setCryptroList:(value:cryptroType) => set({cryptro:value}),
  setfetchCryptroList:(value:cryptroType) => set({fetchCryptro:value}),
  clearCryptro:()=>set({...initStore})
}))

