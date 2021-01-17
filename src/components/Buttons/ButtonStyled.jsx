import styled from 'styled-components'

const ButtonStyled = styled.button`
    background-color: #e9ecef;
    padding: 1em 1.5em;
    transition: all 0.2s ease-in-out;
    border-radius: 10px;
    font-weight: 600;
    border: none;
    outline: none;

    &:hover {
        background-color: #ced4da;
        opacity: 0.8;
    }
    &:active {
        opacity: 1;
    }
    &:focus, &:active {
        outline: none;
    }
`

export { ButtonStyled }