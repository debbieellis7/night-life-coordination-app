import React from 'react';
import { Container, Segment, List } from 'semantic-ui-react';

export default function Footer() {
  return (
    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '3em 0em' }}>
      <Container textAlign='center'>
        <List horizontal inverted divided link size='small'>
          Copyright &copy; {new Date().getFullYear()} Night Life Coordination
        </List>
      </Container>
    </Segment>
  )
}
