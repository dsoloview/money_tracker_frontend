import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {ITransferRequest} from "@/models/transfer.model.ts";
import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import i18next from "@/tools/language/language.ts";
import {useMutateWithForm} from "@/hooks/form/useMutateWithForm.ts";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from "@/ui/drawer.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import {DatePicker} from "@/ui/datePicker.tsx";
import {Button} from "@/ui/button.tsx";
import {isMobile} from "@/tools/resolution/resolution.tools.ts";
import {useUpdateTransfer} from "@/api/endpoints/transfer/transfers.api.ts";
import {useUpdateTransferDrawer} from "@/stores/drawer/updateTransferDrawer.ts";
import {useEffect} from "react";

const validationSchema = yup.object({
    comment: yup.string()
        .required(i18next.t('form.validation.required')),
    amount_from: yup.string()
        .required(i18next.t('form.validation.required')),
    amount_to: yup.string()
        .required(i18next.t('form.validation.required')),
    account_from_id: yup.number()
        .required(i18next.t('form.validation.required')),
    account_to_id: yup.number()
        .required(i18next.t('form.validation.required')),
    date: yup.date()
        .required(i18next.t('form.validation.required')),
});


const UpdateTransferDrawer = () => {
    const {isOpen, onOpenChange, onClose, transfer} = useUpdateTransferDrawer();
    const {t} = useTranslation();
    const {form, isPending, onSubmit} = useMutateWithForm<ITransferRequest>({
        mutation: useUpdateTransfer,
        initialValues: {
            comment: transfer?.comment,
            account_from_id: transfer?.account_from?.id.toString(),
            account_to_id: transfer?.account_to?.id.toString(),
            amount_from: transfer?.amount_from,
            amount_to: transfer?.amount_to,
            date: transfer?.date
        },
        validationSchema: validationSchema,
        onSuccess: () => {
            onClose();
        },
        prepareSubmitData: (values) => {
            return {
                id: transfer.id,
                data: values
            }
        }
    });

    useEffect(() => {
        form.reset({
            comment: transfer?.comment,
            account_from_id: transfer?.account_from?.id.toString(),
            account_to_id: transfer?.account_to?.id.toString(),
            amount_from: transfer?.amount_from,
            amount_to: transfer?.amount_to,
            date: transfer?.date
        })
    }, [transfer]);

    return (
        <>
            <Drawer
                direction={isMobile() ? 'bottom' : 'right'}
                open={isOpen}
                onOpenChange={(isOpen) => onOpenChange(isOpen, transfer)}
            >
                <DrawerContent className='h-full lg:top-0 lg:right-0 lg:left-auto lg:mt-0 lg:w-[600px] lg:rounded-none'>
                    <DrawerHeader>
                        <DrawerTitle className="text-center">{t('title.createTransfer')}</DrawerTitle>
                    </DrawerHeader>
                    <div className='px-10 lg:p-10 overflow-y-auto'>
                        <Form {...form}>
                            <form id="updateTransferForm" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="flex flex-col space-y-3">
                                    <FormField
                                        control={form.control}
                                        name="comment"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.comment')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        autoFocus
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
                                        name="account_from_id"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.accountFrom')}</FormLabel>
                                                <FormControl>
                                                    <AccountSelect
                                                        defaultValue={field.value}
                                                        onChange={(value) => {
                                                            form.setValue('account_from_id', value)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amount_from"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.amountFrom')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={t('form.placeholder.amountFrom')}
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
                                        name="account_to_id"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.accountTo')}</FormLabel>
                                                <FormControl>
                                                    <AccountSelect
                                                        defaultValue={field.value}
                                                        onChange={(value) => {
                                                            form.setValue('account_to_id', value)
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="amount_to"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{t('form.label.amountTo')}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={t('form.placeholder.amountTo')}
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
                                form="updateTransferForm"
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

export default UpdateTransferDrawer;