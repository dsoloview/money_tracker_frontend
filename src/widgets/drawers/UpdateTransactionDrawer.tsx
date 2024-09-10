import {useTranslation} from "react-i18next";
import {useMutateWithForm} from "@/hooks/useMutateWithForm.ts";
import {ITransactionRequest} from "@/models/transaction.model.ts";
import {CategoryTransactionType} from "@/models/category.model.ts";
import {Button} from "@/ui/button.tsx";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from "@/ui/drawer.tsx";
import {isMobile} from "@/tools/resolution/resolution.tools.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import {DatePicker} from "@/ui/datePicker.tsx";
import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import {Suspense, useEffect} from "react";
import {Spinner} from "@/ui/spinner.tsx";
import CategorySelect from "@/widgets/selects/CategorySelect.tsx";
import CategoryTransactionTypeRadio from "@/widgets/radio/CategoryTransactionTypeRadio.tsx";
import * as yup from "yup";
import i18next from "@/tools/language/language.ts";
import {useUpdateTransactionDrawer} from "@/stores/drawer/updateTransactionDrawer.ts";
import {useUpdateTransaction} from "@/api/endpoints/transaction/transactions.api.ts";

const validationSchema = yup.object({
    comment: yup.string()
        .required(i18next.t('form.validation.required')),
    amount: yup.string()
        .required(i18next.t('form.validation.required')),
    type: yup.string()
        .required(i18next.t('form.validation.required')),
    account_id: yup.number()
        .required(i18next.t('form.validation.required')),
    date: yup.date()
        .required(i18next.t('form.validation.required')),
    categories_ids: yup.array()
        .required(i18next.t('form.validation.required'))
        .min(1),
});

const UpdateTransactionDrawer = () => {
    const {t} = useTranslation();
    const {isOpen, onOpenChange, onClose, transaction} = useUpdateTransactionDrawer();
    const {form, isPending, onSubmit} = useMutateWithForm<ITransactionRequest>({
        mutation: useUpdateTransaction,
        initialValues: {
            comment: transaction?.comment,
            amount: transaction?.amount,
            type: transaction?.type,
            account_id: transaction?.account_id?.toString(),
            date: transaction?.date,
            categories_ids: transaction?.categories?.map((category) => category.id)
        },
        validationSchema: validationSchema,
        onSuccess: () => {
            onClose();
        },
        prepareSubmitData: (values) => {
            return {
                id: transaction.id,
                data: values
            }
        }
    });

    useEffect(() => {
        form.reset({
            comment: transaction?.comment,
            amount: transaction?.amount,
            type: transaction?.type,
            account_id: transaction?.account_id?.toString(),
            date: transaction?.date,
            categories_ids: transaction?.categories?.map((category) => category.id)
        });
    }, [transaction])

    const handleChangeType = (nextValue: string) => {
        const value = nextValue as CategoryTransactionType;
        form.setValue('categories_ids', [])
        form.setValue('type', value);
    }

    return (
        <>
            <Drawer
                direction={isMobile() ? 'bottom' : 'right'}
                open={isOpen}
                onOpenChange={(open) => onOpenChange(open, transaction)}
            >
                <DrawerContent
                    className='h-full lg:top-0 lg:right-0 lg:left-auto lg:mt-0 lg:w-[600px] lg:rounded-none'>
                    <DrawerHeader>
                        <DrawerTitle className="text-center">Create Transaction</DrawerTitle>
                    </DrawerHeader>
                    <div className='px-10 lg:p-10 overflow-y-auto'>
                        <Form {...form}>
                            <form id="createTransactionForm" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col space-y-3">
                                    <FormField
                                        control={form.control}
                                        name="comment"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.comment')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={t('form.placeholder.comment')}
                                                        {...field}
                                                        className="text-md"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.amount')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={t('form.placeholder.amount')}
                                                        {...field}
                                                        className="text-md"
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.date')}</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        value={new Date(field.value)}
                                                        onChange={(value) => form.setValue('date', value.toISOString())}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="account_id"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.account')}</FormLabel>
                                                <FormControl>
                                                    <AccountSelect
                                                        defaultValue={field.value}
                                                        onChange={(value) => {
                                                            form.setValue('account_id', value)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="categories_ids"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.categories')}</FormLabel>
                                                <FormControl>
                                                    <Suspense fallback={<Spinner/>}>
                                                        <CategorySelect
                                                            type={form.getValues('type')}
                                                            values={field.value}
                                                            id="categories_ids"
                                                            onChange={(value) => {
                                                                form.setValue('categories_ids', value)
                                                            }}
                                                        />
                                                    </Suspense>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.type')}</FormLabel>
                                                <FormControl>
                                                    <CategoryTransactionTypeRadio
                                                        onChange={handleChangeType}
                                                        defaultValue={field.value}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </form>
                        </Form>
                        <DrawerFooter className="mt-5 flex gap-3">
                            <DrawerClose asChild>
                                <Button variant="red">Cancel</Button>
                            </DrawerClose>
                            <Button
                                isLoading={isPending}
                                type="submit"
                                variant="green"
                                form="createTransactionForm"
                            >
                                Save
                            </Button>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default UpdateTransactionDrawer;