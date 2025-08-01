import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Paper, Center, SimpleGrid, Textarea, Button, Group, Text, Tooltip, LoadingOverlay } from "@mantine/core";
import { notifications } from '@mantine/notifications';
import { IconInfoCircle } from '@tabler/icons-react';

import { useAuth } from "Context/auth-provider";

import Header from 'Components/Header';
import DataPlot from "Components/DataPlot";
import ThresholdsSlider from "Components/ThresholdsSlider";
import AxisSelector from "Components/AxisSelector";

import classes from "Styles/components/notifications.module.css";

function Home() {
    const { user } = useAuth();
    const [data, setData] = useState({
        points: [],
        timestamp: '',
        lineNumber: 0
    });
    const [thresholds, setThresholds] = useState(10);
    const [axis, setAxis] = useState('y');
    const [description, setDescription] = useState('');
    const [pngFile, setPngFile] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [dataInFlight, setDataInFlight] = useState(false);

    useEffect(() => {
        setIsFetching(true);
        axios.get('/api/points').then((res) => {
            setIsFetching(false);
            setData(res.data);
        }).catch(() => {
            setIsFetching(false);
            notifications.show({
                title: 'Error!',
                message: 'There was an error fetching your data. Please refresh the page to continue.',
                color: 'red',
                classNames: classes
            });
        });
    }, []);

    const handleSubmitData = () => {
        setDataInFlight(true);
        axios.post('/api/results', {
            plot: pngFile,
            description,
            lineNumber: data.lineNumber,
            ...user
        }).then(() => {
            setDataInFlight(false);
            notifications.show({
                title: 'Success!',
                message: 'Your analysis was submitted.',
                color: 'green',
                classNames: classes
            });
        }).catch(() => {
            setDataInFlight(false);
            notifications.show({
                title: 'Error!',
                message: 'There was an issue submitting your analysis. Please try again.',
                color: 'red',
                classNames: classes
            });
        });
    };
    
    return (
        <Container fluid>
            <LoadingOverlay visible={isFetching} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <Header />
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Paper withBorder shadow="sm" p={0} mt={0} radius="md">
                    <Center>
                        <DataPlot data={data.points} timestamp={data.timestamp} thresholds={thresholds} axis={axis} setPngFile={setPngFile} />
                    </Center>
                </Paper>
                <Grid gutter="md">
                    <Grid.Col span={6}>
                        <Paper withBorder shadow="sm" p={22} mt={0} radius="md">
                            <Center inline mb="md">
                                <Text fw={500} size="sm" mr="xs">Thresholds</Text>
                                <Tooltip label="Thresholds represents the desired number of bins for the data plot." multiline w={250}>
                                    <IconInfoCircle size={20} />
                                </Tooltip>
                            </Center>
                            <ThresholdsSlider thresholds={thresholds} setThresholds={setThresholds} />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Paper withBorder shadow="sm" p={22} mt={0} radius="md">
                            <AxisSelector axis={axis} setAxis={setAxis} />
                        </Paper>
                    </Grid.Col>
                    <Grid.Col>
                        <Paper withBorder shadow="sm" p={22} mt={0} radius="md">
                            <Textarea
                                name="description"
                                placeholder="Enter sensor readout analysis..."
                                label="Sensor Readout Analysis"
                                autosize
                                minRows={4}
                                value={description}
                                onChange={event => setDescription(event.currentTarget.value)}
                            />
                            <Group justify="flex-end" pt="md">
                                <Button disabled={!description} loading={dataInFlight} onClick={handleSubmitData}>Submit</Button>
                            </Group>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
        </Container>
    );
}

export default Home;