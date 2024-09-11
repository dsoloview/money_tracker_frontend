import {useTranslation} from "react-i18next";
import * as yup from "yup";
import {IAccountCreateUpdateRequest} from "@/models/account.model.ts";
import CurrencySelect from "@/widgets/selects/CurrencySelect.tsx";
import {useUpdateAccount} from "@/api/endpoints/account/account.api.ts";
import i18next from '@/tools/language/language.ts';
import {useMutateWithForm} from "@/hooks/useMutateWithForm.ts";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/ui/dialog.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Button} from "@/ui/button.tsx";
import {Input} from "@/ui/input.tsx";
import {useUpdateAccountModal} from "@/stores/modal/updateAccountModal.ts";
import {useEffect} from "react";

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required')),
    bank: yup.string()
        .required(i18next.t('form.validation.required')),
    currency_id: yup.number()
        .required(i18next.t('form.validation.required')),
    balance: yup.string()
        .required(i18next.t('form.validation.required')),
});

const UpdateAccountModal = () => {
    const {t} = useTranslation()
    const {isOpen, toggleModal, account, onClose} = useUpdateAccountModal()

    const {form, isPending, onSubmit} = useMutateWithForm<IAccountCreateUpdateRequest>({
        mutation: useUpdateAccount,
        validationSchema: validationSchema,
        initialValues: {
            name: account?.name,
            bank: account?.bank,
            currency_id: account?.currency?.id.toString(),
            balance: account?.balance
        },
        onSuccess: () => {
            onClose()
        },
        prepareSubmitData: (values) => {
            return {
                id: account.id,
                data: values
            }
        }
    })

    useEffect(() => {
        form.reset({
            name: account?.name,
            bank: account?.bank,
            currency_id: account?.currency?.id.toString(),
            balance: account?.balance
        })
    }, [account])

    return (
        <Dialog open={isOpen} onOpenChange={() => toggleModal(account)}>
            <DialogContent>
                <div className="p-5">
                    <DialogHeader>
                        <DialogTitle>{t('title.updateAccount')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="updateAccountForm" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col space-y-3">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.name')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoFocus
                                                    placeholder={t('form.placeholder.name')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bank"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.placeholder.bank')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('form.placeholder.bank')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="currency_id"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.label.currency')}</FormLabel>
                                            <FormControl>
                                                <CurrencySelect
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    control={form.control}
                                    name="balance"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>{t('form.placeholder.balance')}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder={t('form.placeholder.balance')}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                    <DialogFooter>
                        <div className="flex gap-3 mt-5">
                            <Button isLoading={isPending} type="submit" form="updateAccountForm">
                                {t('form.submit')}
                            </Button>
                            <DialogClose asChild>
                                <Button variant="red">
                                    {t('button.close')}
                                </Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateAccountModal;