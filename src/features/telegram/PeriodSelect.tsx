import {IAvailablePeriods, IUserNewsletter} from "@/models/newsletter.model.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/ui/select.tsx";
import {useUpdateUserNewsletter} from "@/api/endpoints/user/newsletter/userNewsletter.ts";
import useUserState from "@/hooks/useUserState.ts";

type Props = {
    userNewsletter: IUserNewsletter
}

const PeriodSelect = ({userNewsletter}: Props) => {
    const user = useUserState()
    const {mutate} = useUpdateUserNewsletter(user.id)

    const handlePeriodChange = (period: string) => {
        mutate({
            id: userNewsletter.id,
            data: {
                period: period
            }
        })
    }

    return (
        <Select onValueChange={handlePeriodChange} defaultValue={userNewsletter.period}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select period"/>
            </SelectTrigger>
            <SelectContent>
                {Object.keys(userNewsletter.newsletter.availablePeriods).map((period) => {
                    return (
                        <SelectItem value={period}
                                    key={period}>{userNewsletter.newsletter.availablePeriods[period as keyof IAvailablePeriods]}</SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}

export default PeriodSelect;