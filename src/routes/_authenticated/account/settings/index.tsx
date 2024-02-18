import {createFileRoute} from "@tanstack/react-router";
import AccountLayout from "../../../../layouts/AccountLayout.tsx";
import LanguageSelect from "../../../../widgets/selects/LanguageSelect.tsx";
import {useFormik} from "formik";
import {Button} from "@nextui-org/react";
import CurrencySelect from "../../../../widgets/selects/CurrencySelect.tsx";

export const Route = createFileRoute('/_authenticated/account/settings/')({
    component: Settings
})
function Settings() {
    const formik = useFormik({
        initialValues: {
            language: "",
            currency: "",
        },
        onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
        },

    })
return (
        <AccountLayout>
            <div>Settings</div>
                <form onSubmit={formik.handleSubmit}>
                    <LanguageSelect
                        value={formik.values.language}
                        onChange={formik.handleChange}
                        hasError={Boolean(formik.errors.language)}
                        errorMessage={formik.errors.language}
                    />
                    <CurrencySelect
                        value={formik.values.currency}
                        onChange={formik.handleChange}
                        hasError={Boolean(formik.errors.currency)}
                        errorMessage={formik.errors.currency}
                    />
                    <Button type="submit">Submit</Button>
                </form>
        </AccountLayout>
    )
}

export default Settings;