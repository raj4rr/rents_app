import useSEO from '../hooks/useSEO';
import React from 'react';
import ListingsPage from './ListingsPage';

export default function ListingsShortTerm() {
  useSEO({
    title: 'Short-Term Rentals & Sublets',
    description: 'Discover flexible short-term rental apartments and sublets. Perfect for temporary stays, students, and digital nomads.',
    keywords: 'short-term rentals, sublet, temporary housing, furnished apartments, flexible lease'
  });

  return <ListingsPage defaultStayType="SHORT_TERM" title="Short-term Listings" />;
}
