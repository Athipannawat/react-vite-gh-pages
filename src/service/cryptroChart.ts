import axios from "axios"
import { API_KEY, CRYPTRO_CHART_URL } from '../utils/constant'
import { ICryptroChartRespone } from '../interface/cryptroDetail'
import { IResponse, handleResponse } from "../utils/handleResponse"

interface IGetCryptroDetailRespone extends IResponse{
    status:number | undefined,
    data?:ICryptroChartRespone[]
}

///?apikey=bH932F0RaECyJBBEPPyIRvPMm2Ols08s 
///https://financialmodelingprep.com/api/v3/historical-chart/5min/BTCUSD?from=2023-08-10&to=2023-09-10&apikey=bH932F0RaECyJBBEPPyIRvPMm2Ols08s


export const cryptsroChartService = {
    
    getCryptroChart : async (symbol:string,dayFrom:string,dayTo:string) :Promise<IGetCryptroDetailRespone> => {
        try {
            const responedetail = await axios.get(`${CRYPTRO_CHART_URL}/1hour/${symbol}USD?from=${dayFrom}&to=${dayTo}${API_KEY}`);
            return handleResponse.success(responedetail)   
        } catch (error:any) {
            return handleResponse.error(error)
        }
    },
}