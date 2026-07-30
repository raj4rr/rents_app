import useSEO from '../hooks/useSEO';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const SLIDES = [
  {
    title: '1. Browse & Filter Vetted Rooms',
    subtitle: 'Find your perfect coliving spaces or short/long term student beds.',
    description: [
      'Choose between Short-term (daily/weekly stays) or Long-term (monthly student housing) options.',
      'Filter by Anmeldung (city registration) availability, included utilities (internet, electricity, heating), and location.',
      'Every listing is 100% verified with mathematical capacity checks to prevent double-booking.'
    ],
    color: 'from-blue-600 to-indigo-600',
    icon: (
      <svg style={{ width: '48px', height: '48px', color: '#1f66ea' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
    preview: (
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          <span style={{ padding: '4px 10px', background: '#e0f2fe', color: '#0369a1', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>Long-Term</span>
          <span style={{ padding: '4px 10px', background: '#dcfce7', color: '#15803d', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>✓ Anmeldung Ok</span>
        </div>
        <div style={{ width: '100%', height: '100px', background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>
          Cozy Room in Berlin Mitte
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1e293b' }}>€520/month</span>
          <span style={{ color: '#10b981', fontSize: '0.8rem', fontWeight: '600' }}>★ Vetted & Trusted</span>
        </div>
      </div>
    )
  },
  {
    title: '2. Submit Booking Request',
    subtitle: 'Secure your stay dates and configure your capacity requirement.',
    description: [
      'Enter your desired check-in and check-out dates directly on the listing page.',
      'The platform instantly calculates stay duration and generates a detailed quote.',
      'Once submitted, the landlord gets notified to review your profile and approve the request.'
    ],
    color: 'from-purple-600 to-indigo-600',
    icon: (
      <svg style={{ width: '48px', height: '48px', color: '#8b5cf6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    preview: (
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#1e293b' }}>Select Stay Dates</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '10px' }}>
          <div style={{ border: '1px solid #cbd5e1', padding: '6px', borderRadius: '6px', fontSize: '0.8rem', background: '#f8fafc' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>CHECK-IN</div>
            <strong>2026-09-01</strong>
          </div>
          <div style={{ border: '1px solid #cbd5e1', padding: '6px', borderRadius: '6px', fontSize: '0.8rem', background: '#f8fafc' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>CHECK-OUT</div>
            <strong>2027-02-28</strong>
          </div>
        </div>
        <button style={{ width: '100%', background: '#8b5cf6', color: '#fff', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem' }}>
          Request Booking Approval
        </button>
      </div>
    )
  },
  {
    title: '3. Complete Profile Verification',
    subtitle: 'Upload proof of identity and signature on your portal.',
    description: [
      'Fill out your legal personal details including Date of Birth and Nationality.',
      'Upload high-resolution scans of your Passport and Visa/German Residence proof.',
      'Upload a legal signature image with a white background to sign rental agreements.',
      'Compare your document qualities with standard 3D AI-rendered guidelines.'
    ],
    color: 'from-amber-600 to-orange-600',
    icon: (
      <svg style={{ width: '48px', height: '48px', color: '#f59e0b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    preview: (
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#1e293b' }}>Identity Portal</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '6px', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
            <span>✓ Passport Scan</span>
            <span style={{ color: '#047857', fontWeight: 'bold' }}>Uploaded</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', padding: '6px', background: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
            <span>✓ Legal Signature</span>
            <span style={{ color: '#047857', fontWeight: 'bold' }}>Uploaded</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: '4. Pay Rent & Platform Fees',
    subtitle: 'Submit bank transfer reference codes on your booking.',
    description: [
      'RentStack Inventory requires bank transfers directly to two separate IBAN accounts.',
      'Transfer the Platform Fee to RentStack Inventory, and the Rent + Deposit to the owner.',
      'Paste the transaction reference numbers from your bank transfer confirmation.',
      'The landlord confirms references before the booking status transitions.'
    ],
    color: 'from-emerald-600 to-teal-600',
    icon: (
      <svg style={{ width: '48px', height: '48px', color: '#10b981' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-20c5.303 0 9.618 4.315 9.618 9.618S17.303 21.236 12 21.236 2.382 16.921 2.382 11.618 6.697 2 12 2z" />
      </svg>
    ),
    preview: (
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
        <div style={{ border: '1px solid #cbd5e1', padding: '8px', borderRadius: '8px', marginBottom: '8px', fontSize: '0.78rem' }}>
          <strong>Rent & Deposit:</strong> €1,040.00
          <div style={{ color: '#64748b', fontSize: '0.7rem' }}>IBAN: DE89 3704 0044 0532 ...</div>
        </div>
        <input type="text" placeholder="Enter transfer reference code" readOnly value="TXN-4930219" style={{ width: '100%', padding: '6px', fontSize: '0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', boxSizing: 'border-box' }} />
      </div>
    )
  },
  {
    title: '5. Lease Agreement & Final Confirmation',
    subtitle: 'Generate and download signed PDF contracts instantly.',
    description: [
      'Once both reference payments are verified, the owner will generate a secure Booking Confirmation Code.',
      'Enter the 6-character Confirmation Code on your booking dashboard.',
      'Upon input, status updates to CONFIRMED, and your fully-signed official PDF lease agreement becomes ready to download.'
    ],
    color: 'from-pink-600 to-rose-600',
    icon: (
      <svg style={{ width: '48px', height: '48px', color: '#ec4899' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    preview: (
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
        <span style={{ display: 'inline-block', padding: '4px 10px', background: '#dcfce7', color: '#15803d', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '10px' }}>
          ✓ Booking Confirmed
        </span>
        <button style={{ width: '100%', background: '#10b981', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          📥 Download PDF Lease
        </button>
      </div>
    )
  }
];

export default function HowItWorksPage() {
  useSEO({
    title: 'How It Works',
    description: 'Learn how to book your perfect rental, manage your entries, and understand the RentStack process step-by-step.',
    keywords: 'how it works, rental process, booking guide, tenant guide, owner guide'
  });

  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section style={{ maxWidth: '850px', margin: '0 auto', padding: '30px 15px' }}>
      <SEO title="How It Works - Booking Walkthrough" description="Learn step-by-step instructions on how to browse verified stays, verify your resident profile, submit bank transfers, and download signed lease contracts on RentStack Inventory." />
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', marginBottom: '10px', background: 'linear-gradient(135deg, #1e293b, #475569)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Vetted Stays Made Simple
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Follow our transparent coliving steps to securely verify your identity, process bank payments, and download your lease contract.
        </p>
      </div>

      {/* Main Slideshow Container */}
      <div style={{ 
        background: '#ffffff', 
        borderRadius: '24px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)', 
        border: '1px solid #f1f5f9',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Slideshow progress bar */}
        <div style={{ width: '100%', height: '6px', background: '#f1f5f9' }}>
          <div style={{ 
            height: '100%', 
            width: `${((currentSlide + 1) / SLIDES.length) * 100}%`, 
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', 
            transition: 'width 0.4s ease' 
          }} />
        </div>

        {/* Content Wrapper */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          gap: '30px', 
          padding: '40px',
          alignItems: 'center',
          minHeight: '380px'
        }}>
          {/* Left Text Detail */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              {slide.icon}
              <span style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', color: '#6366f1', letterSpacing: '1px' }}>
                Step {currentSlide + 1} of {SLIDES.length}
              </span>
            </div>
            <h3 style={{ fontSize: '1.7rem', fontWeight: '800', color: '#1e293b', margin: '0 0 8px 0' }}>
              {slide.title}
            </h3>
            <p style={{ color: '#64748b', fontSize: '1rem', fontWeight: '500', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              {slide.subtitle}
            </p>

            <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {slide.description.map((desc, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', color: '#475569', fontSize: '0.92rem', marginBottom: '10px', lineHeight: '1.5' }}>
                  <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                  <span>{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Preview Card mockup */}
          <div style={{ 
            background: '#f8fafc', 
            borderRadius: '20px', 
            padding: '40px 30px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: '260px',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ width: '100%', maxWidth: '280px' }}>
              {slide.preview}
            </div>
          </div>
        </div>

        {/* Navigation bottombar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          background: '#f8fafc', 
          padding: '20px 40px',
          borderTop: '1px solid #f1f5f9'
        }}>
          <button 
            type="button" 
            onClick={handlePrev}
            style={{ 
              background: '#ffffff', 
              color: '#334155', 
              border: '1px solid #cbd5e1', 
              borderRadius: '12px', 
              padding: '10px 18px', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ← Previous
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentSlide(idx);
                }}
                style={{
                  width: idx === currentSlide ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '10px',
                  background: idx === currentSlide ? '#3b82f6' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {/* Pause/Play Button */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: '#475569'
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button 
              type="button" 
              onClick={handleNext}
              style={{ 
                background: '#0f172a', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '12px', 
                padding: '10px 22px', 
                fontWeight: 'bold', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Direct Quick Link */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button 
          onClick={() => navigate('/')}
          style={{ 
            padding: '12px 28px', 
            background: 'linear-gradient(135deg, #3b82f6, #4f46e5)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '12px', 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)'
          }}
        >
          Explore Listings & Start Booking
        </button>
      </div>
    </section>
  );
}
