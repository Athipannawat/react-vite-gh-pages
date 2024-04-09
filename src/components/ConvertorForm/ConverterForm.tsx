import { useCryptoListStore } from '../../store/cryptoList'
import { useConverterForm } from './ConverterForm.hook'
import './Converter.css'

const ConverterForm = () => {
    const {fieldKeyLeft , fieldKeyRight , fieldKeyVolume , finalAnswer} = useConverterForm()
    const { fetchCryptro } = useCryptoListStore()
  return (
    <div className='converterCon'>
        <div className='converterCard text-black' >   
            <div className=' converterBox'>
                <div className='converterInput'>
                    <form >
                        <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                        <input type="number" id="Volume" defaultValue = "1" {...fieldKeyVolume} aria-describedby="helper-text-explanation"  min='1'  
                        className=" block   text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer " required />
                    </form>
                </div>
                <div className='converterSelect'>
                    <form className="max-w-sm mx-auto">
                    <label htmlFor="underline_select" className="sr-only"></label>
                        <select {...fieldKeyLeft} id="SelectLeft" className="block ml-1 pl-2 px-0 w-[220px] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer ">
                            <option>CHOOSE A COIN</option>
                            {fetchCryptro.data.map((item) => {
                                return (
                                    <option value={item.price_usd} >{item.name} ({item.symbol})</option>                          
                                )
                            })}
                        </select>
                    </form>
                </div>
            </div>
            <div>
                <button className=" m-[5px]" >TO</button>
            </div>
            <div className='converterBox'>
                <div className='converterOutput'>
                    <div>{finalAnswer?finalAnswer:0}</div>
                </div>
                <div className='converterSelect'>
                    <form className="max-w-sm mx-auto">
                    <label htmlFor="underline_select" className="sr-only"></label>
                        <select   {...fieldKeyRight} id="SelectRight" className="block ml-1 pl-2 px-0 w-[220px] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer ">
                            <option selected>CHOOSE A COIN</option>
                            {fetchCryptro.data.map((item) => {
                                return (
                                    <option value={item.price_usd} >{item.name} ({item.symbol})</option>                          
                                )
                            })}
                        </select>
                    </form>
                </div>
            </div>
        </div> 
    </div>
  )
}

export default ConverterForm