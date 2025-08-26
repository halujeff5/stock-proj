import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import './myCSS.css'
import Chart from 'react-apexcharts';
import { SpinningCircles } from 'react-loading-icons';
import StockInput from './StockInput';
import Table from './Table';
import DJIA from './DJIA';

const apiKey = import.meta.env.VITE_APIKEY;

export default function App() {

  //loading state
  const [loading, setLoading] = useState(false)
  //stock symbol
  const [symbol, setSymbol] = useState('')
  //error state in case symbol is invalid
  const [error, setError] = useState('')
  //price of stock
  const [currentPrice, setCurrentPrice] = useState([]);
  //required for APexCharts in this format
  const [series, setSeries] = useState([{
    name: symbol,
    data: []
  }]);

  // prop passed from child component
  const handleChildData = (data) => {
    console.log('Data Received', data);
    setSymbol(data.toUpperCase());
    setLoading(true)
    console.log(symbol)
  }
  //some defined hours of operation
  const marketOpen = new Date();
  marketOpen.setHours(9, 30, 0, 0); // 9:30 AM today

  const marketClose = new Date();
  marketClose.setHours(16, 0, 0, 0); // 4:00 PM today

  useEffect(() => {
    if (!symbol) return
    // opening websocket
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
    socket.addEventListener('open', function (event) {
   
      socket.send(JSON.stringify({ 'type': 'subscribe', symbol: symbol }))
    });
    //receiving data from socket
    socket.onmessage = (event) => {
      setLoading(false)
      const data = JSON.parse(event.data)
      console.log('HERE', data.data[0])
      if (data.type === 'trade' && data.data) {
        const trade = data.data[0];
        // oen price point to plot on chart
        const point = {
          //changing data into a usable timeStamp
          x: new Date(trade.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          y: trade.p
        }
        //current Price to be displayed
        setCurrentPrice(point)
        // create series for graph
        setSeries((prev) => [
          {
            ...prev[0],
            name: symbol,
            //copying and extending data series to last 20 points
            data: [...prev[0].data.slice(-12), point]
          }
        ]
        )
       

      } else {setError('Symbol not found.')} 

    }
    ;
    //closing socket
    return () => {
      
      console.log(`Unsubscribing from ${symbol}`);
      socket.send(JSON.stringify({ type: 'unsubscribe', symbol : symbol }));
      socket.close();
      
    };
  }, [symbol]);

  console.log(series)
  
 
  //another graph requirement specifying the options of graph such as type, speed of updates, curve 
  const options = {
    chart: {
      id: 'realtime',
      animations: {
        enabled: true,
        dynamicAnimation: {
          speed: 350,
        },
        toolbar: { show: false },
        zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
      },
      xaxis: {
        type: 'datetime',
        min: marketOpen.getTime(),
        max: marketClose.getTime(),
        style: {
          fontsize: '10px',
        }
      },
      yaxis: {
        decimalsInFloat: 2,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      title: {
        text: symbol ? `${symbol} prices for today` : 'not stock selected',
        align: 'center'
      }
    }
  }



  if (loading==false){
  return (

    <div className="bg-[#e3f1be] w-full min-h-screen m-0 z-0">

   
      <h1 className="text-[#014d4e] text-4xl font-bold m-6">🚀 Welcome to Stock Dashboard</h1>

      <div className='w-full max-w-4xl bg-white rounded-2xl shadow-md mb-6'>
      <h4 className='mt-4 text-[#014d4e]'>Stock: {symbol}</h4>
       <Table name = {symbol} series = {series}/>  
        <Chart options={options} series={series} type="line" width={1600} height={400} /> 
        <div className='mt-4 text-[#014d4e]'>
          <h4>Current Price: {currentPrice.y} </h4>
        </div>
      
      </div>
      <div className="inline w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <StockInput onDataReceived={handleChildData} />
        <h4 className='mt-4 text-[#014d4e]'>{error}</h4>
      </div>
      </div>
  )
    }
  if (loading==true) {
  return (
    <div className="bg-[#e3f1be] w-full min-h-screen m-0">

      <div className='h-screen flex items-center justify-center'>
    <SpinningCircles height='100' width ='100' stroke='#98ff98' strokeOpacity={.75} speed={.75} strokeWidth={2} />
    <h3>Loading Dashboard...</h3>
    </div>
    
   
    </div>
  )
  }
}


