import { useEffect, useState } from "react";
import { MY_FAV_LIST } from "../../utils/constant";
import { Link, useNavigate } from 'react-router-dom'
import { getClassFromNumber } from "../../utils/css";
import { addSign } from "../../utils/number";
import { ICryptroDetailRespone } from "../../interface/cryptroDetail";
import './favourite.css'


const FavouritePage = () => {

    const [favListShow,setFavListShow] = useState<ICryptroDetailRespone[]>([])
    const navigate = useNavigate()
    useEffect(()=>{
    const favListString = window.localStorage.getItem(MY_FAV_LIST);
    if(favListString){
      const favList = JSON.parse(favListString);
      setFavListShow(favList);
    }
    },[])

    return (
    <div>
        <div className="topBar">
            <div onClick={()=>{navigate(-1)}} className="button">
                Back
            </div>
        </div>
        <div className="mt-[20px]">
            <div className=' ml-[50px]  mb-[10px] button'>
            YOUR FAVOURITE LIST
            </div>
            <div className='itemcontainer min-w-[550px] mt-[10px]'>
                <div className='itemFavShow pb-[10px]'> 
                    <div className='flex items-center'>
                        <div className='w-[80px]' >SYMBOL</div>
                        <div className='w-[160px]' >NAME</div>
                    </div>
                    <div className='w-[150px]' >PRICE(USD)</div>
                </div>
                {favListShow.map((item)=>{
                    return (
                        <div >
                            <Link to={`/CryptroDetailPage/${item.id}`} className='itemBoxShow' >
                                <div className='itemListDetail'>
                                    <div className='w-[80px]'>{item.symbol}</div>
                                    <div className='w-[160px]'>{item.name}</div>
                                </div>
                                <div className='item'>{Number(item.price_usd).toLocaleString()}
                                    <span className={`${getClassFromNumber(Number(item.percent_change_24h))}` }>
                                        ({addSign(Number(item.percent_change_24h))}%)
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default FavouritePage



