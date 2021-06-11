import React from 'react'

import './table.scss'

interface configData {
  label: string,
  keyMapping: string
}

interface datum {
  [keyMapping: string]: string
}

export default function Table (props: { configData: Array<configData>; data: Array<datum> }) {
  const { configData, data } = props

  return (
    <div className="component-table__wrapper">
      <table className="component-table">
        <thead className="component-table__head">
          <tr className="component-table__tr">
            {
              configData.map(({ label }, index) =>
                <td key={index} className="component-table__td">{label}</td>
              )
            }
          </tr>
        </thead>
        <tbody className="component-table__body">
          {
            data.map((item, index) =>
              <tr key={index} className="component-table__tr">
                {
                  configData.map(({ keyMapping }, idx) =>
                    <td key={idx} className="component-table__td">
                      {item[keyMapping]}
                    </td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
