import { format } from "date-fns"
import {
    Tooltip,
    XAxis,
    BarChart,
    Bar,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import { CustomToolTip } from "./custom-tooltip";
import { convertAmountFromMilliUnits } from "@/lib/utils";

type Props = {
    data?: {
        date : string,
        incone : number,
        expenses : (number),
    }[];
};

export const BarVarient = ({data} : Props ) => {
    const convertedData = data?.map(item => ({
        ...item,
        expenses: convertAmountFromMilliUnits(item.expenses)
      })) || [];

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={convertedData}>
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
                <Bar
                    dataKey="income"
                    fill="#3d82f6"
                    className="drop-shadow-sm"
                />
                <Bar
                    dataKey="expenses"
                    fill="#f43f5e"
                    className="drop-shadow-sm"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}