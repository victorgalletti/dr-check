import React from "react";

interface InsuranceBilling {
  agreement: string;
  value: string;
  percentage: string;
}

interface BillingByInsuranceTableProps {
  data: InsuranceBilling[];
}

// CORREÇÃO: Adicionado um valor por defeito '[]' à propriedade 'data'
// Isto previne o erro 'map of undefined' se a propriedade não for fornecida.
const BillingByInsuranceTable: React.FC<BillingByInsuranceTableProps> = ({
  data = [],
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Convênio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              %
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* CORREÇÃO: Adicionada uma verificação para garantir que 'data' não está vazio antes de mapear */}
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.agreement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {row.percentage}
                </td>
              </tr>
            ))
          ) : (
            // Mensagem a ser exibida se não houver dados
            <tr>
              <td colSpan={3} className="text-center text-gray-500 py-4">
                Não há dados de faturamento disponíveis.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BillingByInsuranceTable;
