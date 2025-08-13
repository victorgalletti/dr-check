import React from "react";

// A definição da coluna permanece a mesma.
export interface ColumnDefinition<T> {
  key: keyof T & string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: ColumnDefinition<T>[];
  // A propriedade 'data' agora é opcional para maior segurança.
  data?: T[];
}

// Adicionado um valor por defeito '[]' para a propriedade 'data'.
function DataTable<T>({ columns, data = [] }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Adicionada uma verificação para exibir uma mensagem se não houver dados. */}
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {/* Idealmente, usar um ID único do 'item' se disponível */}
                {columns.map((column) => (
                  <td
                    key={`${String(column.key)}-${rowIndex}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {column.render
                      ? column.render(item)
                      : (item[column.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            // Mensagem a ser exibida se a lista de dados estiver vazia.
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Nenhum dado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
