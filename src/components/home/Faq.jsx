import React, { useState } from "react";

const faqs = [
  { q: "Why is this one of the best online betting sites in India?", a: "A trusted betting platform offering fast transactions and secure gaming experiences for Indian players." },
  { q: "Is online betting legal in India?", a: "Betting laws vary by state. Always check your local regulations before participating." },
  { q: "How do I withdraw my winnings?", a: "Withdrawals are processed instantly using our secure banking methods. Minimum withdrawal limits apply." },
  { q: "Can I ever win in an online casino?", a: "Yes, but outcomes are chance-based. Games have a house edge. Play responsibly." },
  { q: "Is online casino a skill or luck?", a: "Most casino games are luck-based, though games like poker and blackjack involve skill elements." },
];

const Item = ({ q, a, open, onToggle, idx }) => (
  <button
    type="button"
    className={`faq-card ${open ? "is-open" : ""}`}
    onClick={onToggle}
    aria-expanded={open}
  >
    <span className="faq-index">{String(idx + 1).padStart(2, "0")}</span>
    <span className="faq-copy">
      <strong>{q}</strong>
      <span>{a}</span>
    </span>
    <span className="faq-chevron" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      </svg>
    </span>
  </button>
);

const Faq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="faq-modern-section mt-7 mb-6 px-4 md:px-0 w-full">
      <div className="faq-modern-head">
        <div>
          <span>Need Clarity?</span>
          <h2>Frequently Asked Questions</h2>
        </div>
        <strong>{faqs.length} Questions</strong>
      </div>

      <div className="faq-modern-list">
        {faqs.map((item, i) => (
          <Item
            key={item.q}
            idx={i}
            q={item.q}
            a={item.a}
            open={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Faq;
