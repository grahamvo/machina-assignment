import { useState } from "react";
import { Slider } from "@mantine/core";

import classes from "Styles/components/thresholdsSlider.module.css";

function ThresholdsSlider({ thresholds, setThresholds }: {
    thresholds: number,
    setThresholds: (value: number) => void
}) {
    const [value, setValue] = useState(thresholds);

    return (
        <Slider
            color="blue"
            value={value}
            onChange={setValue}
            onChangeEnd={setThresholds}
            min={5}
            max={30}
            labelAlwaysOn
            classNames={classes}
        />
    )
}

export default ThresholdsSlider;