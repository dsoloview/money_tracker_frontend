import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "./card";

type Props = {
    title: string;
    stat: string;
    description?: string;
    icon?: JSX.Element;
}
const Statistics = ({title, stat, description, icon}: Props) => {
    return (
        <Card className="hover:bg-accent">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-5">
                {icon && icon} <span>{stat}</span>
            </CardContent>
            {description &&
                <CardFooter>{description}</CardFooter>
            }
        </Card>
    );
};

export default Statistics;
