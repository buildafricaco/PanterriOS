import { StatusBadge } from "@/components/shared";
import { type InvestmentPropertyDetails } from "@/interface";
import { CircleCheck } from "lucide-react";
import Image from "next/image";

interface PropertyInfoProps {
  propertyDetails: InvestmentPropertyDetails;
}

export default function PropertyInfo({ propertyDetails }: PropertyInfoProps) {
  return (
    <div className="space-y-4  my-4">
      <div className="grid capitalize grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <div className="font-semibold">Property Name</div>
          <p>{propertyDetails.propertyName}</p>
        </div>
        <div>
          <div className="font-semibold">Property Type</div>
          <p className="capitalize">{propertyDetails.propertyType}</p>
        </div>
        <div>
          <div className="font-semibold">Status</div>
          <StatusBadge status={propertyDetails.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div>
          <div className="font-semibold">State</div>
          <p className="capitalize">{propertyDetails.state}</p>
        </div>
        <div>
          <div className="font-semibold">City</div>
          <p>{propertyDetails.city}</p>
        </div>
        <div>
          <div className="font-semibold">Street Address</div>
          <p>{propertyDetails.fullAddress}</p>
        </div>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-3 gap-4 items-center">
        <div>
          <div className="font-semibold">Property Size (Sqm)</div>
          <p>{propertyDetails.propertySizeSqm}</p>
        </div>
        <div>
          <div className="font-semibold">Property Unit</div>
          <p>{propertyDetails.propertyUnit}</p>
        </div>
        <div>
          <div className="font-semibold">Total Units</div>
          <p>{propertyDetails.totalUnits}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-gray-500 text-sm">Description</div>
        <p>{propertyDetails.description}</p>
      </div>

      <div className="space-y-3">
        <div className="font-semibold">Key Highlights</div>
        {propertyDetails.keyHighlights.length > 0 ? (
          propertyDetails.keyHighlights.map((highlight, index) => (
            <div
              className="flex gap-2 items-center"
              key={`${highlight}-${index}`}
            >
              <CircleCheck className="text-green-500 w-4 h-4" />
              <span>{highlight}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No highlights available.</p>
        )}
      </div>

      <div className="space-y-3">
        <div className="font-semibold">Property Images</div>
        {propertyDetails.images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border rounded-md p-4">
            {propertyDetails.images.map((image, index) => (
              <div
                key={image.id}
                className="w-full rounded-md relative overflow-hidden border"
              >
                <Image
                  src={image.url}
                  alt={image.fileName || `Property image ${index + 1}`}
                  className="w-full h-44 object-cover"
                  width={200}
                  height={150}
                />
                {index === 0 && (
                  <div className="bg-blue-700 text-white absolute p-1 text-sm top-2 left-2 rounded-md">
                    Cover
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No property images available.</p>
        )}
      </div>
    </div>
  );
}
