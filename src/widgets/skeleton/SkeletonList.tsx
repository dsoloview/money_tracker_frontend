import {Skeleton} from "@/ui/skeleton.tsx";

type Props = {
    count: number;
}
const SkeletonList = ({count}: Props) => {
    return Array.from({length: count}).map((_, index) => (
        <Skeleton key={index} className="h-[100px] w-full rounded-lg"/>
    ));
};

export default SkeletonList;