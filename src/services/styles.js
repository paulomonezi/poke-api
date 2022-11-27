import styled from "styled-components";

export const Card = styled.div`
width: 100%;
border-radius: 10px;
background-color: #eeee;
display: flex;
position: relative;
flex-direction: column;
align-items: center;
justify-content: space-around;
`

export const Sprite = styled.img`
margin: 40px 0;
max-width: 100%;
`

export const Type = styled.span`
position: absolute;
top: 0;
left: 5px;
`

export const Number = styled.span`
position: absolute;
top: 0;
right: 5px;
`

export const Name = styled.h2`
text-transform: capitalize;
margin-top: -40px;
`

