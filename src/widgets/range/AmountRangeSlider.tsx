import {Box, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack} from "@chakra-ui/react";

type Props = {
    minRangeValue: number;
    maxRangeValue: number;
    minAmount: number;
    maxAmount: number;
    onChange: (values: number[]) => void;
}
const AmountRangeSlider = (
    {
        minRangeValue,
        maxRangeValue,
        minAmount,
        maxAmount,
        onChange
    }: Props) => {
    if (minRangeValue === 0 && maxRangeValue === 0) return null;

    const handleRangeChange = (values: number[]) => {
        onChange(values);
    }
    return (
        <Box>
            <RangeSlider aria-label={['min', 'max']}
                         defaultValue={[minAmount, maxAmount]}
                         min={minRangeValue}
                         max={maxRangeValue}
                         onChangeEnd={handleRangeChange}
            >
                <RangeSliderTrack>
                    <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb index={0}/>
                <RangeSliderThumb index={1}/>
            </RangeSlider>

        </Box>
    )
}


export default AmountRangeSlider;