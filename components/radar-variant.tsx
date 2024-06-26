import React from "react";
import {
    PolarAngleAxis,
    PolarRadiusAxis,
    PolarGrid,
    Radar,
    ResponsiveContainer,
    RadarChart
} from "recharts";

import { formatPercentage } from "@/lib/utils"; // Adjust the import path as needed
import { CategoryToolTip } from "./category-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
    data?: {
        name: string;
        value: number;
    }[];
};

export const RadarVariant = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <RadarChart
                cx={50}
                cy={50}
                outerRadius="60%"
                data={data}
            >
                <PolarGrid />
                {/* <Tooltip content={<CategoryToolTip />} /> */}
                <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
                <PolarRadiusAxis style={{ fontSize: "12px" }} />
                <Radar
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f5"
                    fillOpacity={0.6} // Adjust opacity as needed
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};
