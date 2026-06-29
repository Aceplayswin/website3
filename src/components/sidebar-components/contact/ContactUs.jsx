import React, { useEffect, useRef, useState } from 'react';
import {
  FaCheckCircle,
  FaClock,
  FaEnvelope,
  FaExclamationTriangle,
  FaHeadphones,
  FaHistory,
  FaPaperPlane,
  FaPaperclip,
  FaShieldAlt,
  FaTicketAlt,
  FaTimes,
  FaUser,
  FaWhatsapp,
} from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { FONTS } from '../../../constants/theme';
import { useSite } from '../../../context/SiteContext';
import { API_URL } from '../../../utils/constants';

const palette = {
  gold: '#b77a0a',
  goldSoft: 'rgba(183,122,10,0.12)',
  goldBorder: 'rgba(183,122,10,0.22)',
  text: '#15132a',
  muted: '#6f6a8c',
  card: 'rgba(255,255,255,0.88)',
  line: 'rgba(151,142,178,0.18)',
  red: '#ef4444',
  green: '#0aa66a',
};

const fieldBase = {
  width: '100%',
  minHeight: 46,
  border: `1px solid ${palette.line}`,
  borderRadius: 16,
  background: 'rgba(255,255,255,0.86)',
  color: palette.text,
  fontFamily: FONTS.ui,
  fontSize: 13,
  fontWeight: 700,
  outline: 'none',
  padding: '0 15px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.84)',
};

const labelBase = {
  display: 'block',
  marginBottom: 8,
  color: '#817b9c',
  fontFamily: FONTS.head,
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
};

const ContactUs = ({ onShowHistory }) => {
  const { accountInfo } = useSite();
  const fileInputRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 820);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'Medium',
    profile_id: '',
  });
  const [attachments, setAttachments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [notification, setNotification] = useState({ isOpen: false, message: '', type: 'success' });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (event) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleFileChange = (event) => {
    setAttachments((current) => [...current, ...Array.from(event.target.files || [])]);
  };

  const removeAttachment = (index) => {
    setAttachments((current) => current.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const userId = localStorage.getItem('account_id') || 'guest';
      const authKey = localStorage.getItem('auth_secret_key') || 'guest';
      const body = new FormData();
      Object.keys(formData).forEach((key) => body.append(key, formData[key]));
      body.append('USER_ID', userId);
      attachments.forEach((file) => body.append('attachments[]', file));

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { Route: 'route-submit-ticket', AuthToken: authKey },
        body,
      });
      const result = await response.json();

      if (result.status_code === 'success') {
        setTicketId(result.ticket_id || `TKT-${Date.now()}`);
        setNotification({ isOpen: true, message: 'Ticket submitted. Our team will contact you shortly.', type: 'success' });
        setFormData({ name: '', email: '', subject: '', message: '', priority: 'Medium', profile_id: '' });
        setAttachments([]);
      } else {
        setNotification({ isOpen: true, message: `Submission failed: ${result.status_code || 'Unknown error'}`, type: 'error' });
      }
    } catch {
      setNotification({ isOpen: true, message: 'Network error. Please check your connection.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputFocus = (event) => {
    event.currentTarget.style.borderColor = palette.gold;
    event.currentTarget.style.boxShadow = '0 0 0 4px rgba(183,122,10,0.10), inset 0 1px 0 rgba(255,255,255,0.84)';
  };

  const inputBlur = (event) => {
    event.currentTarget.style.borderColor = palette.line;
    event.currentTarget.style.boxShadow = fieldBase.boxShadow;
  };

  const inputProps = {
    style: fieldBase,
    onFocus: inputFocus,
    onBlur: inputBlur,
  };

  const quickStats = [
    { icon: <FaClock />, value: '< 2 hrs', label: 'avg response' },
    { icon: <FaShieldAlt />, value: 'secure', label: 'private tickets' },
    { icon: <FaHeadphones />, value: '24/7', label: 'support desk' },
  ];

  const categories = [
    'Deposit Issue',
    'Withdrawal Issue',
    'Account Issue',
    'Game Issue',
    'Bonus/Promotion',
    'Technical Issue',
    'Other',
  ];

  return (
    <section className="support-redesign" style={{ color: palette.text, fontFamily: FONTS.ui }}>
      <AnimatePresence>
        {notification.isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'grid', placeItems: 'center', background: 'rgba(20,17,43,0.48)', backdropFilter: 'blur(8px)', padding: 18 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              style={{ width: 'min(390px, 100%)', borderRadius: 28, padding: 24, background: 'linear-gradient(145deg, #ffffff, #fff8ea)', border: `1px solid ${palette.goldBorder}`, boxShadow: '0 28px 80px rgba(20,17,43,0.28)', textAlign: 'center' }}
            >
              <div style={{ width: 58, height: 58, margin: '0 auto 14px', borderRadius: 20, display: 'grid', placeItems: 'center', background: notification.type === 'success' ? 'rgba(10,166,106,0.10)' : 'rgba(239,68,68,0.10)', color: notification.type === 'success' ? palette.green : palette.red, fontSize: 24 }}>
                {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
              </div>
              <h3 style={{ margin: '0 0 8px', fontFamily: FONTS.head, fontSize: 21, fontWeight: 900 }}>{notification.type === 'success' ? 'Ticket Created' : 'Try Again'}</h3>
              <p style={{ margin: 0, color: palette.muted, fontSize: 13, lineHeight: 1.55 }}>{notification.message}</p>
              {notification.type === 'success' && (
                <div style={{ marginTop: 16, padding: 12, borderRadius: 16, background: 'rgba(183,122,10,0.08)', border: `1px solid ${palette.goldBorder}` }}>
                  <span style={{ display: 'block', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: palette.muted, fontWeight: 900 }}>ticket id</span>
                  <strong style={{ fontFamily: FONTS.head, fontSize: 16, color: palette.gold }}>{ticketId}</strong>
                </div>
              )}
              <button type="button" onClick={() => setNotification((current) => ({ ...current, isOpen: false }))} style={{ width: '100%', marginTop: 18, minHeight: 44, border: 'none', borderRadius: 15, background: 'linear-gradient(135deg, #b77a0a, #ffd66b)', color: '#211604', fontFamily: FONTS.head, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="support-intro-grid" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.05fr) minmax(320px, 0.95fr)', gap: 16, marginBottom: 16 }}>
        <div className="support-hero-card" style={{ minHeight: 238, borderRadius: 30, padding: isMobile ? 22 : 30, background: 'radial-gradient(circle at 80% 20%, rgba(255,214,107,0.32), transparent 34%), linear-gradient(135deg, #ffffff 0%, #fff9ec 54%, #f4f0ff 100%)', border: '1px solid rgba(255,255,255,0.9)', boxShadow: '0 18px 48px rgba(36,32,65,0.10)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: 26, bottom: -16, fontFamily: FONTS.head, fontSize: isMobile ? 58 : 96, fontWeight: 900, color: 'rgba(183,122,10,0.06)', pointerEvents: 'none' }}>HELP</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '7px 12px', borderRadius: 999, background: palette.goldSoft, border: `1px solid ${palette.goldBorder}`, color: palette.gold, fontFamily: FONTS.head, fontSize: 10, fontWeight: 900, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
            <FaHeadphones /> support command
          </div>
          <h1 style={{ maxWidth: 520, margin: '18px 0 10px', color: palette.text, fontFamily: FONTS.head, fontSize: isMobile ? 34 : 52, lineHeight: 0.98, fontWeight: 900, letterSpacing: 0 }}>
            Need help? Start a ticket.
          </h1>
          <p style={{ maxWidth: 560, margin: 0, color: palette.muted, fontSize: 14, fontWeight: 700, lineHeight: 1.55 }}>
            Tell us what happened, attach proof if needed, and track every reply from your support history.
          </p>
        </div>

        <aside className="support-quick-card" style={{ borderRadius: 30, padding: 18, background: 'linear-gradient(145deg, rgba(20,17,43,0.96), rgba(46,36,78,0.92))', boxShadow: '0 18px 48px rgba(20,17,43,0.18)', color: '#fff' }}>
          <div className="support-stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            {quickStats.map((item) => (
              <div className="support-stat-card" key={item.label} style={{ minHeight: 94, borderRadius: 20, padding: 12, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ color: '#ffd66b', fontSize: 18 }}>{item.icon}</div>
                <strong style={{ display: 'block', marginTop: 12, color: '#fff', fontFamily: FONTS.head, fontSize: 18, fontWeight: 900 }}>{item.value}</strong>
                <span style={{ color: 'rgba(255,255,255,0.56)', fontSize: 9, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{item.label}</span>
              </div>
            ))}
          </div>
          <button type="button" onClick={onShowHistory} style={{ width: '100%', marginTop: 14, minHeight: 50, borderRadius: 18, border: '1px solid rgba(255,214,107,0.34)', background: 'rgba(255,214,107,0.12)', color: '#ffd66b', fontFamily: FONTS.head, fontSize: 12, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9 }}>
            <FaHistory /> View my tickets
          </button>
          <div className="support-action-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <a href={accountInfo?.service_support_url || '#'} style={{ minHeight: 48, borderRadius: 16, background: 'rgba(255,255,255,0.08)', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 900, fontSize: 12 }}>
              <FaWhatsapp /> Chat
            </a>
            <a href={`mailto:${accountInfo?.service_email || ''}`} style={{ minHeight: 48, borderRadius: 16, background: 'rgba(255,255,255,0.08)', color: '#fff', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 900, fontSize: 12 }}>
              <FaEnvelope /> Email
            </a>
          </div>
        </aside>
      </div>

      <form className="support-form-card" onSubmit={handleSubmit} style={{ borderRadius: 30, padding: isMobile ? 18 : 24, background: palette.card, border: '1px solid rgba(255,255,255,0.86)', boxShadow: '0 18px 48px rgba(36,32,65,0.10)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
          <div>
            <span style={{ color: palette.gold, fontFamily: FONTS.head, fontSize: 10, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase' }}>ticket details</span>
            <h2 className="support-form-title" style={{ margin: '5px 0 0', color: palette.text, fontFamily: FONTS.head, fontSize: 25, fontWeight: 900 }}>Submit Support Request</h2>
          </div>
          <div className="support-routing-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 13px', borderRadius: 999, background: 'rgba(183,122,10,0.08)', border: `1px solid ${palette.goldBorder}`, color: palette.gold, fontSize: 11, fontWeight: 900 }}>
            <FaTicketAlt /> Priority routing enabled
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: 14 }}>
          <div>
            <label style={labelBase}>Full name</label>
            <input {...inputProps} type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your name" />
          </div>
          <div>
            <label style={labelBase}>Profile ID</label>
            <div style={{ position: 'relative' }}>
              <FaUser className="support-profile-icon" style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: palette.gold, fontSize: 12 }} />
              <input {...inputProps} style={{ ...fieldBase, paddingLeft: 40 }} type="text" name="profile_id" value={formData.profile_id} onChange={handleChange} placeholder="Optional user id" />
            </div>
          </div>
          <div>
            <label style={labelBase}>Email address</label>
            <input {...inputProps} type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" />
          </div>
          <div>
            <label style={labelBase}>Priority</label>
            <select {...inputProps} name="priority" required value={formData.priority} onChange={handleChange}>
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={labelBase}>Category</label>
          <select {...inputProps} name="subject" required value={formData.subject} onChange={handleChange}>
            <option value="">Choose a category</option>
            {categories.map((category) => <option value={category} key={category}>{category}</option>)}
          </select>
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={labelBase}>Message</label>
          <textarea
            {...inputProps}
            name="message"
            required
            rows={isMobile ? 5 : 6}
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your issue clearly..."
            style={{ ...fieldBase, minHeight: isMobile ? 126 : 144, paddingTop: 14, resize: 'vertical', lineHeight: 1.5 }}
          />
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={labelBase}>Attachment</label>
          <div className="support-upload-drop" onClick={() => fileInputRef.current?.click()} style={{ minHeight: 82, borderRadius: 20, border: `1.5px dashed ${palette.goldBorder}`, background: 'linear-gradient(135deg, rgba(183,122,10,0.07), rgba(255,255,255,0.72))', display: 'grid', placeItems: 'center', cursor: 'pointer', textAlign: 'center', padding: 14 }}>
            <FaPaperclip style={{ color: palette.gold, fontSize: 18, marginBottom: 7 }} />
            <span style={{ color: palette.muted, fontSize: 12, fontWeight: 800 }}>Upload image, PDF, DOC or screenshot</span>
            <input type="file" ref={fileInputRef} multiple onChange={handleFileChange} style={{ display: 'none' }} accept="image/*,.pdf,.doc,.docx" />
          </div>
          {attachments.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
              {attachments.map((file, index) => (
                <div key={`${file.name}-${index}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, maxWidth: '100%', padding: '8px 10px', borderRadius: 999, background: '#fff', border: `1px solid ${palette.line}` }}>
                  <span style={{ maxWidth: 170, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: palette.text, fontSize: 11, fontWeight: 800 }}>{file.name}</span>
                  <button type="button" onClick={() => removeAttachment(index)} style={{ border: 0, background: 'transparent', color: palette.red, cursor: 'pointer', padding: 0 }}><FaTimes size={10} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="support-submit-btn" type="submit" disabled={submitting} style={{ width: '100%', minHeight: 52, marginTop: 18, border: 0, borderRadius: 18, background: submitting ? 'rgba(20,17,43,0.18)' : 'linear-gradient(135deg, #ffd66b 0%, #c9901a 48%, #a66b05 100%)', color: '#211604', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: FONTS.head, fontSize: 13, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: submitting ? 'none' : '0 18px 34px rgba(183,122,10,0.24)' }}>
          {submitting ? 'Submitting...' : <><FaPaperPlane /> Send Support Ticket</>}
        </button>
      </form>

      <style>{`
        .support-redesign select option { background: #fff; color: #15132a; }
        @media (max-width: 720px) {
          .support-redesign { padding-bottom: 60px; }
        }
      `}</style>
    </section>
  );
};

export default ContactUs;
