import React, { useState } from "react";
export default function RequestCollection() {
  function requestDataCollection(e) {
    e.preventDefault();
    const stockName = e.target[0].value
    if (stockName === '') {
      // invalid stock name(s) ???
      return;
    }

    const dataSrc = e.target[1].value;

    // fetch rakshil's route using stock name and data source; will also need username (?)
    // work with Anuj to figure out how to get access to the username
    
  }
  return (

  
  <form className="bg-red-100 w-full max-w-lg" onSubmit={(e) => requestDataCollection(e)}>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Enter a stock name
        </label>
        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="apple" />
      </div>
    </div>

    <div className="flex flex-wrap -mx-3 mb-2">
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Data Type
        </label>
        <div className="relative">
          <select className="block appearance-none w-full defaultValue-hello bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
            <option>finance</option>
            <option>news</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>
    <input type="submit" value="Submit"/>
  </form>
  )

}