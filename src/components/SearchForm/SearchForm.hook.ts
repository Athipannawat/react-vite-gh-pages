import { useEffect } from 'react'
import { cryptroListServices } from '../../service/index'
import { useForm } from 'react-hook-form'
import { useCryptoListStore } from '../../store/cryptoList'

const useSearchForm = () => {
    const { register, watch  } = useForm()
    const {setfetchCryptroList} = useCryptoListStore()
    const keyword = watch("limit")

    const callData = async (limit:number) => {
        const responseList = await cryptroListServices.getCryptroList(0,limit)
        setfetchCryptroList({data: [],loading: true,error: null,})

        if(responseList.status === 200 ){
            const responseResults = responseList.data?.data || []
            setfetchCryptroList({data: responseResults,loading: false,error: null,})
        }else{
            setfetchCryptroList({data: [],loading: false ,error: responseList.error,})
        }

    }
    useEffect(() => {
        callData(keyword)
    }, [keyword])

    return {
        fieldKeyword : register("limit"),
    }
}

export { useSearchForm }