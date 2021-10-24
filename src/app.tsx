import styled from 'styled-components'

export function App () {
  return (
    <Title>App</Title>
  )
}

const Title = styled.h1`
color: ${props => props.theme.colors.primary};
`
