import React from 'react';
import { Link } from 'react-router-dom';

interface ListItem {
  text: string;
  link: string;
}

interface ListGroupProps {
  items: ListItem[];
}

const ListGroup: React.FC<ListGroupProps> = ({ items }) => {
  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <Link key={index} to={item.link} className="list-group-item">
          {item.text}
        </Link>
      ))}
    </ul>
  );
};

export default ListGroup;