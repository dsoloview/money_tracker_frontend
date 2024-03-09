import qs from "qs";
import {useState} from "react";

type AvailableParams = {
    sort?: string[];
    page?: number;
    filters?: object;
}
const useQueryParams = () => {
    const [params, setParams] = useState<AvailableParams>(() => {
        return qs.parse(window.location.search.slice(1));
    });

    const reFetchParams = () => {
        setParams(qs.parse(window.location.search.slice(1)));
    }

    const updateQueryParams = async (newParams: AvailableParams) => {
        reFetchParams();
        const oldParams = qs.parse(window.location.search.slice(1));
        const preparedParams: AvailableParams = {...oldParams, ...newParams};

        const orderedParams: AvailableParams = {};
        Object.keys(preparedParams).sort().forEach(key => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            orderedParams[key] = preparedParams[key];
        });

        const newQueryString = qs.stringify(orderedParams, {encode: false});
        window.history.pushState({}, '', `?${newQueryString}`);
    }

    const removeQueryParams = (keys: Array<keyof AvailableParams>) => {
        const newParams = {...params};
        keys.forEach(key => delete newParams[key]);
        const newQueryString = qs.stringify(newParams, {encode: false});
        window.history.pushState({}, '', `?${newQueryString}`);
    }


    return {params, updateQueryParams, removeQueryParams};
}

export default useQueryParams;