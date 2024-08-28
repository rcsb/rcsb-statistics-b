import styled from 'styled-components';
import { MdError } from 'react-icons/md';

export const Container = styled.div<{ fadeIn: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f8d7da;
    padding: 20px;
    box-sizing: border-box;
    transition: opacity 1s ease-in-out;
    opacity: ${(props) => (props.fadeIn ? 1 : 0)};
`;

export const Icon = styled(MdError)`
    color: #721c24;
    font-size: 80px;
    margin-bottom: 20px;
`;

export const Header = styled.h1`
    color: #721c24;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
`;

export const Message = styled.p`
    color: #721c24;
    font-size: 24px;
    margin-bottom: 10px;
`;

export const ErrorMessage = styled.p`
    color: #4a4a4a; 
    font-size: 18px;
    font-style: italic;
    margin-bottom: 20px;
    text-align: center;
    max-width: 80%;
    overflow-wrap: break-word;
`;

export const RetryButton = styled.button`
    background-color: #f44336;
    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
`;
