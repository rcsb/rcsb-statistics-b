import React, { useState, useEffect } from 'react';
import ListGroup from '../../components/ListGroup';
import { Label, Input, SectionContainer,SectionHeader } from '../../styles/HomeStyles';
import {statisticsList} from '../../config/chartMetaData';

interface ListItem {
  text: string;
  link: string;
}

const HomePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<ListItem[]>([]);
  const [filteredByGrowth, setFilteredByGrowth] = useState<ListItem[]>([]);
  const [filteredByDistribution, setFilteredByDistribution] = useState<ListItem[]>([]);
  


  useEffect(() => {
    const filtered = statisticsList.filter(item =>
      item.text.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
    setFilteredByGrowth(filtered.filter(item => item.text.startsWith('Growth by')));
    setFilteredByDistribution(filtered.filter(item => item.text.startsWith('Distribution by')));
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

  <div style={{ display: 'flex' }}>
    {filteredByGrowth.length > 0 && (
      <SectionContainer>
        <SectionHeader>Growth</SectionHeader>
        <ListGroup items={filteredByGrowth} />
      </SectionContainer>
    )}

    {filteredByDistribution.length > 0 && (
      <SectionContainer>
        <SectionHeader>Distribution</SectionHeader>
        <ListGroup items={filteredByDistribution} />
      </SectionContainer>
    )}
  </div>
</article>
);
};

export default HomePage;