import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ICryptroChartRespone, ICryptroDetailRespone, } from "../../interface/cryptroDetail";
import { cryptroDetailServices } from "../../service";
import { addSign } from "../../utils/number";
import { getClassFromNumber } from "../../utils/css";
import "./indexcryptro.css";
import "../../utils/positiveNegative.css";
import { MY_FAV_LIST } from "../../utils/constant";
import { cryptsroChartService } from "../../service/cryptroChart";
import { Line } from "react-chartjs-2";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title , CategoryScale } from "chart.js";

Chart.register(CategoryScale);
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);

type cryptroType = {
  data: ICryptroDetailRespone | undefined;
  loading?: boolean;
  error?: null | any;
};

type cryptroChratType = {
  data: ICryptroChartRespone[] | undefined;
  loading?: boolean;
  error?: null | any;
};

const CryptroDetailPage = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [cryptro, setcryptro] = useState<cryptroType>({
    data: undefined,
    loading: true,
    error: null,
  });
  const [isFavourite, setIsFavourite] = useState(false);

  const callData = async (id: string) => {

    const response = await cryptroDetailServices.getCryptroDetail(id);
    if (response.status === 200) {
      const detail = response.data?.[0];
      //console.log(`response`, response);
      setcryptro({ data: detail, loading: false, error: null });
    } else {
      setcryptro({ data: undefined, loading: false, error: response.error });
    }
  };

  const [chardData,setChardData] = useState<cryptroChratType>({
    data: undefined,
    loading: true,
    error: null,
    });

  const symbol = cryptro.data?.symbol;
  let NowYear = new Date().getFullYear();
  let NowMonth = new Date().getMonth()+1;
  let NowDate = new Date().getDate();

  let NowMonthString = '';
  let NowDateString = '';

  if(NowMonth<10){
    NowMonthString = NowMonth.toString().padStart(2, '0')
  }
  else{
    NowMonthString = NowMonth.toString()
  }

  if(NowDate<10){
    NowDateString = NowDate.toString().padStart(2, '0')
  }
  else{
    NowDateString = NowDate.toString()
  }
  const dayTo = `${NowYear}-${NowMonthString}-${NowDateString}`
  
  let toMonth = NowMonth
  let toDate = NowDate-1
  let toMonthString = '';
  let toDateString = '';

  if(toMonth<10){
    toMonthString = toMonth.toString().padStart(2, '0')
  }
  else{
    toMonthString = toMonth.toString()
  }

  if(toDate<10){
    toDateString = toDate.toString().padStart(2, '0')
  }
  else{
    toDateString = toDate.toString()
  }
  let dayFrom = `${NowYear}-${toMonthString}-${toDateString}`
  
  
  const CryptroChart = async (symbol:string) => {
    const responseChart = await cryptsroChartService.getCryptroChart(symbol,dayFrom,dayTo);
    if (responseChart.status === 200) {
      setChardData({ data: responseChart.data?.reverse(), loading: false, error: null });
    } else {
      setChardData({ data: undefined, loading: false, error: null });
    }
  };

  useEffect(() => {
    if (symbol){
      CryptroChart(symbol)
    };
  }, [symbol]);
  
  useEffect(() => {
    if (id){
      callData(id)
    };
  }, [id]);

  const addFavourites = () => {
    const favListString = localStorage.getItem(MY_FAV_LIST);
    let favList = []
    if(favListString){
      favList = JSON.parse(favListString);
    }
    favList.push(cryptro.data);
    window.localStorage.setItem(MY_FAV_LIST, JSON.stringify(favList));
    setIsFavourite(true);
  }

  const removeFavourites = () =>{
    const favListString = localStorage.getItem(MY_FAV_LIST);
    let favList = []
    if(favListString){
      favList = JSON.parse(favListString);
    }
    favList = favList.filter((e:any)=> e.id !== cryptro.data?.id);
    window.localStorage.setItem(MY_FAV_LIST,JSON.stringify(favList));
    setIsFavourite(false);
  }

  useEffect(()=>{
    const favListString = localStorage.getItem(MY_FAV_LIST);
    if(favListString){
      const favList = JSON.parse(favListString);
      const Favourite = favList.some((e:any)=> e.id === cryptro.data?.id);
      setIsFavourite(Favourite)
    }
  },[cryptro]);


  return (
    <div className="page">
      <div className="topBar">
        <div onClick={()=>{navigate(-1)}} className="button">
                Back
                </div>
        <div className="button">
          {
          isFavourite ? 
          ( <button onClick={removeFavourites}>Remove From Favorites</button> )
          : ( <button onClick={addFavourites}>Add to Favorites</button> )
          }
        </div>
      </div>
      <div className="detailContainerBox">
        <div className="detailContainer">
          <div className="detailBoxOne">
            <div className="boxShowVersionOne">
              <div className="dataShowTop">
                <div className="dataName">{cryptro.data?.name}</div>
                <div className="dataSymbol">({cryptro.data?.symbol})</div>
              </div>
              <div className="dataShowUnder">
                <div>
                  {Number(cryptro.data?.price_usd).toLocaleString()} USD
                </div>
                <div
                  className={getClassFromNumber(
                    Number(cryptro.data?.percent_change_24h)
                  )}
                >
                  ({addSign(Number(cryptro.data?.percent_change_24h))}%)
                </div>
              </div>
            </div>
            <div className="boxShowVersionTwo">
              <div className="rankBox">
                <div>RANK</div>
                <div>{cryptro.data?.rank}</div>
              </div>
            </div>
          </div>
          <div className="chart">
            <div className="chartBox">
              <Line
                data={{
                  labels: chardData.data?.map((item) => item.date.slice(11,16) ),
                  datasets:[
                    {
                      label: "coid",
                      data: chardData.data?.map((item) => item.close ),
                    },
                  ],  
                }}
              />
            </div>
          </div>
          <div className="detailBoxTwo">
            <div className="dataDard">
              <div>1H CHANGE</div>
              <div
                className={`${getClassFromNumber(
                  Number(cryptro.data?.percent_change_1h)
                )} numberShow`}
              >
                {addSign(Number(cryptro.data?.percent_change_1h))}%
              </div>
            </div>
            <div className="dataDard">
              <div>7D CHANGE</div>
              <div
                className={`${getClassFromNumber(
                  Number(cryptro.data?.percent_change_7d)
                )} numberShow`}
              >
                {addSign(Number(cryptro.data?.percent_change_7d))}%
              </div>
            </div>
            <div className="dataDardTwo">
              <div>TRADING VOLUME (24H)</div>
              <div className="numberShow">
                {Number(cryptro.data?.volume24).toLocaleString()}
              </div>
            </div>
          </div>
          <div className="detailBoxThree">
            <div className="dataDardThree">
              <div>COIN MARKETCAP (USD)</div>
              <div className="numberShow">
                {Number(cryptro.data?.market_cap_usd).toLocaleString()}
              </div>
            </div>
            <div className="dataDardThree">
              <div>TOTAL SUPPLY</div>
              <div className="numberShow">
                {Number(cryptro.data?.tsupply).toLocaleString()}
              </div>
            </div>
            <div className="dataDardFour">
              <div>MAXIMUM SUPPLY</div>
              <div className="numberShow">
                {Number(cryptro.data?.msupply).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptroDetailPage;
