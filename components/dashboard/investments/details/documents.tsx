import { type InvestmentDocument } from "@/interface";
import { FileText, Globe, Lock } from "lucide-react";

interface DocumentsProps {
  documents: InvestmentDocument[];
}

const formatFileSize = (bytes: number) => {
  if (!bytes) return "0 B";

  const sizes = ["B", "KB", "MB", "GB"];
  const sizeIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), sizes.length - 1);
  const size = bytes / 1024 ** sizeIndex;

  return `${size.toFixed(sizeIndex === 0 ? 0 : 1)} ${sizes[sizeIndex]}`;
};

export function Documents({ documents }: DocumentsProps) {
  return (
    <div className="space-y-4 my-4">
      <div className="font-bold">Legal Documents</div>

      {documents.length === 0 ? (
        <div className="text-sm text-gray-500 border rounded-md p-4">No documents available.</div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div className="bg-gray-100 p-4 flex justify-between items-center" key={doc.id}>
              <div className="flex items-center gap-2 min-w-0">
                <div className="bg-white p-2 text-red-500 rounded-md">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate">{doc.documentName}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(doc.fileSizeBytes)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {doc.isPublic ? (
                  <Globe className="text-green-600 w-4 h-4" />
                ) : (
                  <Lock className="text-gray-500 w-4 h-4" />
                )}
                <p className="text-gray-500 text-sm">{doc.isPublic ? "Public" : "Private"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
