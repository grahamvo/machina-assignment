import { Radio, Group } from "@mantine/core";

function AxisSelector({ axis, setAxis }: { axis: string, setAxis: (value: string) => void }) {
    return (
        <Radio.Group
            name="frequencyAxis"
            label="Select Frequency Axis"
            value={axis}
            onChange={setAxis}
        >
            <Group mt="xs">
                <Radio value="x" label="X Axis" />
                <Radio value="y" label="Y Axis" />
            </Group>
        </Radio.Group>
  );
}

export default AxisSelector;