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
    return (
        <div className="max-width-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transaction 
                    </CardTitle>
                    <div className="flex items-center gap-x-2">
                    <Button size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <ImportTable
                        headers={Header}
                        body={Body}
                        selectedColumns={SelectedColumns}
                        onTableHeadSelectChange={() => {}}
                    />
                </CardContent>
                </Card>
                </div>
    )
}