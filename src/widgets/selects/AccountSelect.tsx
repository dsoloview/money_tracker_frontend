import {useGetUserAccounts} from "@/api/endpoints/user/account/userAccount.api.ts";
import useUserState from "@/hooks/useUserState.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/select.tsx";

type Props = {
    id?: string
    name?: string
    onChange: (option: string) => void
    placeholder?: string
    defaultValue?: string
    className?: string
}
const AccountSelect = (
    {
        id,
        name,
        onChange,
        defaultValue,
        className
    }: Props) => {
    const user = useUserState();
    const {data} = useGetUserAccounts(user.id);

    const handleChange = (option: string) => {
        onChange(option);
    }

    return (
        <Select name={name} onValueChange={handleChange} defaultValue={defaultValue}>
            <SelectTrigger>
                <SelectValue placeholder="Select account"/>
            </SelectTrigger>
            <SelectContent id={id} className={className}>
                {data?.data.map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                        {account.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default AccountSelect;
