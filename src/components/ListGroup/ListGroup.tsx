import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

interface ListItem {
  text: string;
  link: string;
}

interface ListGroupProps {
  items: ListItem[];
}

const StyledList = styled.ul`
  padding: 0
`;

const StyledLink = styled(RouterLink).attrs({
  className: 'list-group-item',
})`
  max-width: 400px;
`;
const ListGroup: React.FC<ListGroupProps> = ({ items }) => {
  return (
    <StyledList>
      {items.map((item, index) => (
        <StyledLink key={index} to={item.link}>
          {item.text}
        </StyledLink>
      ))}
    </StyledList>
  );
};

export default ListGroup;