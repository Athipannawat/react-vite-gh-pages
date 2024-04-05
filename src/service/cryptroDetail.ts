import axios from "axios"
import { CRYPTRO_BASE_URL } from '../utils/constant'
import { ICryptroDetailRespone } from '../interface/cryptroDetail'
import { IResponse, handleResponse } from "../utils/handleResponse"

interface IGetCryptroDetailRespone extends IResponse{
    status:number | undefined,
    data?:ICryptroDetailRespone[]
}


//https://api.coinlore.net/api/tickers/?start=0&limit=100 all
//https://api.coinlore.net/api/ticker/?id=90 onlyone

export const cryptroDetailServices = {
    getCryptroDetail : async (id:string) :Promise<IGetCryptroDetailRespone> => {
        try {
            const responedetail = await axios.get(`${CRYPTRO_BASE_URL}ticker/?id=${id}`)
            //console.log(responedetail)
            return handleResponse.success(responedetail)   
        } catch (error:any) {
            return handleResponse.error(error)
        }
    },
}