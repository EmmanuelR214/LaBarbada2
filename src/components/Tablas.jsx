import { useTable } from 'react-table';

export const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (

    <div cla>
      <div>
        hola
      </div>
          <table {...getTableProps()} className="w-full border-collapse border">
      {/* Table Header */}
      <thead className="bg-stone-800">
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                key={column.id}
                {...column.getHeaderProps()}
                className="p-3 text-left border border-gray-300"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {/* Table Body */}
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row.id} {...row.getRowProps()} className="hover:bg-gray-600">
              {row.cells.map((cell) => (
                <td
                  key={cell.id}
                  {...cell.getCellProps()}
                  className="p-3 border border-gray-300"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>

  );
};