// ErrorPage.tsx

import React, { useEffect, useState } from 'react';
import {
    Container,
    Icon,
    Header,
    Message,
    ErrorMessage,
    RetryButton
} from '../../styles/ErrorPageStyles';

const ErrorPage = ({ error }: { error: Error }) => {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setFadeIn(true);
        }, 100); // Delay to start fade-in
    }, []);

    return (
        <Container fadeIn={fadeIn}>
            <Icon />
            <Header>Oops! Something Went Wrong</Header>
            <Message>Error loading data:</Message>
            <ErrorMessage>{error.message}</ErrorMessage>
        </Container>
    );
};

export default ErrorPage;
