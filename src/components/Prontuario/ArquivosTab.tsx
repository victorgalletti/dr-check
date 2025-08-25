// app/prontuario/[patientId]/_components/ArquivosTab.tsx

import { UploadCloud, FileImage, FileText, MoreVertical } from "lucide-react";
import { FileAttachment, Permissions } from "@/lib/utils";

export const ArquivosTab = ({
  data,
  permissions,
}: {
  data: FileAttachment[];
  permissions: Permissions;
}) => {
  return (
    <div className="space-y-6">
      {permissions.canUpload && (
        <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Anexar Novo Arquivo
          </h3>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Arraste e solte arquivos ou clique para fazer o upload.
          </p>
          <div className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed border-[var(--card-border)] p-8 text-center text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
            <UploadCloud className="size-10" />
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          Arquivos Anexados
        </h3>
        <ul className="mt-4 divide-y divide-[var(--card-border)]">
          {data.map((item) => (
            <li key={item.id} className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {item.tipo === "PDF" ? (
                    <FileText className="size-6 text-[var(--danger-color)]" />
                  ) : (
                    <FileImage className="size-6 text-[var(--info-color)]" />
                  )}
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">
                      {item.nome}
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      Enviado em: {item.data_upload}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--card-border)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--card-border)]">
                    <MoreVertical className="size-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
