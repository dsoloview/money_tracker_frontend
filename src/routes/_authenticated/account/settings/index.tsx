import { createFileRoute } from "@tanstack/react-router";
import AccountLayout from "../../../../layouts/AccountLayout.tsx";
import { useFormik } from "formik";
import CurrencySelect from "../../../../widgets/selects/CurrencySelect.tsx";
import useAuthStore from "../../../../stores/authStore.ts";
import { useTranslation } from "react-i18next";
import { useUpdateUserSettings } from "../../../../api/endpoints/user/user.api.ts";
import LanguageSelect from "../../../../widgets/selects/LanguageSelect.tsx";
import PageTitle from "../../../../widgets/PageTitle.tsx";
import * as yup from "yup";
import i18next from "i18next";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, Stack} from "@chakra-ui/react";

export const Route = createFileRoute('/_authenticated/account/settings/')({
    component: Settings
})

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

function Settings() {
    const authData = useAuthStore(state => state.authData);
    const { mutate } = useUpdateUserSettings();
    const { t } = useTranslation();

    const userInfoBlock = (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-lg font-semibold">{t('User Information')}</p>
                <p className="text-gray-600 mb-2">{t('Name')}: {authData?.user.name}</p>
                <p className="text-gray-600 mb-2">{t('Email')}: {authData?.user.email}</p>
                <p className="text-gray-600 mb-2">{t('ID')}: {authData?.user.id}</p>
                <p className="text-gray-600 mb-2">{t('Roles')}: {authData?.user.roles.map(role => role.name).join(', ')}</p>
            </div>
            <div>
                <p className="text-lg font-semibold">{t('Settings')}</p>
                <p className="text-gray-600 mb-2">{t('Language')}: {authData?.user.settings.language.name}</p>
                <p className="text-gray-600 mb-2">{t('Main Currency')}: {authData?.user.settings.main_currency.name} ({authData?.user.settings.main_currency.symbol})</p>
            </div>
        </div>
    );

    const formik = useFormik({
        initialValues: {
            name: authData?.user.name || "",
            email: authData?.user.email || "",
            settings: {
                language_id: authData?.user.settings.language.id || 1,
                main_currency_id: authData?.user.settings.main_currency.id || 1,
            },
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    return (
        <AccountLayout>
            <PageTitle>{t('menu.settings')}</PageTitle>
            <div className="max-w-3xl mx-auto px-4">
                {userInfoBlock}
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <Stack spacing={3}>
                        <FormControl
                            isRequired
                            isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                        >
                            <FormLabel>{t('form.name')}</FormLabel>
                            <Input
                                autoFocus
                                placeholder="Enter your name"
                                id="name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                        >
                            <FormLabel>{t('form.email')}</FormLabel>
                            <Input
                                placeholder={t('form.placeholder.email')}
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={formik.touched.settings?.main_currency_id && Boolean(formik.errors.settings?.main_currency_id)}
                        >
                            <FormLabel>{t('form.currency')}</FormLabel>
                            <CurrencySelect
                                id="main_currency_id"
                                name="settings.main_currency_id"
                                value={formik.values.settings.main_currency_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.settings?.main_currency_id}</FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isRequired
                            isInvalid={formik.touched.settings?.language_id && Boolean(formik.errors.settings?.language_id)}
                        >
                            <FormLabel>{t('form.language')}</FormLabel>
                            <LanguageSelect
                                id="language_id"
                                name="settings.language_id"
                                value={formik.values.settings.language_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <FormErrorMessage>{formik.errors.settings?.language_id}</FormErrorMessage>
                        </FormControl>
                        <Button type="submit">{t('form.submit')}</Button>
                        <Button>Update password</Button>
                    </Stack>
                </form>
            </div>
        </AccountLayout>
    );
}

export default Settings;
