import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import './myCSS.css'

// receiving series data accumulated from websocket
export default function Table({ name, series }) {
    console.log(name, series)
    // the html will serve parsed series data in a chart form
    return (
        <div className="overflow-x-auto p-4 flex justify-center">
            <table className="h-200 w-200 rounded-2xl mx-auto  overflow-hidden shadow-lg">
                <thead className="bg-[#014d4e] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Symbol</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold">Change</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">

                    <tr
                        key={series}
                        className="hover:bg-gray-100 transition-colors duration-200"
                    >
                        <td className="px-6 border py-4 text-sm font-medium text-gray-900">
                            {name}
                        </td>
                        <td className="px-6 border py-4 text-sm text-gray-700">{series}</td>
                        <td
                            className={`px-6 border py-4 text-sm font-semibold ${series >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {series}%
                        </td>

                    </tr>

                </tbody>
            </table>
        </div>
    );


}