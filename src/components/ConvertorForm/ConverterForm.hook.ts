import React, { useEffect, useState } from 'react'
import { cryptroListServices,cryptroDetailServices } from '../../service/index'
import { ICryptroDetailRespone } from '../../interface/cryptroDetail'
import { useForm } from 'react-hook-form'
import { useCryptoListStore } from '../../store/cryptoList'


const useConverterForm = () => {
    const { register, handleSubmit, watch, formState: {errors}  } = useForm()
    const keywordLeft = watch("SelectLeft")
    const keywordRight = watch("SelectRight")
    const keywordVolume = watch("Volume")

    const [finalAnswer,setFinalAnswre] = useState<number>(0)

    const findByConverter = (SelectLeft:string,SelectRight:string,Volume:number) => {
        console.log(SelectLeft)
        console.log(SelectRight)
        console.log(Volume)
        const usdLeft = Number(SelectLeft)
        const usdRight = Number(SelectRight)
        const answer = Volume*(usdLeft/usdRight) 
        setFinalAnswre(answer)
    }

    useEffect(() => {
        findByConverter(keywordLeft,keywordRight,keywordVolume)
    }, [keywordLeft,keywordRight,keywordVolume])

    return {
        fieldKeyLeft : register("SelectLeft"),
        fieldKeyRight : register("SelectRight"),
        fieldKeyVolume : register("Volume"),
        finalAnswer
    }
}

export { useConverterForm }