import AccountLayout from "@/layouts/AccountLayout.tsx";
import CurrencySelect from "@/widgets/selects/CurrencySelect.tsx";
import {useTranslation} from "react-i18next";
import LanguageSelect from "@/widgets/selects/LanguageSelect.tsx";
import * as yup from "yup";
import {useUpdateUser} from "@/api/endpoints/user/user.api.ts";
import {IUpdateUserRequest} from "@/models/request.model.ts";
import UpdatePasswordModal from "@/widgets/modals/UpdatePasswordModal.tsx";
import useUserState from "@/hooks/useUserState.ts";
import i18next from "@/tools/language/language.ts";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useMutateWithForm} from "@/hooks/form/useMutateWithForm.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/ui/form.tsx";
import {Input} from "@/ui/input.tsx";
import {Button} from "@/ui/button.tsx";

export interface ISettingsForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    language_id: number;
    main_currency_id: number;
}

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    email: yup.string()
        .email(i18next.t('form.validation.email'))
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    settings: yup.object({
        main_currency_id: yup.number()
            .required(i18next.t('form.validation.required'))
            .integer('Must be an integer'),
        language_id: yup.number()
            .required(i18next.t('form.validation.required'))
            .integer('Must be an integer'),
    }),
});

function SettingsPage() {
    const user = useUserState();
    const {t} = useTranslation();
    const [isUpdatePasswordOpen, setIsUpdatePasswordOpen] = useState(false);

    const {form, onSubmit, isPending} = useMutateWithForm<IUpdateUserRequest>({
        mutation: useUpdateUser,
        initialValues: {
            name: user.name,
            email: user.email,
            settings: {
                language_id: user.settings.language.id || 1,
                main_currency_id: user.settings.main_currency.id || 1,
            },
        },
        validationSchema: validationSchema,
        prepareSubmitData: (values) => {
            return {
                id: user.id,
                data: values
            }
        },
        resetOnSuccess: false,
    });

    const userInfoBlock = (
        <div>
            <p className="text-lg font-semibold">{t('title.userInformation')}</p>
            <p className="text-gray-600 mb-2">{t('model.user.name')}: {user.name}</p>
            <p className="text-gray-600 mb-2">{t('model.user.email')}: {user.email}</p>
        </div>
    );

    return (
        <AccountLayout>
            <div className="max-w-3xl mx-auto px-4 flex flex-col gap-3">
                {userInfoBlock}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col gap-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{t('form.label.name')}</FormLabel>
                                        <FormControl>
                                            <Input
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
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{t('form.label.email')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder={t('form.placeholder.email')}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="settings.main_currency_id"
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
                                name="settings.language_id"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{t('form.label.language')}</FormLabel>
                                        <FormControl>
                                            <LanguageSelect
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                            <Button variant="green" isLoading={isPending} type="submit">{t('form.submit')}</Button>
                            <UpdatePasswordModal isOpen={isUpdatePasswordOpen} setIsOpen={setIsUpdatePasswordOpen}/>
                        </div>
                    </form>
                </Form>
                <div className="flex items-center gap-4">
                    <Button className="w-full" variant="outline" type="button"
                            onClick={() => setIsUpdatePasswordOpen(true)}>{t('button.update_password')}</Button>
                    <Button className="w-full" variant="outline" type="button" asChild>
                        <Link to={'/account/settings/categories'}>{t('button.update_categories')}</Link>
                    </Button>
                </div>
            </div>
        </AccountLayout>
    );
}

export default SettingsPage;
