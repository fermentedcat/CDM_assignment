import styled from 'styled-components'
import { ButtonStyled } from './ButtonStyled'

const ButtonWarningStyled = styled(ButtonStyled)`
    &:hover {
        background-color: ${props => props.danger ? "tomato" : "gold"};
    }
`

export { ButtonWarningStyled }
