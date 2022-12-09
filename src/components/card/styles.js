import styled from 'styled-components'

export const CardWrapper = styled.div`
max-height: 265px;
max-width: 200px;
color: black;
`

export const Card = styled.div`
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
height: 200px;
width: 200px;
`

export const Types = styled.span`
position: absolute;
display: flex;
flex-direction: column;
gap: 2px;
top: 0;
left: 5px;
font-size: 12px;
`

export const Number = styled.span`
position: absolute;
top: 0;
right: 5px;
font-size: 12px;
`

export const Name = styled.h2`
text-transform: capitalize;
margin-top: -40px;
font-size: 16px;
`