import React from 'react'

function Pagination(props) {
    const {currentPage, itemsPerPage, onPageChange, length} = props

    const pageCount = Math.ceil(length / itemsPerPage)
    const pages = []

    for(let i = 1; i <= pageCount; i++){
        pages.push(i)
    }
    return (
        <>
            <div>
                <ul className="pagination pagination-sm">
                    <li className={"page-item" + (currentPage === 1 && " disabled") }>
                        <button onClick={() => onPageChange(currentPage - 1)} className="page-link">&laquo;</button>
                    </li>
                    {
                        pages.map((p) => (
                            <li key={p} className={"page-item" + (currentPage === p && " active") }>
                                <button onClick={() => onPageChange(p)} className="page-link">{p}</button>
                            </li>
                        ))
                    }
                    <li className={"page-item" + (currentPage === pageCount && " disabled") }>
                        <button onClick={() => onPageChange(currentPage + 1)} className="page-link">&raquo;</button>
                    </li>
                </ul>
            </div>
        </>
    )
}
Pagination.getData = (items, currentPage, itemsPerPage) => {
    //D'ou on commence (start) et pendant combien (itemsPerPage)
    const start = currentPage * itemsPerPage - itemsPerPage
    return items.slice(start, start + itemsPerPage)
}
export default Pagination