import { useState } from 'react'
import React from 'react'
import './App.css'
import './myCSS.css'

//onDataReceived prop is passed to parent 
export default function StockInput({onDataReceived}) {
  
  //stock input
  const [stockIndex, setStockIndex] = useState('');
  
  const handleForm = (e) => {
    console.log('before', stockIndex)
    setStockIndex(e.target.value) 
    console.log('after', stockIndex)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (stockIndex.trim()) {
    //setting the prop to submission data to pass to parent
    onDataReceived(stockIndex.trim());
  }
  }
  return (
    <div>

    <form onSubmit= {handleSubmit} className='mt-6'>
    <input type="text" autoFocus value={stockIndex} onChange={handleForm} className="mb-10 p-2 bg-[#ffffff] text-[#000000] border border-gray-300 rounded-lg" placeholder="Enter stock symbol"/>

    <p className="text-[#014d4e] text-sm">You entered: {stockIndex}</p>

    <button type = 'submit' className="h-[30px] bg-[#014d4e] text-[#ffffff] p-15 border rounded-xl text-blue-500">
      View Stock Price
    </button>
    </form>

   
    </div>
  );
}