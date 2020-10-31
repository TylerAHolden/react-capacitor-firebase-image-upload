import * as React from 'react'

import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  background: rgba(0, 255, 0, 0.1);
`

const Package: React.FC = () => (
  <Container>
    <h2>Hello World!</h2>
  </Container>
)

export default Package
