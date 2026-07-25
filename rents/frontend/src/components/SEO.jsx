import { useEffect } from 'react';

export default function SEO({ title, description, keywords }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | RentStack`;
    } else {
      document.title = 'RentStack | Vetted Room Inventory & Coliving Stays';
    }

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description || 'RentStack connects verified landlords directly with international students and professionals for vetted, high-quality, and community-driven coliving room rentals.';

    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords || 'coliving, room rental, student housing, shared apartments, verified flats';
  }, [title, description, keywords]);

  return null;
}
