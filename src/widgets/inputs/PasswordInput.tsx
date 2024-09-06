import {Input, InputProps} from "@/ui/input.tsx";
import React, {RefAttributes} from "react";
import {Button} from "@/ui/button.tsx";
import {useTranslation} from "react-i18next";


const PasswordInput = (props: InputProps & RefAttributes<HTMLInputElement>) => {
    const {t} = useTranslation();
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <div className="flex w-full items-center space-x-2">
            <Input
                type={showPassword ? "text" : "password"}
                {...props}
            />
            <Button type="button"
                    onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? t('button.hide') : t('button.show')}
            </Button>
        </div>
    )

}

export default PasswordInput;