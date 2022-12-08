import React from 'react'
import Logo from '../../images/logo/logo.png'
import { ImageWrapper, Image } from './styles'

export const PokemonLogo = () => {
  return (
    <>
      <ImageWrapper>
        <Image src={Logo}/>
      </ImageWrapper>
    </>
  )
}
