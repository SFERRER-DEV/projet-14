import React from 'react';
import styled from 'styled-components';

const Tag = styled.span`
  display: inline-block;
  padding: 0.5em 1em;
  margin-right: 1em;
  margin-bottom: 1em;
  background-color: #d2e8f5;
  border-radius: 0.5em;
  font-size: 0.85em;
  color: #1a2933;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1em;
  margin: 2em;
`;

function Tags({ listTags, start }) {
  return (
    <Container>
      {listTags.map((element, index) => (
        <Tag key={start + index}>{`${element.id} - ${element.name}`}</Tag>
      ))}
    </Container>
  );
}

export default Tags;
