import {useTranslation} from "react-i18next";
import * as yup from "yup";
import useAuthStore from "@/stores/authStore.ts";
import {IAccountCreateUpdateRequest} from "@/models/account.model.ts";
import {useCreateUserAccount} from "@/api/endpoints/user/account/userAccount.api.ts";
import CurrencySelect from "@/widgets/selects/CurrencySelect.tsx";
import i18next from '@/tools/language/language.ts';
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/ui/dialog.tsx";
import {Button} from "@/ui/button.tsx";
import {useMutateWithForm} from "@/hooks/form/useMutateWithForm.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import MoneyInput from "@/widgets/inputs/MoneyInput.tsx";

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

type Props = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

const CreateAccountModal = ({isOpen, setIsOpen}: Props) => {
    const authData = useAuthStore(state => state.authData);
    const {t} = useTranslation()
    const {form, isPending, onSubmit} = useMutateWithForm<IAccountCreateUpdateRequest>({
        mutation: useCreateUserAccount,
        validationSchema: validationSchema,
        initialValues: {
            name: "",
            bank: "",
            currency_id: "",
            balance: 0
        },
        onSuccess: () => {
            setIsOpen(false)
        },
        prepareSubmitData: (values) => {
            if (!authData?.user.id) return
            return {
                id: authData.user.id,
                data: values
            }
        }
    })

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <div className="p-5">
                    <DialogHeader>
                        <DialogTitle>{t('title.createAccount')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form id="createAccountForm" onSubmit={form.handleSubmit(onSubmit)}>
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
                                                <MoneyInput
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
                            <Button isLoading={isPending} type="submit" form="createAccountForm">
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

export default CreateAccountModal