import styled from 'styled-components'
import { ButtonStyled } from './ButtonStyled'

const ButtonNavStyled = styled(ButtonStyled)`
    background: none;
    padding: 0.8em 1.2em;
    border-radius: 0;

    &:hover {
        background-color: ${props => props.background || "#e9ecef"};
    }
`

export { ButtonNavStyled }
