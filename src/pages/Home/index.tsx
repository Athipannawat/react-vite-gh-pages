import { Link } from 'react-router-dom'
import SearchForm from '../../components/SearchForm/SearchForm'
import { useCryptoListStore } from '../../store/cryptoList'
import './indexHome.css'
import { addSign } from '../../utils/number'
import { getClassFromNumber } from '../../utils/css'
import ConverterForm from '../../components/ConvertorForm/ConverterForm'
import { useState } from 'react'
import { ICryptroDetailRespone } from '../../interface/cryptroDetail'

const HomePage = () => {
  
  const { fetchCryptro } = useCryptoListStore()

  const [currentPage,setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  //getCurrent post
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const Posts = fetchCryptro.data;
  const currentPosts:ICryptroDetailRespone[] = Posts.slice(indexOfFirstPost,indexOfLastPost);
  
  //Chang page
  const pageNumbers = [];
  for(let i = 1 ; i <= Math.ceil(Posts.length / postsPerPage); i++){
        pageNumbers.push(i)
    }

  return (
    <div className='all'>
      <div className='topbar'>
        <div className='logo'>
          <div className='image'><img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/bitcoin-black-icon.png" alt="" /></div>
          <div>
              <div className='logoTop'>COID</div>
              <div className='logoButtom'>VIEWER</div>
          </div>
        </div>
        <div className='buttonTopbar'>
          <div className="button">
          <Link to={"/favouritePage"}>FAVOURITE LIST</Link>
        </div>
        </div>
      </div>
      <div className='rankShow'>
        <div className=' mt-[50px] ml-[50px] button '>
        TOP RANK LIST
        </div>
        <div className='itemcontainer min-w-[550px] mt-[10px]'>
          <SearchForm />
          {currentPosts.map((item) => {
            return (
              <div >
                <Link to={`/CryptroDetailPage/${item.id}`} key={item.rank}  className='itemBoxShow' >
                  <div className='itemListDetail'>
                    <div className='itemList w-[100px]'>{item.rank}</div>
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
          <div className='paginate'>
            {pageNumbers.map((number) => {
                return(
                    <div>
                        <a className='paginatelink' onClick={()=> setCurrentPage(number)} href="#">{number}</a>
                    </div>
                )
            })}
          </div>
        </div>
      </div>
      <div className='CALCULATORContainer  mb-[30px]'>
        <div className='CALCULATORBox'>
          <div className='button m-[0]'>
            CRYPTOCURRENCY CONVERTER CALCULATOR
          </div>
          <div className='mt-[10px]'>
            <ConverterForm />
          </div>
        </div>        
      </div>
    </div>
  )
}

export default HomePage

