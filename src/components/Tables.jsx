import { useTable, usePagination  } from "react-table";

export const TablaComponentes2 = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const renderPageButtons = () => {
    const maxPageButtons = 5;
    const totalPages = pageOptions.length;

    let startPage = Math.max(0, pageIndex - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(0, endPage - maxPageButtons + 1);
    }

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => gotoPage(i)}
          className={`px-3 py-1 rounded ${pageIndex === i ? 'text-red-500' : 'text-white'}`}
        >
          {i + 1}
        </button>
      );
    }

    if (startPage > 0) {
      pageButtons.unshift(<span key="start-ellipsis">...</span>);
      pageButtons.unshift(
        <button
          key={0}
          onClick={() => gotoPage(0)}
          className={`px-3 py-1 rounded ${pageIndex === 0 ? 'text-red-500' : 'text-white'}`}
        >
          1
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pageButtons.push(<span key="end-ellipsis">...</span>);
      pageButtons.push(
        <button
          key={totalPages - 1}
          onClick={() => gotoPage(totalPages - 1)}
          className={`px-3 py-1 rounded ${pageIndex === totalPages - 1 ? 'text-red-500' : 'text-white'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
      <table {...getTableProps()} className="w-full text-center">
        <thead className="bg-stone-800">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps()}
                  className="p-3"
                  style={{ width: column.width }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                key={row.id} // Aseguramos que la clave está aquí directamente
                {...row.getRowProps()}
                className={`hover:bg-gray-600 ${rowIndex % 2 === 0 ? '' : 'bg-[#5f5f5f] bg-opacity-20'}`}
              >
                {row.cells.map((cell) => (
                  <td key={cell.column.id} className="p-3" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination mt-4 flex justify-center items-center space-x-2">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-3 py-1 hover:text-blue-500 rounded">
          Anterior
        </button>
        {renderPageButtons()}
        <button onClick={() => nextPage()} disabled={!canNextPage} className="px-3 py-1 hover:text-blue-500 rounded">
          Siguiente
        </button>
      </div>
    </div>
  );
};