import {createFileRoute} from "@tanstack/react-router";
import AccountLayout from "../../../../layouts/AccountLayout.tsx";
import {useFormik} from "formik";
import {Button} from "@nextui-org/react";
import CurrencySelect from "../../../../widgets/selects/CurrencySelect.tsx";
import useAuthStore from "../../../../stores/authStore.ts";
import {useTranslation} from "react-i18next";
import {useUpdateUserSettings} from "../../../../api/endpoints/user/user.api.ts";
import {IParamRequest} from "../../../../models/request.model.ts";
import LanguageSelect from "../../../../widgets/selects/LanguageSelect.tsx";

export const Route = createFileRoute('/_authenticated/account/settings/')({
    component: Settings
})

export interface ISettingsForm {
    language_id: number;
    main_currency_id: number;

}
function Settings() {
    const authData = useAuthStore(state => state.authData)
    const {mutate} = useUpdateUserSettings()
    const {t} = useTranslation()
    const formik = useFormik<ISettingsForm>({
        initialValues: {
            language_id: authData?.user.settings.language.id || 1,
            main_currency_id: authData?.user.settings.main_currency.id || 1,
        },
        onSubmit: async (values) => {
            if (!authData?.user.id) return
            const request: IParamRequest<ISettingsForm> = {
                id: authData.user.id,
                data: values

            }
            mutate(request)
        },

    })
return (
        <AccountLayout>
            <div>Settings</div>
                <form onSubmit={formik.handleSubmit}>
                    <LanguageSelect
                        id="language"
                        name="language_id"
                        required
                        label={t('model.language')}
                        value={formik.values.language_id?.toString()}
                        onChange={formik.handleChange}
                        hasError={Boolean(formik.errors.language_id)}
                        errorMessage={formik.errors.language_id}
                    />
                    <CurrencySelect
                        id="currency"
                        name="main_currency_id"
                        required
                        label={t('model.currency')}
                        value={formik.values.main_currency_id}
                        onChange={formik.handleChange}
                        hasError={Boolean(formik.errors.main_currency_id)}
                        errorMessage={formik.errors.main_currency_id}
                    />
                    <Button type="submit">Submit</Button>
                </form>
        </AccountLayout>
    )
}

export default Settings;