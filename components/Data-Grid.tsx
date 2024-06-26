"use client"

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDataRange } from "@/lib/utils";
import { useSearchParams } from "next/navigation"
import {FaPiggyBank , FaArrowAltCircleUp , FaArrowAltCircleDown } from "react-icons/fa";
import { DataCard, DataCardLoading } from "./dataCard";

export const DataGrid = () => {

    const { data , isLoading } = useGetSummary();

    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;

    const dateRangeLabel = formatDataRange({ to , from });

    if(isLoading){
        return (
            <div className="grid grid-col-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
                <DataCardLoading/>
                <DataCardLoading/>
                <DataCardLoading/>
            </div>
        )
    }

    return (
        <div className="grid grid-col-1 lg:grid-cols-3 gap-8 pb-2 mb-8">

            <DataCard
                title="remaning amount"
                value={data?.remainingAmount}
                percentageChange = {data?.remainingChange}
                icon = {FaPiggyBank}
                variant="default"
                dateRange = {dateRangeLabel}
            />

            <DataCard
                title="Income"
                value={data?.incomeAmount}
                percentageChange = {data?.incomeChange}
                icon = {FaArrowAltCircleUp}
                variant="default"
                dateRange = {dateRangeLabel}
            />

            <DataCard
                title="Expenses"
                value={data?.expenseAmount}
                percentageChange = {data?.expensesChange}
                icon = {FaArrowAltCircleDown}
                variant="default"
                dateRange = {dateRangeLabel}
            />
        </div>
    )
}