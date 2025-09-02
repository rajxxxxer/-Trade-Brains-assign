import React from 'react'

const Testcompon = ({data}) => {
  return (
      <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                <p>
                  <strong>Symbol=</strong> {data.symbol}
                </p>
                <p>
                  <strong>Open=</strong> ₹{data.open}
                </p>
                <p>
                  <strong>High=</strong> ₹{data.high}
                </p>
                <p>
                  <strong>Low=</strong> ₹{data.low}
                </p>
                <p>
                  <strong>Close=</strong> ₹{data.close}
                </p>
                <p>
                  <strong>Prev Close=</strong> ₹{data.prev_close}
                </p>
                <p>
                  <strong>Change=</strong> {data.change} ({data.percent}%)
                </p>
                <p>
                  <strong>Volume =</strong> {data.volume}
                </p>
                <p>
                  <strong>Value =</strong> {data.value}
                </p>
                <p className="col-span-1 sm:col-span-2">
                  <strong>Date =</strong> {data.date}
                </p>
              </div>
  )
}

export default Testcompon