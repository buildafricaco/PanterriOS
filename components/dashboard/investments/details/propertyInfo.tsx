import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import img1 from '@/assets/images/apartment1.png';
import img2 from '@/assets/images/apartment2.jpg';

export default function PropertyInfo() {
  const property = {
    name: 'Lekki Phase 1 Apartments',
    type: 'Residential',
    status: 'Fully funded',
    location: {
      state: 'Lagos',
      city: 'Lekki',
      street_address: '3B Water Corporation Drive',
    },
    size_sqm: 2500,
    total_units: 24,
    description:
      "Prime apartment complex property located in Lekki Phase 1, Lagos. This investment opportunity offers strong potential returns with a projected IRR of 18% p.a. Perfect for investors looking for low risk investment options in Nigeria's growing real estate market.",
    financials: {
      projected_irr: {
        value: 18,
        unit: 'percent',
        formatted: '18% p.a.',
      },
      expected_rental_yield: {
        range: '7-9%',
        unit: 'percent',
        formatted: '7-9% annually',
      },
    },
    highlights: [
      'Prime location in one of Lagos most sought-after neighborhoods',
      'Modern architectural design with state-of-the-art amenities',
      'Expected rental yield of 7-9% annually',
      '24/7 security with CCTV surveillance and controlled access',
      'Swimming pool, gym, and recreational facilities',
      'Proximity to shopping malls, schools, and business districts',
      'Smart home features and energy-efficient systems',
    ],
    propertyImage: [img1, img2, img2],
  };

  return (
    <div className="space-y-4 ">
      <div className=" grid grid-cols-3 items-center">
        <div className=" gap-2">
          <div className=" font-semibold">Property Name</div>
          <p>{property.name}</p>
        </div>
        <div className=" gap-2">
          <div className=" font-semibold">Property Type</div>
          <p>{property.type}</p>
        </div>
      </div>
      <div className=" grid grid-cols-3 items-center">
        <div className=" gap-2">
          <div className=" font-semibold"> State</div>
          <p>{property.location.state}</p>
        </div>

        <div className=" gap-2">
          <div className=" font-semibold"> City</div>
          <p>{property.location.city}</p>
        </div>

        <div className=" gap-2">
          <div className=" font-semibold"> Stree Address</div>
          <p>{property.location.street_address}</p>
        </div>
      </div>
      <div className=" grid grid-cols-3 items-center">
        <div className=" gap-2">
          <div className=" font-semibold"> Status</div>
          <p>{property.status}</p>
        </div>

        <div className=" gap-2">
          <div className=" font-semibold"> Property Size(Sqm)</div>
          <p>{property.size_sqm}</p>
        </div>

        <div className=" gap-2">
          <div className=" font-semibold"> Total Unit</div>
          <p>{property.total_units}</p>
        </div>
      </div>
      <div className=" space-y-4">
        <div className="text-gray-500 text-sm">Descriptions</div>
        <p>{property.description}</p>
      </div>
      <div className=" space-y-4">
        <div className="font-semibold">Key Highlight</div>
        {property.highlights.map((higlight, i) => (
          <div className="flex gap-2 items-center" key={i}>
            {' '}
            <CircleCheck className="text-green-500" /> <span> {higlight}</span>
          </div>
        ))}
      </div>
      <div>
        <div className="font-semibold">Key Highlight</div>

        <div className="flex border rounded-md gap-4 py-4 px-6">
          {property.propertyImage.map((img, i) => (
            <div key={i} className="w-45 h-45 rounded-md relative">
              <Image
                src={img}
                alt="property"
                className="object-center w-full h-45 rounded-md"
                width={100}
                height={100}
              />
              {i === 0 && (
                <div className="bg-blue-700 text-white w-fit h-fit absolute p-1 text-sm top-2 left-2 rounded-md">
                  {' '}
                  Cover
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
