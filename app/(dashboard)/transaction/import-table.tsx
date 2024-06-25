import {
    Table,
    TableCell,
    TableBody,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

type Props = {
    headers: string[],
    body: string[][],
    selectedColumns: Record<string, string | null>;
    onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
}

export const ImportTable = ({
    headers,
    body,
    selectedColumns,
    onTableHeadSelectChange,
}: Props) => {
    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted">
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead key={index}>
                                {/* <TableHeadSelect /> */}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {body.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};