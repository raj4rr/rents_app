import useSEO from '../hooks/useSEO';
import { useMemo, useState } from 'react';
import SEO from '../components/SEO';

const FAQ_DATA = [
  {
    category: 'Who We Are & Trust',
    items: [
      {
        question: 'Who we are?',
        answer: 'RentStack Inventory is a premier modern room inventory and coliving network available at https://rentstackinventory.com/. We connect verified room owners directly with international students, remote workers, and young professionals searching for vetted, high-quality, and community-driven housing.'
      },
      {
        question: 'Why choose us?',
        answer: 'Unlike traditional rental platforms, RentStack Inventory offers zero-middleman transactions, automatic professional lease contracts, standard 3D AI-rendered space layouts, and fully verified bank routing. We eliminate scams and duplicate listings entirely.'
      },
      {
        question: 'Why you can trust us?',
        answer: 'Every property partner is verified through strict KYC passport audits, property deeds, and banking proof checks. The landlord cannot confirm payment receipt until you submit the reference numbers, and the system logs all details securely.'
      }
    ]
  },
  {
    category: 'Booking & Property Verification',
    items: [
      {
        question: 'What are the booking steps?',
        answer: '1. Select your stay type (Short-term or Long-term) and find a listing.\n2. Click Book, choose your dates, and send a request.\n3. Once the owner approves, navigate to the Booking Payment Page.\n4. Complete the secure bank transfers and submit the reference codes.\n5. Download your professional PDF lease agreement and request the final confirmation ID.'
      },
      {
        question: 'How we verify properties?',
        answer: 'We manually check city registration (Anmeldung) approvals, utility accounts, and furnishing standards. Our coliving apartment trees (Property > Apartment > Room > Bed) are verified mathematically to ensure 0% stay overlap and 100% capacity accuracy.'
      },
      {
        question: 'Why do we use 3D AI images instead of actual photographs?',
        answer: 'To protect the privacy of current residents and property owners, we do not expose actual interior photographs. The 3D AI-rendered images are designed to accurately depict the exact room layouts, furnishings, and amenities you will receive at the property.'
      },
      {
        question: 'What does room capacity mean (e.g., Capacity: 1, Capacity: 2, Capacity: 3)?',
        answer: 'Room capacity indicates the total number of single beds configured inside that specific room. For example, "Capacity: 1" is a single private occupancy room, "Capacity: 2" is a double-occupancy shared room, and "Capacity: 3" is a triple-occupancy coliving setup.'
      },
      {
        question: 'How many rooms are there in each coliving apartment?',
        answer: 'Our inventory includes coliving apartments of various sizes. We offer 1-room studio apartments, 2-room and 3-room shared suites, and a limited collection of larger 4-room coliving apartments.'
      }
    ]
  },
  {
    category: 'Payments & Deposit',
    items: [
      {
        question: 'How to pay?',
        answer: 'All payments are handled via secure SEPA Bank Transfer. When your booking is approved, you will get the bank details (IBAN, BIC, Account Holder) for both the RentStack Platform Fee account and the Landlord Rent account.'
      },
      {
        question: 'What is the payment process?',
        answer: 'After transferring funds through your bank, enter the transaction reference numbers on the Booking Payment Page. The owner will verify both references individually. Once approved, the booking status updates and a final payment ID is generated for you.'
      },
      {
        question: 'What and why is the deposit/security amount?',
        answer: 'The security deposit is a standard financial guarantee. It covers potential property damage, cleaning costs, or breaches of contract during your stay, protecting the landlord while reserving your exclusive room rights.'
      },
      {
        question: 'Is the deposit refundable or not?',
        answer: 'Yes, it is 100% refundable! Following German rental regulations, the security deposit must be returned in full by the landlord within 30 days after check-out, provided no damage is found and all utility bills are settled.'
      },
      {
        question: 'When will I receive my signed lease agreement / contract?',
        answer: 'You will receive the signed contract PDF once all verification and payment steps are complete. After the landlord verifies and approves your bank transfer references, they will provide a final payment confirmation ID. Once you input this code on the portal, your booking status updates to "CONFIRMED" and the fully signed lease agreement is instantly generated and available for download.'
      },
      {
        question: 'If a tenant is not willing to complete all verification steps, can payments be refunded?',
        answer: 'No. Once a booking is approved and payment receipt is logged by the owner, the transaction is locked and the room is held exclusively for you. Therefore, payments cannot be refunded if a tenant declines to finish the required verification steps.'
      },
      {
        question: 'What happens if I do not enter the final payment confirmation code?',
        answer: 'If you do not input the payment confirmation code manually, the booking will be verified and automatically marked as "CONFIRMED" 48 hours after the payment receipt is logged by the landlord.'
      }
    ]
  },
  {
    category: 'Deductions & Refunds',
    items: [
      {
        question: 'Can the landlord deduct or cut amount from my security deposit?',
        answer: 'Yes. If there is property damage, key loss, cleaning needed, or other breaches of contract during your stay, the landlord can log damage deductions on the Booking Payment page. They must select/provide a reason and upload a photo as evidence for each deduction.'
      },
      {
        question: 'How do I see if deductions have been made to my deposit refund?',
        answer: 'Any applied damage deductions are listed dynamically under the "Security Deposit Refund Information" card on the Booking Payment & Contract page. It will detail the deducted amounts, the reasons, and provide links to view the landlord’s uploaded photo evidence.'
      },
      {
        question: 'What is the Net Refund amount?',
        answer: 'The Net Refund amount is the final deposit refund owed to you. It is automatically calculated in real-time by subtracting the total sum of all logged deductions from your initial security deposit. This net amount is refunded back to your bank account.'
      },
      {
        question: 'How do I configure my refund bank account as a tenant?',
        answer: 'Navigate to your Profile page and look for the "Payment Account" card in the right column. Enter your Account Holder name, IBAN, and BIC. This bank account details will be shared with the landlord to process your deposit refund.'
      }
    ]
  }
];

export default function FAQPage() {
  useSEO({
    title: 'Frequently Asked Questions',
    description: 'Got questions about renting with RentStack? Read our FAQ for answers about deposits, leases, bookings, and more.',
    keywords: 'FAQ, help, rental questions, renting guide, rentstack support'
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuestion, setActiveQuestion] = useState(null);

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return FAQ_DATA;
    const query = searchTerm.toLowerCase();
    return FAQ_DATA.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.question.toLowerCase().includes(query) || 
        item.answer.toLowerCase().includes(query)
      )
    })).filter(cat => cat.items.length > 0);
  }, [searchTerm]);

  const toggleQuestion = (qIndex) => {
    setActiveQuestion(prev => prev === qIndex ? null : qIndex);
  };

  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '20px 10px' }}>
      <SEO title="Frequently Asked Questions (FAQ)" description="Find answers to common questions about booking rooms, security deposits, utility billing, and lease agreements on RentStack Inventory." />
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
          Everything you need to know about booking, payments, trust, and verification on RentStack Inventory.
        </p>

        {/* Search bar */}
        <div style={{ marginTop: '20px', position: 'relative', display: 'inline-block', width: '100%', maxWidth: '500px' }}>
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              fontSize: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {filteredFaqs.length === 0 ? (
        <div className="card" style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
          <p style={{ fontSize: '1.1rem' }}>No results match your search term.</p>
        </div>
      ) : (
        filteredFaqs.map((cat, catIdx) => (
          <div key={catIdx} style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1f66ea', marginBottom: '15px', borderBottom: '2px solid #e2e8f0', paddingBottom: '6px' }}>
              {cat.category}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cat.items.map((item, itemIdx) => {
                const uniqueKey = `${catIdx}-${itemIdx}`;
                const isOpen = activeQuestion === uniqueKey;
                return (
                  <div 
                    key={itemIdx} 
                    className="card" 
                    style={{ 
                      padding: '16px 20px', 
                      cursor: 'pointer', 
                      borderRadius: '10px',
                      border: isOpen ? '1px solid #1f66ea' : '1px solid #e2e8f0',
                      background: isOpen ? '#f8fafc' : '#ffffff',
                      transition: 'all 0.2s ease',
                      boxShadow: isOpen ? '0 4px 12px rgba(31, 102, 234, 0.08)' : '0 2px 4px rgba(0,0,0,0.02)'
                    }}
                    onClick={() => toggleQuestion(uniqueKey)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#1e293b' }}>
                        {item.question}
                      </span>
                      <span style={{ 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold', 
                        color: isOpen ? '#1f66ea' : '#94a3b8',
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        transition: 'transform 0.2s ease',
                        display: 'inline-block',
                        lineHeight: 1
                      }}>
                        +
                      </span>
                    </div>
                    
                    {isOpen && (
                      <div 
                        style={{ 
                          marginTop: '12px', 
                          color: '#475569', 
                          fontSize: '0.98rem', 
                          lineHeight: '1.5',
                          whiteSpace: 'pre-line',
                          borderTop: '1px solid #e2e8f0',
                          paddingTop: '10px'
                        }}
                        onClick={(e) => e.stopPropagation()} // prevent closing when clicking answer
                      >
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
