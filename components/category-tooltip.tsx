import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "./ui/separator";

export const CustomToolTip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) return null;

  const date = payload[0]?.payload?.date || "N/A";
  const income = payload[0]?.value !== undefined ? payload[0].value : "0";
  const expense =payload[1]?.value !== undefined ? payload[1].value : "0";

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden p-2">
        <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
            {format(date , "MMM dd ,yyyy")}
        </div>
        <Separator/>
        <div className="p-2 px-3 space-y-1">
            <div className="flex items-center justify-between gap-x-4">
                <div className="flex items-center gap-x-2">
                <div className="size-1.5 bg-blue-500 rounded-full" />
                <p className="text-sm text-muted-foreground">
                    Income
                </p>
            </div>
            <p className="text-sm text-right font-medium">
                {formatCurrency(income)}
            </p>
            </div>
            <div className="flex items-center gap-x-2">
                <div className="size-1.5 bg-blue-500 rounded-full" />
                <p className="text-sm text-muted-foreground">
                    Expense
                </p>
            </div>
            <p className="text-sm text-right font-medium">
                {formatCurrency(expense * -1)}
            </p>
            </div>
        </div>
  )}
