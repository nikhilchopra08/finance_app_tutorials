"use client"

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardTitle,
    CardHeader
 } from "@/components/ui/card"
import { UseNewCategorys } from "@/features/categories/hooks/use-new-category";
import { Loader2, Plus } from "lucide-react";

import { columns } from "./column";
import { DataTable } from "@/components/Data-Table";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeletecategories } from "@/features/categories/api/use-bulk-categories";

// const data = [
//     {
//         id: "728ed52f",
//         amount: 100,
//         status: "pending",
//         email: "m@example.com",
//       },
//       {
//         id: "728ed52f",
//         amount: 300,
//         status: "sucess",
//         email: "a@example.com",
//       },
// ]

// async function getData() : Promise<Payment[]> {
//     return [
//         {
//             id: "728ed52f",
//             amount: 100,
//             status: "pending",
//             email: "m@example.com",
//           },
//     ]
// }

const CategoriesPage = () => {
    const newCategory = UseNewCategorys();
    const CategoryQuery = useGetCategories();
    const deleteCategories = useBulkDeletecategories();

    const isDisabled = 
        CategoryQuery.isLoading || 
        deleteCategories.isPending;

    const Categories = CategoryQuery.data || [];

    if(CategoryQuery.isLoading){
        return (
            <div className="max-width-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex item-center justify-center">
                            <Loader2 className="size-6 text-slate-500 animate-spin"/>
                        </div>
                    </CardContent>
                </Card>     
            </div>            
        )
    }

    return (
        <div className="max-width-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Categories
                    </CardTitle>
                    <Button size="sm" onClick={newCategory.onOpen}>
                        <Plus className="size-4 mr-2" />
                        Add new
                    </Button>
                </CardHeader>
                <CardContent >
                    <DataTable filterKey="name" columns={columns} data={Categories} onDelete={(row) => {
                        const ids = row.map((r) => r.original.id);
                        deleteCategories.mutate({ ids });
                    }} disabled={isDisabled}/>
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesPage;