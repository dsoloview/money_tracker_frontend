import * as yup from "yup";
import {useTranslation} from "react-i18next";
import {ITransferRequest} from "@/models/transfer.model.ts";
import AccountSelect from "@/widgets/selects/AccountSelect.tsx";
import {useState} from "react";
import i18next from "@/tools/language/language.ts";
import {useCreateAccountTransfer} from "@/api/endpoints/account/accountTransfer/accountTransfer.api.ts";
import {getCurrenctDateTimeForInput} from "@/tools/date/date.helper.ts";
import {useMutateWithForm} from "@/hooks/useMutateWithForm.ts";
import {ArrowUpDown} from "lucide-react";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle} from "@/ui/drawer.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import {DatePicker} from "@/ui/datePicker.tsx";
import {Button} from "@/ui/button.tsx";
import {isMobile} from "@/tools/resolution/resolution.tools.ts";

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


const CreateTransferGroup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {t} = useTranslation();
    const {form, isPending, onSubmit} = useMutateWithForm<ITransferRequest>({
        mutation: useCreateAccountTransfer,
        initialValues: {
            comment: "",
            account_from_id: 0,
            account_to_id: 0,
            amount_from: 0,
            amount_to: 0,
            date: getCurrenctDateTimeForInput()
        },
        validationSchema: validationSchema,
        onSuccess: () => {
            setIsOpen(false)
        },
        prepareSubmitData: (values) => {
            return {
                id: values.account_from_id,
                data: values
            }
        }
    });

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                variant="blue"
            >
                <ArrowUpDown/>
            </Button>
            <Drawer
                direction={isMobile() ? 'bottom' : 'right'}
                open={isOpen}
                onOpenChange={setIsOpen}
            >
                <DrawerContent className='h-full lg:top-0 lg:right-0 lg:left-auto lg:mt-0 lg:w-[600px] lg:rounded-none'>
                    <DrawerHeader>
                        <DrawerTitle className="text-center">{t('title.createTransfer')}</DrawerTitle>
                    </DrawerHeader>
                    <div className='px-10 lg:p-10 overflow-y-auto'>
                        <Form {...form}>
                            <form id="createTransferForm" onSubmit={form.handleSubmit(onSubmit)}>
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

export default CreateTransferGroup;