import React from "react";

interface InsuranceBilling {
  agreement: string;
  value: string;
  percentage: string;
}

interface BillingByInsuranceTableProps {
  data: InsuranceBilling[];
}

const BillingByInsuranceTable: React.FC<BillingByInsuranceTableProps> = ({
  data = [],
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[var(--card-border)]">
        <thead className="bg-[var(--background)]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Convênio
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">
              %
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--card-bg)] divide-y divide-[var(--card-border)]">
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                  {row.agreement}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                  {row.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]">
                  {row.percentage}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="text-center text-[var(--text-secondary)] py-4"
              >
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
