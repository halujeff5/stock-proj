import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import './myCSS.css'


const apiKey = import.meta.env.VITE_APIKEY
// receiving series data accumulated from websocket
export default function Table({ name, series }) {

    const [quote1, setQuote1] = useState('')
    const [quote2, setQuote2] = useState('')
    const [quote3, setQuote3] = useState('')
    const [quote4, setQuote4] = useState('')
    const [quote5, setQuote5] = useState('')
    const [stockName, setStockName] = useState(name)
    console.log(name, series)
    //this function takes price changes per update
    function setQuoteFunction(x1, x2) {

        // getting the last 2 datapoints of series and subtracting for difference
        let ans = x1 - x2
        return ans

    }

    // grabbing the needed data from prop.series
    let tableData = series[0].data
    console.log('PLEASE', tableData[tableData.length - 1])

    function getDifference(tableData) {
        function rounder(num) {
            return Math.round(num * 100) / 100;
        }

        if (tableData.length >= 6)
            try {
                setQuote1(rounder(setQuoteFunction(tableData[tableData.length - 1].y, tableData[tableData.length - 2].y)))
                setQuote2(rounder(setQuoteFunction(tableData[tableData.length - 2].y, tableData[tableData.length - 3].y)))
                setQuote3(rounder(setQuoteFunction(tableData[tableData.length - 3].y, tableData[tableData.length - 4].y)))
                setQuote4(rounder(setQuoteFunction(tableData[tableData.length - 4].y, tableData[tableData.length - 5].y)))
                setQuote5(rounder(setQuoteFunction(tableData[tableData.length - 5].y, tableData[tableData.length - 6].y)))
            } catch (err) {
                console.error(err)
            };
        }

    useEffect(() => {
        getDifference(tableData)
        setStockName(name)
    }, [setQuote1, setQuote2, setQuote3, setQuote4, setQuote5])

    if (tableData.length > 6) {
        return (

            <table className="overflow-x-auto p-4 flex justify-center">
                <div className="h-200 w-200 border rounded-2xl mx-auto  overflow-hidden shadow-lg">

                    <tr>

                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Symbol</th>
                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Time</th>
                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Price</th>
                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Change</th>
                    </tr>

                    {/* <tbody className="divide-y divide-gray-200 bg-white"> */}

                    <tr
                        // key={name}
                        className="hover:bg-gray-100 transition-colors duration-200"
                    >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {stockName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 1].x}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 1].y}
                        </td>
                        <td
                            className={`px-6 py-4 text-sm font-semibold ${quote1 >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {quote1} +/-
                        </td> 
                    </tr>
                    <tr>

                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {stockName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 2].x}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 2].y}
                        </td>
                        <td
                            className={`px-6 py-4 text-sm font-semibold ${quote2 >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {quote2} +/-
                        </td>
                    </tr>

                    <tr>

                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {stockName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 3].x}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 3].y}
                        </td>
                        <td
                            className={`px-6 py-4 text-sm font-semibold ${quote3 >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {quote3} +/-
                        </td>
                    </tr>
                    <tr>

                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {stockName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 4].x}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 4].y}
                        </td>
                        <td
                            className={`px-6 py-4 text-sm font-semibold ${quote4 >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {quote4} +/-


                        </td>
                    </tr>
                    <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {stockName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 5].x}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                            {tableData[tableData.length - 5].y}
                        </td>
                        <td
                            className={`px-6 py-4 text-sm font-semibold ${quote5 >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {quote5} +/-
                        </td>
                    </tr>

                    {/* 
                    </tbody> */}
                </div>
            </table>)
    }
    else {
        return (
            <h3>Table loading...</h3>
        )
    }
};