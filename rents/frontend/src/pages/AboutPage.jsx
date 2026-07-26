import { useState } from 'react';
import SEO from '../components/SEO';
import client from '../api/client';

const TEAM_MEMBERS = [
  {
    name: 'Rajesh Kumar',
    role: 'Co-Founder & CEO',
    bio: 'Visionary entrepreneur passionate about revolutionizing the property management and shared-living landscape.',
    avatar: '💼'
  },
  {
    name: 'Sarah Lindemann',
    role: 'Head of Product Operations',
    bio: 'Product designer focusing on user-centered design, smooth booking workflows, and resident hub interfaces.',
    avatar: '👩‍💻'
  },
  {
    name: 'Elena Rostova',
    role: 'Lead Fullstack Architect',
    bio: 'Security enthusiast building secure, rate-limited, and database-backed rent-stack APIs and jobs.',
    avatar: '🚀'
  }
];

export default function AboutPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await client.post('/contact', contactForm);
      setSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 15px' }}>
      <SEO title="About Us & Vision" description="Learn more about RentStack Inventory, our vision for co-living automation, our product goals, team, and contact information." />
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '40px', background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '40px 20px', borderRadius: '16px', color: '#ffffff' }}>
        <p className="eyebrow" style={{ color: '#38bdf8', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem', trackingLetter: '1px' }}>RentStack Inventory Ecosystem</p>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '10px 0' }}>About Us</h2>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6' }}>
          We build robust digital infrastructure to run bed-level and room-level inventory with zero operations overhead at <a href="https://rentstackinventory.com/" style={{ color: '#38bdf8', textDecoration: 'underline' }}>rentstackinventory.com</a>.
        </p>
      </div>

      {/* Vision & Goals Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
        <div className="card" style={{ padding: '24px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '2rem' }}>👁️</span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', margin: '12px 0 8px' }}>Our Vision</h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            To simplify shared-living management, making coliving accessible, safe, and transparent for residents, while providing landlords with fully automated booking, KYC verification, and contract management.
          </p>
        </div>

        <div className="card" style={{ padding: '24px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '2rem' }}>🎯</span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#1e293b', margin: '12px 0 8px' }}>Our Goal</h3>
          <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
            Zero vacant nights for landlords through dynamic, short/long-term bed listing control, and zero landlord-resident friction through built-in automated digital lease agreements and transparent deposit calculations.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div style={{ marginBottom: '48px' }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1e293b', textAlign: 'center', marginBottom: '24px' }}>
          Meet the Team
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
          {TEAM_MEMBERS.map((m) => (
            <div key={m.name} className="card" style={{ padding: '20px', border: '1px solid #e2e8f0', textAlign: 'center', transition: 'transform 0.2s' }}>
              <div style={{ fontSize: '2.5rem', background: '#f8fafc', display: 'inline-block', padding: '14px', borderRadius: '50%', marginBottom: '14px' }}>
                {m.avatar}
              </div>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', color: '#1e293b', fontWeight: '700' }}>{m.name}</h4>
              <p style={{ margin: '0 0 12px 0', fontSize: '0.85rem', color: '#0369a1', fontWeight: 'bold' }}>{m.role}</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>{m.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="card" style={{ padding: '32px', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '32px' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>Contact Us</h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>
              Have questions about our bed-level booking APIs, security frameworks, or platform fees? Reach out to our operational team directly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#334155' }}>
              <span>📍 <strong>Address:</strong> Berlin Mitte Creative Hub, Germany</span>
              <span>🌐 <strong>Website:</strong> <a href="https://rentstackinventory.com/" target="_blank" rel="noopener noreferrer">https://rentstackinventory.com/</a></span>
              <span>📧 <strong>Email:</strong> support@rentstackinventory.com</span>
              <span>📞 <strong>Phone:</strong> +49 30 12345678</span>
            </div>
          </div>

          <div>
            {submitted ? (
              <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <span style={{ fontSize: '2.5rem' }}>✉️</span>
                <h4 style={{ margin: '10px 0 4px', fontSize: '1.2rem', fontWeight: '700' }}>Message Sent!</h4>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Thank you for reaching out. We will get back to you within 24 hours.</p>
                <button type="button" onClick={() => setSubmitted(false)} style={{ marginTop: '16px', background: '#16a34a', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
                <input
                  type="email"
                  placeholder="Your Email Address"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
                <textarea
                  placeholder="Write your message here..."
                  required
                  rows="4"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'vertical' }}
                />
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: 'var(--accent)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: submitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {submitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
