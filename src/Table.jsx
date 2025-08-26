import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import './myCSS.css'
import { TableVirtuoso } from 'react-virtuoso'

const apiKey = import.meta.env.VITE_APIKEY
// receiving series data accumulated from websocket
export default function Table({ name, series }) {

    console.log(name, series)
    //this function takes price changes per update
    function setQuoteFunction(x1, x2) {
        if (series[0].data.length > 5) {
            // getting the last 2 datapoints of series and subtracting for difference
            let ans = x1 - x2
            return ans
        }
    }



    // grabbing the needed data from prop.series
    let tableData = [series[0].data]
    console.log('PLEASE', tableData.slice(0,))

    let priceDifference = []

    // the setQuoteFunction action to determine price fluctuations
    for (let i = 1; i < 5; i++) {
        priceDifference.push(setQuoteFunction(tableData[tableData.length - i], tableData[tableData.length - i + 1]))
        console.log(priceDifference)
        return priceDifference
    }

    if (series[0].data.length > 5) {
        return (
            <div className="overflow-x-auto p-4 flex justify-center">
                <div className="h-200 w-200 border rounded-2xl mx-auto  overflow-hidden shadow-lg">

                    <tr>

                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Symbol</th>
                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Time</th>
                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Price</th>
                        <th className="px-6 py-3 text-white text-left text-sm font-semibold">Change</th>
                    </tr>

                    <tbody className="divide-y divide-gray-200 bg-white">

                        <tr
                            // key={name}
                            className="hover:bg-gray-100 transition-colors duration-200"
                        >
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 1].x}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 1].y}
                            </td>
                            <td
                                className={`px-6 py-4 text-sm font-semibold ${priceDifference[0] >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {priceDifference[0]} +/-
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 2].x}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 2].y}
                            </td>
                            <td
                                className={`px-6 py-4 text-sm font-semibold ${priceDifference[1] >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {priceDifference[1]} +/-
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 3].x}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 3].y}
                            </td>
                            <td
                                className={`px-6 py-4 text-sm font-semibold ${priceDifference[2] >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {priceDifference[2]} +/-
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 4].x}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 4].y}
                            </td>
                            <td
                                className={`px-6 py-4 text-sm font-semibold ${priceDifference[3] >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {priceDifference[3]} +/-
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                {name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 5].x}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                                {tableData[tableData.length - 5].y}
                            </td>
                            <td
                                className={`px-6 py-4 text-sm font-semibold ${priceDifference[4] >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                {priceDifference[4]} +/-
                            </td>

                        </tr>

                    </tbody>
                </div>
            </div>)
    }
    else {
        return (
            <h3>Table loading...</h3>
        )
    }
};