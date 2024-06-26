import { FileSearch , PieChart , Radar , Target } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent
} from "./ui/card";
import {
    Select ,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue
} from "./ui/select"

import { AreaVariant } from "./area-variant";
import { BarVarient } from "./bar-variant";
import { LineVarient } from "./line-variant";

import { useState } from "react";
import { PieVariant } from "./pie-varient";

type Props = {
    data?: {
        name : string,
        value : number,
    }[];
};

export const SpendingPie = ({ data = [] } : Props) => {
    const [chartType , setChartType ] = useState("pie");

    const onTypeChange = (type : string) => {
        setChartType(type);
    };


    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Categories
                </CardTitle>
                <Select 
                    defaultValue={chartType} 
                    onValueChange={onTypeChange}
                >
                    <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
                        <SelectValue placeholder="Chart Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pie">
                            <div className="flex items-center">
                                <PieChart className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">Pie Chart</p>
                            </div>
                        </SelectItem>
                        <SelectItem value="radar">
                            <div className="flex items-center">
                                <Radar className="size-4 mr-2 shrink-0"/>
                                <p className="line-clamp-1">Radar Chart</p>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex flex-col justify-center items-center h-[350px] w-full">
                        <FileSearch className="size-6 text-muted-foreground"/>
                        <p className="text-muted-foreground text-sm">No data for this period</p>
                    </div>
                ) : (
                    <>
                        {chartType === "pie" && <PieVariant data={data} />} 
                    </>
                )}
            </CardContent>
        </Card>
    )
}