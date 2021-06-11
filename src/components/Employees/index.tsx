import React, { useState, useEffect, useReducer } from 'react'

import Loader from '../common/Loader'
import Table from '../common/Table'
import Paging from '../common/Paging'
import CreatePopup from '../CreatePopup'

import './employees.scss'

import axios from 'axios'

import reducer, { initialState } from './reducer'

const configData = [
  {
    label: 'Name',
    keyMapping: 'name'
  },
  {
    label: 'Email',
    keyMapping: 'email'
  },
  {
    label: 'Position',
    keyMapping: 'position'
  }
]

export default function Employees () {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentData, setCurrentData] = useState([])
  const [isOpen, setOpenPopup] = useState(false)
  const itemsPerPage = 5

  async function fetchData () {
    try {
      dispatch({ type: 'loading', payload: {} })

      const { data, status } = await axios({
        url: 'https://5aebcd88046d7b0014fb6e5b.mockapi.io/infomation-employees',
        method: 'GET',
      })

      if (status === 200) {
        dispatch({ type: 'success', payload: { data } })
      }
    } catch (err) {
      console.error(err)

      if (!err.response) {
        dispatch({ type: 'failure', payload: { errorMessage: 'Something error' } })
        return
      }

      const { data } = err.response || {}

      dispatch({ type: 'failure', payload: { errorMessage: data } })
    }
  }

  function handleGoToPage (page: number) {
    setCurrentPage(page)
  }

  function handleOpenCreatePopup (isOpen: boolean) {
    setOpenPopup(isOpen)
  }

  function handleAdd (data: any) {
    dispatch({ type: 'add', payload: { data } })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    setCurrentData(state.listData.slice(start, end))
  }, [currentPage, state.listData])

  return (
    <div className="component-employees">
      <h2 className="component-employees__title">Employees</h2>
      {
        state.isLoading ? <Loader /> : ''
      }
      <div className="component-employess__content">
        <Table configData={configData} data={currentData} />
        <div className="component-employees__content-add">
          <span
            className="component-employees__content-add-text"
            onClick={() => handleOpenCreatePopup(true)}
          >+ New</span>
        </div>
        {
          state.listData[0] ?
            <Paging
              totalItems={state.listData.length}
              itemsPerPage={itemsPerPage}
              pageId={currentPage}
              handleGoToPage={handleGoToPage}
            />
            : ''
        }
      </div>
      {
        isOpen ?
          <CreatePopup
            handleClose={() => handleOpenCreatePopup(false)}
            handleSubmit={handleAdd}
          />
          : ''
      }
    </div>
  )
}
