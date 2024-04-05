import axios from "axios"
import { CRYPTRO_BASE_URL } from '../utils/constant'
import { ICryptroListRespone } from '../interface/cryptroList'
import { handleResponse,IResponse } from '../utils/handleResponse'

interface IGetCryptroListRespone extends IResponse {
    status:number | undefined,
    data?:ICryptroListRespone
}


//https://api.coinlore.net/api/tickers/?start=0&limit=100 all
//https://api.coinlore.net/api/ticker/?id=90 onlyone


export const cryptroListServices = {
    getCryptroList : async (start?:number,limit?:number) :Promise<IGetCryptroListRespone> => {
        try {
            const respone = await axios.get(
            `${CRYPTRO_BASE_URL}tickers/?start=${start||0}&limit=${limit||10}`
            )
            return handleResponse.success(respone)   
        } catch (error:any) {
            return handleResponse.error(error)
        }
    },
}