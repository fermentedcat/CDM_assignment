import styled from 'styled-components'

const HeaderStyled = styled.header`
    background-color: #e9ecef;
    width: 100%;
    height: 12em;
    padding: 0;
    margin-bottom: 4em;
    div {
        display: flex;
        margin:0;
        flex-direction: row;
        justify-content: space-between;
        background-color: #ced4da;
        div {
            display: flex;
            align-items: center;
            justify-content: space-between;
            p {
                margin: 0;
                padding-right: 1.2em;
            }
        }   
    }
`
export { HeaderStyled }