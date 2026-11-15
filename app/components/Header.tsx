import styled from "styled-components";

const HeaderWrapper = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    background-color: #ffffff;
    color: #181818;
    padding: 0 6vh;
`;

export default function Header() {
    return (
        <HeaderWrapper>
            <h2>CS303 - URL Shortener</h2>
        </HeaderWrapper>
    );
}