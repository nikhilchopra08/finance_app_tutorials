import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
 } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImportTable } from "./import-table";

const DateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount",
    "date",
    "payee",
]

interface SelectedColumnsState {
    [key : string]: string | null;
};

type Props = {
    data : string[][],
    onCancel : () => void;
    onSubmit : (data : any) => void
}

export const ImportCard = ({
    data,
    onCancel,
    onSubmit,
} : Props) => {
    const [ SelectedColumns , setSelectedColumns ] = useState<SelectedColumnsState>({});

    const Header = data[0];
    const Body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex : number,
        value : string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = {...prev};

            for(const key in newSelectedColumns){
                if(newSelectedColumns[key] === value){
                    newSelectedColumns[key] = null;
                }
            }

            if(value === "skip"){
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;
            return newSelectedColumns;
        });
    }

    const progress = Object.values(SelectedColumns).filter(Boolean).length;

    return (
        <div className="max-width-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transaction 
                    </CardTitle>
                    <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
                    <Button size="sm" 
                        onClick={onCancel}
                        className="w-full lg:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        disabled={progress < requiredOptions.length}
                        onClick={() => {}}
                        className="w-full lg:w-auto"
                    >
                        Continue ({progress} / {requiredOptions.length})
                    </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={Header}
                        body={Body}
                        selectedColumns={SelectedColumns}
                        onTableHeadSelectChange={onTableHeadSelectChange}
                    />
                </CardContent>
                </Card>
                </div>
    )
}