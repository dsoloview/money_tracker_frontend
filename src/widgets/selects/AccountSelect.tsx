import {useGetUserAccounts} from "@/api/endpoints/user/account/userAccount.api.ts";
import useUserState from "@/hooks/useUserState.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/select.tsx";

type Props = {
    onChange: (option: string) => void
    placeholder?: string,
    defaultValue?: string

}
const AccountSelect = (
    {
        onChange,
        defaultValue
    }: Props) => {
    const user = useUserState();
    const {data} = useGetUserAccounts(user.id);

    const handleChange = (option: string) => {
        onChange(option);
    }

    return (
        <Select onValueChange={handleChange} defaultValue={defaultValue}>
            <SelectTrigger>
                <SelectValue placeholder="Select account"/>
            </SelectTrigger>
            <SelectContent>
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
