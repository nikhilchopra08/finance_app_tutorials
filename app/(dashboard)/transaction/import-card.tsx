import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImportTable } from "./import-table";
import { convertAmountToMilliUnits } from "@/lib/utils";
import { format, parse, isValid } from "date-fns";

const DateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = [
    "amount",
    "date",
    "payee",
];

interface SelectedColumnsState {
    [key: string]: string | null;
}

type Props = {
    data: string[][],
    onCancel: () => void;
    onSubmit: (data: any) => void;
}

export const ImportCard = ({
    data,
    onCancel,
    onSubmit,
}: Props) => {
    const [SelectedColumns, setSelectedColumns] = useState<SelectedColumnsState>({});

    const Header = data[0];
    const Body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setSelectedColumns((prev) => {
            const newSelectedColumns = { ...prev };

            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }

            if (value === "skip") {
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;
            return newSelectedColumns;
        });
    }

    const progress = Object.values(SelectedColumns).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split("_")[1];
        };

        const mappedData = {
            headers: Header.map((_header, index) => {
                return SelectedColumns[`column_${index}`] || null;
            }),
            body: Body.map((row) => {
                const transformedRow = row.map((cell, index) => {
                    return SelectedColumns[`column_${index}`] ? cell : null;
                });

                return transformedRow.every((item) => item === null)
                    ? []
                    : transformedRow;
            }).filter((row) => row.length > 0),
        };

        // console.log({ mappedData });

        const arrayOfData = mappedData.body.map((row) => {
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];
                if (header != null) {
                    acc[header] = cell;
                }

                return acc;
            }, {});
        });

        const formattedData = arrayOfData.map((item) => {
            let formattedDate = item.date?.trim(); // Trim any extra spaces
            const parsedDate = parse(formattedDate, DateFormat, new Date());

            // console.log(formattedDate)
            // console.log(parsedDate)

            if (isValid(parsedDate)) {
                formattedDate = format(parsedDate, outputFormat);
            } else {
                console.warn(`Invalid date format: ${item.date}`);
                formattedDate = "Invalid date"; // or handle invalid date appropriately
            }

            return {
                ...item,
                amount: convertAmountToMilliUnits(parseFloat(item.amount)),
                date: formattedDate,
            };
        });

        // console.log({ formattedData });
        onSubmit(formattedData);
    }

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
                            onClick={handleContinue}
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
