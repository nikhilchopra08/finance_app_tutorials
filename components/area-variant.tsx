import { format } from "date-fns"
import {
    Tooltip,
    XAxis,
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import { CustomToolTip } from "./custom-tooltip";
import { convertAmountFromMilliUnits } from "@/lib/utils";

type Props = {
    data?: {
        date : string,
        incone : number,
        expenses : number,
    }[];
};

export const AreaVariant = ({data} : Props) => {
    const convertedData = data?.map(item => ({
        ...item,
        expenses: convertAmountFromMilliUnits(item.expenses)
      })) || [];
    return (
        <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <defs>
                    <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor="#3d82bf6" stopOpacity={0.8}/>
                        <stop offset="98%" stopColor="#3d82bf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="2%" stopColor="#f43f5e" stopOpacity={0.8}/>
                        <stop offset="98%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value , "dd MMM")}
                    style={{ fontSize : "12px"}}
                    tickMargin={16}
                />
                <Tooltip content={<CustomToolTip/>}/>
                <Area
                    type="monotone"
                    dataKey="income"
                    stackId="income"
                    strokeWidth={2}
                    stroke="#3d82f6"
                    fill="url(#income)"
                    className="drop-shadow-sm"
                />
                <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="expenses"
                    strokeWidth={2}
                    stroke="#f43f5e"
                    fill="url(#expenses)"
                    className="drop-shadow-sm"
                    />
            </AreaChart>
        </ResponsiveContainer>
    )
}