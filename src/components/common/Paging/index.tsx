import React from 'react'

import './paging.scss'

export default function Paging (props: {
  totalItems: number;
  itemsPerPage?: number;
  pageId: number;
  maxVisiblePagers?: number;
  handleGoToPage: any
}) {
  const { totalItems, itemsPerPage = 10, pageId, maxVisiblePagers = 2, handleGoToPage } = props
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const listPage = countPage()

  function goToPage (currentPage: number) {
    if (currentPage < 1 || currentPage > totalPages) {
      return
    }

    handleGoToPage(currentPage)
  }

  function countPage () {
    const range = []
    const step = pageId / maxVisiblePagers
    const start =
      step <= 1
        ? 1
        : pageId > totalPages - maxVisiblePagers / 2
          ? totalPages - maxVisiblePagers
          : pageId -
            maxVisiblePagers +
            Math.ceil(maxVisiblePagers / 2)
    const end =
      start + maxVisiblePagers < totalPages
        ? start + maxVisiblePagers
        : totalPages

    for (let i = start; i <= end; i++) {
      range.push({
        name: i,
        isCurrent: i === pageId
      })
    }


    return range
  }

  return (
    <ul className="component-paging">
      <li
        className={`component-paging__item ${pageId <= 1 ? '--disabled' : ''}`}
        onClick={() => goToPage(1)}
      >
        &lt;&lt;
      </li>
      <li
        className={`component-paging__item ${pageId <= 1 ? '--disabled' : ''}`}
        onClick={() => goToPage(pageId - 1)}
      >&lt;</li>
      {
        listPage.map(page =>
          <li
            key={page.name}
            className={`component-paging__item ${page.isCurrent ? '--active' : ''}`}
            onClick={() => goToPage(page.name)}
          >
            {page.name}
          </li>
        )
      }
      <li
        className={`component-paging__item ${pageId >= totalPages ? '--disabled' : ''}`}
        onClick={() => goToPage(pageId + 1)}
      >
        &gt;
      </li>
      <li
        className={`component-paging__item ${pageId >= totalPages ? '--disabled' : ''}`}
        onClick={() => goToPage(totalPages)}
      >
        &gt;&gt;
      </li>
    </ul>
  )
}
