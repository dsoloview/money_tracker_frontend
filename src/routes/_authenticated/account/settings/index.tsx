import { createFileRoute } from "@tanstack/react-router";
import AccountLayout from "../../../../layouts/AccountLayout.tsx";
import { useFormik } from "formik";
import { Button, Input } from "@nextui-org/react";
import CurrencySelect from "../../../../widgets/selects/CurrencySelect.tsx";
import useAuthStore from "../../../../stores/authStore.ts";
import { useTranslation } from "react-i18next";
import { useUpdateUserSettings } from "../../../../api/endpoints/user/user.api.ts";
import { IParamRequest } from "../../../../models/request.model.ts";
import LanguageSelect from "../../../../widgets/selects/LanguageSelect.tsx";
import PageTitle from "../../../../widgets/PageTitle.tsx";
import * as yup from "yup";
import i18next from "i18next";
import {ref} from "yup";

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

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    a: yup.string(),
    b: yup.string(),
    c: yup.string(),
    d: yup.string(),
    e: yup.string(),
    checkbox_selection: yup.string().when(["a", "b", "c", "d", "e"], {
        is: (a, b, c, d, e) => !a && !b && !c && !d && !e,
        then: yup.string().required("At least one checkbox is to be selected"),
        otherwise: yup.string() // unnecessary
    })
});

const validationSchema = yup.object({
    name: yup.string()
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    email: yup.string()
        .email(i18next.t('form.validation.email'))
        .required(i18next.t('form.validation.required'))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    password: yup.string()
        .min(8, i18next.t('form.validation.minLength', {count: 8}))
        .max(254, i18next.t('form.validation.maxLength', {count: 254})),
    password_confirmation: yup.string()
        .oneOf([ref("password")], i18next.t('form.validation.confirmPassword'))
        .when('password', ([password], schema) => {
            return password && password.length > 0
                ? schema.required(i18next.t('form.validation.required'))
                : schema;
        }),
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
                <p className="text-gray-600 mb-2">{t('Name')}: {authData.user.name}</p>
                <p className="text-gray-600 mb-2">{t('Email')}: {authData.user.email}</p>
                <p className="text-gray-600 mb-2">{t('ID')}: {authData.user.id}</p>
                <p className="text-gray-600 mb-2">{t('Roles')}: {authData.user.roles.map(role => role.name).join(', ')}</p>
            </div>
            <div>
                <p className="text-lg font-semibold">{t('Settings')}</p>
                <p className="text-gray-600 mb-2">{t('Language')}: {authData.user.settings.language.name}</p>
                <p className="text-gray-600 mb-2">{t('Main Currency')}: {authData.user.settings.main_currency.name} ({authData.user.settings.main_currency.symbol})</p>
            </div>
        </div>
    );

    const formik = useFormik({
        initialValues: {
            name: authData?.user.name || "",
            email: authData?.user.email || "",
            password: "",
            password_confirmation: "",
            language_id: authData?.user.settings.language.id || 1,
            main_currency_id: authData?.user.settings.main_currency.id || 1,
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
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        isRequired
                        label={t('form.name')}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.name && Boolean(formik.errors.name)}
                        errorMessage={formik.errors.name}
                    />
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        isRequired
                        label={t('form.email')}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                        errorMessage={formik.errors.email}
                    />
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        label={t('form.password')}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.password && Boolean(formik.errors.password)}
                        errorMessage={formik.errors.password}
                    />
                    <Input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        label={t('form.confirmPassword')}
                        value={formik.values.password_confirmation}
                        onChange={formik.handleChange}
                        isInvalid={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                        errorMessage={formik.errors.password_confirmation}
                    />
                    <LanguageSelect
                        id="language"
                        name="language_id"
                        required
                        label={t('model.language')}
                        value={formik.values.language_id.toString()}
                        onChange={formik.handleChange}
                        hasError={Boolean(formik.errors.language_id)}
                        errorMessage={formik.errors.language_id}
                    />
                    <CurrencySelect
                        id="currency"
                        name="main_currency_id"
                        required
                        label={t('model.currency')}
                        value={formik.values.main_currency_id.toString()}
                        onChange={formik.handleChange}
                        hasError={Boolean(formik.errors.main_currency_id)}
                        errorMessage={formik.errors.main_currency_id}
                    />
                    <Button type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        {t('form.submit')}
                    </Button>
                </form>
            </div>
        </AccountLayout>
    );
}

export default Settings;
