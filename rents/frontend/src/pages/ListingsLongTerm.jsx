import useSEO from '../hooks/useSEO';
import React from 'react';
import ListingsPage from './ListingsPage';

export default function ListingsLongTerm() {
  useSEO({
    title: 'Long-Term Apartments & Rooms',
    description: 'Find your long-term home. Browse unfurnished and furnished apartments, private rooms, and permanent housing solutions.',
    keywords: 'long-term rentals, permanent housing, apartments for rent, private rooms, lease'
  });

  return <ListingsPage defaultStayType="LONG_TERM" title="Long-term Listings" />;
}
