import { format } from "date-fns"
import {
    Tooltip,
    XAxis,
    LineChart,
    Line,
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

export const LineVarient = ({data} : Props ) => {
    const convertedData = data?.map(item => ({
        ...item,
        expenses: convertAmountFromMilliUnits(item.expenses)
      })) || [];
    return (
        <ResponsiveContainer width="100%" height={350}>
            <LineChart data={convertedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value , "dd MMM")}
                    style={{ fontSize : "12px"}}
                    tickMargin={16}
                />
                <Tooltip content={<CustomToolTip/>}/>
                <Line
                    dot={false}
                    dataKey="income"
                    stroke="#3d82f6"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
                <Line
                    dot={false}
                    dataKey="expenses"
                    stroke="#f43f5e"
                    strokeWidth={2}
                    className="drop-shadow-sm"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}