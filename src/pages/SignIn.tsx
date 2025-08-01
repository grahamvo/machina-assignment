import {
  Button,
  Container,
  Paper,
  TextInput,
  Title,
  Text,
  Alert
 } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useAuth } from 'Context/auth-provider';

function SignIn() {
    const { onLogin, isLoading, error, loggedOut } = useAuth();
    const form = useForm({
        initialValues: {
            email: "",
            firstName: "",
            lastName: ""
        },
        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
        },
    });

    return (
        <Container size={420} my={40}>
            <Title ta="center">
                Welcome!
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your information to get started
            </Text>
            <Paper withBorder shadow="sm" p={22} mt={20} radius="md">
                {error && (
                    <Alert variant="filled" color="red" radius="md" title="Sign In Error" mb="lg">
                        There was an issue signing you in. Please check your information and try again.
                    </Alert>
                )}
                {loggedOut && (
                    <Alert variant="filled" color="yellow" radius="md" title="Signed Out" mb="lg">
                        You've been signed out due to expired authentication. Please sign back in to continue.
                    </Alert>
                )}
                <form onSubmit={form.onSubmit(values => onLogin(values))}>
                    <TextInput
                        label="Email"
                        placeholder="you@machinalabs.ai"
                        required
                        radius="md"
                        name="email"
                        type="email"
                        value={form.values.email}
                        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                        error={form.errors.email}
                    />
                    <TextInput
                        label="First Name"
                        placeholder="Your first name"
                        required
                        mt="md"
                        radius="md"
                        type="text"
                        name="firstName"
                        value={form.values.firstName}
                        onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                    />
                    <TextInput
                        label="Last Name"
                        placeholder="Your last name"
                        required
                        mt="md"
                        radius="md"
                        type="text"
                        name="lastName"
                        value={form.values.lastName}
                        onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                    />
                    <Button fullWidth mt="xl" radius="md" type="submit" loading={isLoading}>Submit</Button>
                </form>
            </Paper>
        </Container>
    );
}

export default SignIn;
