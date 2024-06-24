import { z } from "zod";
import { Loader2, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormControl,
  FormLabel,
  FormField,
  FormMessage

} from "@/components/ui/form"
import { insertTransactionSchema } from "@/db/schema";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { Placeholder } from "drizzle-orm";
import { Textarea } from "@/components/ui/textarea";
import { AmountInput } from "@/components/amount-input";
import { convertAmountToMilliUnits } from "@/lib/utils";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  note: z.string().nullable().optional()
})

const apiSchema = insertTransactionSchema.omit({
  id: true,
})

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string; }[];
  categoryOptions: { label: string; value: string; }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const amountValue = parseFloat(values.amount);
    if (isNaN(amountValue)) {
      console.error("Invalid amount:", values.amount);
      return;
    }
    const amountInMilliUnits = convertAmountToMilliUnits(amountValue);
    
    const apiValues: ApiFormValues = {
      ...values,
      amount: amountInMilliUnits,// Ensure this is a string
      accountid: values.accountId,
      categoryid: values.categoryId,
    };

    console.log("Submitting:", apiValues);
    onSubmit(apiValues);
    console.log("submited")
  };

  const handleDelete = () => {
    onDelete?.();
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-4">
        <FormField
          name="date"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )} />

        <FormField
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Account
              </FormLabel>
              <FormControl>
                <Select
                  placeholder="Create an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={(newValue) => {
                    console.log("Selected category:", newValue);
                    field.onChange(newValue);
                  }}
                  disabled={disabled}
                  // disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )} />

<FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Create a category"
                  options={categoryOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="payee"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Payee
              </FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Add a payee"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )} />

<FormField
          name="amount"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Amount
              </FormLabel>
              <FormControl>
                <AmountInput
                  {...field}
                  disabled={disabled}
                  placeholder="0.00"
                />
              </FormControl>
            </FormItem>
          )} />

        <FormField
          name="notes"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Notes
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="optional notes"
                  
                />
              </FormControl>
            </FormItem>
          )} />

        <Button className="w-full" disabled={disabled}>{id ? "save changes" : "create Transaction"}</Button>
        {!!id && (<Button type="button" disabled={disabled} onClick={handleDelete} className="w-full" size="icon" variant="outline">
          <Trash className="size-4 mr-2" />
          Delete Transaction
        </Button>)}
      </form>
    </Form>
  )
}