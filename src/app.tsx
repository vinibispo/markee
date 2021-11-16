import { Aside } from 'aside'
import { Content } from 'content'
import styled from 'styled-components'

export function App () {
  return (
    <Main>
      <Aside />
      <Content />
    </Main>
  )
}
const Main = styled.main`
  display: flex;
  height: 100vh;
`
