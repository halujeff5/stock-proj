import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import './myCSS.css'
import Chart from 'react-apexcharts';

const apiKey = import.meta.env.VITE_APIKEY;

//this is the same as graph on homepage with similiar setup for NASDAQ
export default function NASDAQ() {
    const [loading, setLoading] = useState(false);
    const [currentPrice, setCurrentPrice] = useState({});
    const [symbol, setSymbol] = useState('NASDAQ')
    const [series, setSeries] = useState([{
        name: 'NASDAQ',
        data: []
    }]);

    const marketOpen = new Date();
    marketOpen.setHours(9, 30, 0, 0); // 9:30 AM today
  
    const marketClose = new Date();
    marketClose.setHours(16, 0, 0, 0); // 4:00 PM today

    const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ 'type': 'subscribe', symbol }))
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        console.log('socket is open')
        console.log('HERE', data.data[0])
        if (data.type === 'trade' && data.data) {
            const trade = data.data[0];
            const point = {
                x: new Date(trade.t).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                y: trade.p
            }
            setCurrentPrice(point)
            // setSymbol(trade.s)
            setSeries((prev) => [
                {
                    ...prev[0],
                    name: 'NASDAQ',
                    data: [...prev[0].data.slice(-20), point]
                }
            ])
        }
    });

    // return () => {
    //     console.log(`Unsubscribing from ${symbol}`);
    //     socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    //     socket.close();
    //   };
    const options = {
        chart: {
            id: 'realtime',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 300,
                },
                toolbar: { show: false },
                zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
            },
            xaxis: {
                type: 'datetime',
                min: marketOpen.getTime(),
                max: marketClose.getTime(),
                style: {
                    fontsize: '8px',
                }
            },
            yaxis: {
                decimalsInFloat: 2,
            },
            stroke: {
                curve: 'smooth',
                width: 1,
            },
            title: {
                text: symbol ? `${symbol} prices for today` : 'not stock selected',
                align: 'center'
            }
        }
    }
    return (
        <div className='w-full max-w-4xl bg-white rounded-2xl shadow-md mb-6'>
             <h4 className='mt-4 text-[#014d4e]'>NASDAQ</h4>
            <Chart options={options} series={series} type="line" width={400} height={200} />
            <div className='mt-4 text-[#014d4e]'>
                <h4>Current Price: {currentPrice.y} </h4>
               
            </div>
        </div>

    )
}