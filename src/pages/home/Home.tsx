import React, { useState, useEffect } from 'react';
import ListGroup from '../../components/ListGroup';
import { Label, Input } from '../../styles/HomeStyles';
import {statisticsList} from '../../config/chartMetaData';

interface ListItem {
  text: string;
  link: string;
}

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<ListItem[]>([]);

useEffect(() => {
  setFilteredItems(
    statisticsList.filter(item =>
      item.text.toLowerCase().includes(search.toLowerCase())
    )
  );
}, [search]);

return (
  <article>
    <p>These statistics are generated using our <a href="/docs/programmatic-access/web-services-overview">Web Services</a> and represent the current holdings of the archive.</p>
    <Label htmlFor="statistics-filter">Browse Statistics</Label>
    <Input
      id="statistics-filter"
      type="text"
      placeholder="Search for a statistic"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />

    <ListGroup items={filteredItems} />
  </article>
);
};

export default HomePage;