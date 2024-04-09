import { useSearchForm } from './SearchForm.hook'
import './SearchForm.css'

const SearchForm = () => {
  const {fieldKeyword} = useSearchForm()
  return (
    <div className='itemBox' >
      <div className='barLetf'>   
        <div className='itemRank w-[100px]'>
          <div>RANK</div>
          <div>
            <form className="max-w-sm mx-auto">
            <label htmlFor="underline_select" className="sr-only"></label>
              <select {...fieldKeyword} id="limit" className="block ml-1 pl-2 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer ">
                  <option  value="10">10</option>
                  <option  value="20">20</option>
                  <option  value="50">50</option>
                  <option  value="100">100</option>
              </select>
          </form>
          </div>
        </div>
        <div className='w-[80px]' >SYMBOL</div>
        <div className='w-[160px]' >NAME</div>
      </div>  
      <div className='w-[150px]' >PRICE(USD)</div>
    </div>
  )
}

export default SearchForm