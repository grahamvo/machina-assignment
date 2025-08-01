import { useEffect, useRef } from 'react';
import { Box } from "@mantine/core";
import d3ToPng from 'd3-svg-to-png';
import * as Plot from "@observablehq/plot";

import classes from "Styles/components/dataPlot.module.css";


function DataPlot({ data, thresholds, axis, setPngFile, timestamp }: {
    data: Array<number>,
    thresholds: number,
    axis: string,
    timestamp: string,
    setPngFile: (fileData: string) => void,
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!data.length) {
            return;
        }

        const plot = Plot.plot({
            width: 640,
            height: 640,
            marginTop: 30,
            marginBottom: 40,
            title: "Sensor Readout Data",
            subtitle: `Where n=${data.length} on ${new Date(timestamp).toDateString()} at ${new Date(timestamp).toLocaleTimeString()}`,
            className: "data-plot",
            [axis]: {
                grid: true,
                percent: true,
            },
            marks: axis === 'y' ? [
                Plot.rectY(data, Plot.binX({y: "proportion"}, {thresholds})),
                Plot.ruleY([0]),
            ] : [
                Plot.rectX(data, Plot.binY({x: "proportion"}, {thresholds})),
                Plot.ruleX([0]),
            ]
        });

        if (containerRef.current) {
            containerRef.current.append(plot);
        }

        d3ToPng('svg', 'data-plot', {
            scale: 0.2, // So that the image is 128x128
            download: false,
            background: "#242424"
        }).then(fileData => {
            setPngFile(fileData);
        });
        
        return () => {
            plot.remove();
        }
  } , [data, thresholds, axis, setPngFile, timestamp]);

  return (
    <Box ref={containerRef} component="div" className={classes.dataPlotContainer} />
  );
}

export default DataPlot;
