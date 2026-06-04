"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {AreaChartSkeleton} from '../../shared/loader/chartLoader'
import { formatCurrency } from "@/utils/helpers";
import { usePriceTrendSeries } from "@/hook/marketData/marketData";


type MarketLocation = "Lagos" | "Abuja" | "Port Harcourt";

type PropertyType =
  | "Land"
  | "3 Bedroom Rent"
  | "3 Bedroom Sale"
  | "4 Bedroom Rent"
  | "4 Bedroom Sale";

interface MarketPriceTrendChartProps {
  city: MarketLocation;
}

const propertyTypes: PropertyType[] = [
  "Land",
  "3 Bedroom Rent",
  "3 Bedroom Sale",
  "4 Bedroom Rent",
  "4 Bedroom Sale",
];

const areaOptionsByCity: Record<MarketLocation, string[]> = {
  Lagos: [
    "1004 Estate",
    "Abraham Adesanya",
    "Agungi",
    "Ikeja GRA",
    "Lekki Phase 1",
    "Magodo Phase",
    "Old Ikoyi",
    "Sangotedo",
    "Victoria Island",
  ],

  Abuja: [
    "Maitama",
    "Wuse 2",
    "Asokoro",
    "Gwarinpa",
    "Jahi",
    "Katampe",
  ],

  "Port Harcourt": [
    "GRA Phase 2",
    "Old GRA",
    "Ada George",
    "Peter Odili",
    "Trans Amadi",
    "Rumuola",
  ],
};

export function MarketPriceTrendChart({
  city,
}: MarketPriceTrendChartProps) {
  const [selectedPropertyType, setSelectedPropertyType] =
    useState<PropertyType>("Land");

  const [selectedArea, setSelectedArea] = useState<string>("all");

  const [chartHeight, setChartHeight] = useState<number>(480);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  const areaOptions = useMemo(() => {
    return areaOptionsByCity[city] ?? [];
  }, [city]);

  useEffect(() => {
    setSelectedArea("all");
  }, [city]);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setChartHeight(260);
        setIsMobile(true);
        return;
      }

      if (width < 1024) {
        setChartHeight(340);
        setIsMobile(false);
        return;
      }

      setChartHeight(480);
      setIsMobile(false);
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const { data: priceTrendResponse, isLoading } = usePriceTrendSeries({
    city,
    months: 6,
    location: selectedArea === "all" ? undefined : selectedArea,
    propertyType: selectedPropertyType,
  });

  const chartData = useMemo(() => {
    if (!priceTrendResponse?.data?.series?.length) {
      return [];
    }

    return priceTrendResponse.data.series.map((point) => ({
      month: point.label,
      value: point.value,
      location: point.location,
      propertyType: point.propertyType,
      unit: point.unit,
    }));
  }, [priceTrendResponse]);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 text-center sm:max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-[#121212] lg:text-4xl">
            Property prices have grown across every asset class
          </h2>

          <p className="mt-1 text-sm text-[#667085]">
            See exactly what&apos;s moved, by how much, and what it means for
            where you invest next.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#EAECF0] bg-white">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-[#EAECF0] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#121212]">
                Property Price Trends
              </h3>

              <p className="mt-1 text-sm text-[#667085]">{city}</p>
            </div>

            <div className="flex items-center gap-3">
              <Select
                value={selectedArea}
                onValueChange={setSelectedArea}
              >
                <SelectTrigger className="h-10 min-w-[170px] rounded-lg border-[#E4E7EC] bg-white text-sm shadow-none focus:ring-0">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All Areas
                  </SelectItem>

                  {areaOptions.map((area) => (
                    <SelectItem
                      key={area}
                      value={area}
                    >
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property Types */}
          <div className="flex overflow-x-auto border-b border-[#EAECF0]">
            {propertyTypes.map((type) => {
              const isActive = type === selectedPropertyType;

              return (
                <button
                  key={type}
                  onClick={() => setSelectedPropertyType(type)}
                  className={`flex-none whitespace-nowrap border-r border-[#EAECF0] px-5 py-4 text-sm font-medium transition-colors last:border-r-0 sm:flex-1 ${
                    isActive
                      ? "border-b-2 border-b-[#121212] bg-[#F9FAFB] text-[#121212]"
                      : "bg-white text-[#667085] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {type === "Land" ? "Land (Per SQM)" : type}
                </button>
              );
            })}
          </div>

          {/* Chart */}
          <div className="px-2 py-8 sm:px-4">
            {isLoading ? (
              <AreaChartSkeleton />
            ) : chartData.length === 0 ? (
              <div
                style={{ height: chartHeight }}
                className="flex items-center justify-center"
              >
                <p className="text-sm text-[#667085]">
                  No chart data available.
                </p>
              </div>
            ) : (
              
              <div style={{ height: chartHeight }}>
                <ResponsiveContainer width="100%" height={chartHeight}>
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: 10,
                      bottom: 10,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="propertyPriceFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor={"#155DFC"}
                          stopOpacity={0.24}
                        />
                        <stop
                          offset="90%"
                          stopColor={"#155DFC"}
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      vertical={false}
                      stroke="#EEF2F7"
                      strokeDasharray="4 4"
                    />

                    <XAxis
                      dataKey="month"
                      axisLine={{ stroke: "#E6E9ED" }}
                      padding={{
                        left: isMobile ? 10 : 30,
                        right: isMobile ? 10 : 30,
                      }}
                      width={20}
                      tickMargin={5}
                      tickLine={false}
                      tick={{
                        fill: "#000000",
                        fontSize: isMobile ? 11 : 13,
                        fontWeight: 500,
                      }}
                      dy={12}
                    />

                    <YAxis
                      axisLine={{ stroke: "#E6E9ED" }}
                      tickLine={false}
                      width={isMobile ? 60 : 70}
                      tick={{
                        fill: "#000000",
                        fontSize: isMobile ? 11 : 13,
                        fontWeight: 500,
                      }}
                      tickMargin={10}
                      tickFormatter={(value) => value}
                    />

                    <Tooltip
                      cursor={{
                        stroke: "#D0D5DD",
                        strokeDasharray: "4 4",
                      }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) {
                          return null;
                        }
                        return (
                          <div className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 shadow-lg">
                            <p className="mb-1 lg:text-[11px] text-xs font-medium uppercase lg:tracking-[0.16em] tracking-[0.10em] text-[#98A2B3] flex lg:flex-row flex-col">
                              <span>{payload[0].payload.location} </span> -
                              <span> {payload[0].payload.propertyType}</span>
                            </p>
                            <p className="text-sm font-semibold text-[#155DFC]">
                              {formatCurrency(Number(payload[0].value))} /{" "}
                              {payload[0].payload.unit}
                            </p>
                          </div>
                        );
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={"#155DFC"}
                      strokeWidth={1}
                      fill="url(#propertyPriceFill)"
                      dot={false}
                      activeDot={{
                        r: 6,
                        fill: "#155DFC",
                        stroke: "#FFFFFF",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}