import React, { useEffect } from 'react'
import { cryptroListServices,cryptroDetailServices } from '../../service/index'
import { useForm } from 'react-hook-form'
import { useCryptoListStore } from '../../store/cryptoList'

const useSearchForm = () => {
    const { register, handleSubmit, watch, formState: {errors}  } = useForm()
    const {setfetchCryptroList} = useCryptoListStore()
    const keyword = watch("limit")

    const callData = async (limit:number) => {
        const responseList = await cryptroListServices.getCryptroList(0,limit)
        const crypList = []
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