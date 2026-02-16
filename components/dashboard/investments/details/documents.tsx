import { Switch } from '@/components/ui/switch';
import { FileText, Globe } from 'lucide-react';

export function Documents() {
  const documents = [
    'investment doc 1',
    'investment doc 2',
    'investment doc 3',
  ];
  return (
    <div className=" space-y-4">
      <div className="font-bold">Legal documents</div>

      <div className=" space-y-4">
        {documents.map((doc, i) => (
          <div
            className="bg-gray-100 p-4 flex justify-between items-center  "
            key={i}
          >
            <div className="flex justify-between items-center gap-2">
              <div className="bg-white p-2 text-red-500 rounded-md">
                <FileText />
              </div>
              <p>{doc}</p>
            </div>
            <div className="flex justify-between items-center gap-2">
              <Globe className="text-green-600 w-5 h-5" />
              <p className="text-gray-500">Public</p>
              <Switch
                checked={true}
                className=" data-[state=checked]:bg-green-600"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
