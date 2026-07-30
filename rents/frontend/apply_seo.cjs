const fs = require('fs');

const pages = [
  {
    file: 'frontend/src/pages/ListingsPage.jsx',
    title: 'All Rental Listings',
    desc: 'Browse our comprehensive inventory of premium rental properties, apartments, and rooms. Find your next home with RentStack today.',
    kw: 'rentals, apartments, rooms, real estate, property listings, rentstack'
  },
  {
    file: 'frontend/src/pages/ListingsShortTerm.jsx',
    title: 'Short-Term Rentals & Sublets',
    desc: 'Discover flexible short-term rental apartments and sublets. Perfect for temporary stays, students, and digital nomads.',
    kw: 'short-term rentals, sublet, temporary housing, furnished apartments, flexible lease'
  },
  {
    file: 'frontend/src/pages/ListingsLongTerm.jsx',
    title: 'Long-Term Apartments & Rooms',
    desc: 'Find your long-term home. Browse unfurnished and furnished apartments, private rooms, and permanent housing solutions.',
    kw: 'long-term rentals, permanent housing, apartments for rent, private rooms, lease'
  },
  {
    file: 'frontend/src/pages/FAQPage.jsx',
    title: 'Frequently Asked Questions',
    desc: 'Got questions about renting with RentStack? Read our FAQ for answers about deposits, leases, bookings, and more.',
    kw: 'FAQ, help, rental questions, renting guide, rentstack support'
  },
  {
    file: 'frontend/src/pages/HowItWorksPage.jsx',
    title: 'How It Works',
    desc: 'Learn how to book your perfect rental, manage your entries, and understand the RentStack process step-by-step.',
    kw: 'how it works, rental process, booking guide, tenant guide, owner guide'
  },
  {
    file: 'frontend/src/pages/AboutPage.jsx',
    title: 'About Us',
    desc: 'RentStack Inventory is redefining property management and rentals. Discover our mission to connect tenants with quality homes.',
    kw: 'about rentstack, property management, real estate tech, company mission'
  },
  {
    file: 'frontend/src/pages/LoginPage.jsx',
    title: 'Login',
    desc: 'Log in to your RentStack Inventory account.',
    kw: 'login, rentstack login'
  },
  {
    file: 'frontend/src/pages/RegisterPage.jsx',
    title: 'Register',
    desc: 'Create a new RentStack Inventory account to start booking or managing properties.',
    kw: 'register, sign up, rentstack'
  }
];

for (const page of pages) {
  if (!fs.existsSync(page.file)) continue;
  let content = fs.readFileSync(page.file, 'utf8');
  
  if (!content.includes('useSEO')) {
    // Add import
    content = `import useSEO from '../hooks/useSEO';\n` + content;
    
    // Add hook call inside component
    const hookCall = `\n  useSEO({\n    title: '${page.title}',\n    description: '${page.desc}',\n    keywords: '${page.kw}'\n  });\n`;
    
    // Find export default function
    const regex = /export default function [a-zA-Z0-9_]+\s*\([^)]*\)\s*\{/;
    content = content.replace(regex, match => match + hookCall);
    
    fs.writeFileSync(page.file, content);
    console.log(`Updated ${page.file}`);
  }
}
