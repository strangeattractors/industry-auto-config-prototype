/* ─────────────────────────────────────────────────────────────
 * Shared React components — iPhone chrome + form primitives.
 * Loaded via: <script type="text/babel" src="shared/components.js">
 * Exposes: window.UI = { PhoneFrame, StatusBar, NavBar, ... }
 * ───────────────────────────────────────────────────────────── */

(function () {
  const { useState } = React;

  /* ── iPhone chrome ──────────────────────────────────────── */

  function StatusBar() {
    return (
      <div className="status-bar">
        <span className="status-time">9:41</span>
        <div className="dynamic-island" />
        <div className="status-icons">
          {/* signal */}
          <svg viewBox="0 0 18 12" fill="currentColor">
            <rect x="0"  y="8" width="3" height="4"  rx="0.5" />
            <rect x="5"  y="5" width="3" height="7"  rx="0.5" />
            <rect x="10" y="2" width="3" height="10" rx="0.5" />
            <rect x="15" y="0" width="3" height="12" rx="0.5" />
          </svg>
          {/* wifi */}
          <svg viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 3a8 8 0 0 1 5.66 2.34l-1.42 1.42A6 6 0 0 0 8 5a6 6 0 0 0-4.24 1.76L2.34 5.34A8 8 0 0 1 8 3z" />
            <path d="M8 7a4 4 0 0 1 2.83 1.17l-1.42 1.42A2 2 0 0 0 8 9a2 2 0 0 0-1.41.59L5.17 8.17A4 4 0 0 1 8 7z" />
            <circle cx="8" cy="11" r="1" />
          </svg>
          {/* battery */}
          <svg viewBox="0 0 27 12" fill="currentColor">
            <rect x="0" y="0.5" width="22" height="11" rx="2.5"
                  stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
            <rect x="1.5" y="2" width="17" height="8" rx="1.5" />
            <rect x="23.5" y="4" width="2.5" height="4" rx="1" opacity="0.4"/>
          </svg>
        </div>
      </div>
    );
  }

  function NavBar({ title, onBack, rightAction, rightLabel }) {
    return (
      <div className="nav-bar">
        {onBack && (
          <button className="nav-back" onClick={onBack}>
            <svg width="10" height="18" viewBox="0 0 10 18" fill="none">
              <path d="M9 1L1 9L9 17" stroke="#FF8370" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back</span>
          </button>
        )}
        <span className="nav-title">{title}</span>
        {rightAction && (
          <button className="nav-action" onClick={rightAction}>{rightLabel || 'Done'}</button>
        )}
      </div>
    );
  }

  function PhoneFrame({ title, onBack, rightAction, rightLabel, children }) {
    return (
      <div className="phone-frame">
        <StatusBar />
        <NavBar title={title} onBack={onBack} rightAction={rightAction} rightLabel={rightLabel} />
        <div className="scroll-content">
          <div className="content-padding">{children}</div>
        </div>
        <div className="home-indicator" />
      </div>
    );
  }

  /* ── Form primitives ────────────────────────────────────── */

  function Badge({ type }) {
    if (type === 'preset') return <span className="badge badge-preset">Pre-filled</span>;
    if (type === 'draft')  return <span className="badge badge-draft">Example — edit to match</span>;
    return null;
  }

  function FieldRow({ label, value, placeholder }) {
    const isPlaceholder = !value && placeholder;
    return (
      <div className="field-row">
        <div className="field-label">{label}</div>
        <div className={`field-value${isPlaceholder ? ' placeholder' : ''}`}>
          {value || placeholder}
        </div>
      </div>
    );
  }

  function PickerRow({ label, value, icon, onClick }) {
    return (
      <button className="field-row-nav" onClick={onClick} style={{ minHeight: 'var(--cell-h)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--tertiary-text)' }}>{label}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            {icon && <span style={{ fontSize: 16 }}>{icon}</span>}
            <span style={{ fontSize: 17, color: 'var(--primary-text)' }}>{value}</span>
          </div>
        </div>
        <span className="chevron">›</span>
      </button>
    );
  }

  function NavRow({ label, onClick }) {
    return (
      <button className="field-row-nav" onClick={onClick}>
        <span className="field-row-nav-label">{label}</span>
        <span className="chevron">›</span>
      </button>
    );
  }

  function InfoCard({ icon, title, description }) {
    return (
      <div className="info-card">
        <span className="info-card-icon">{icon || '🛡️'}</span>
        <div className="info-card-text">
          <div className="info-card-title">{title}</div>
          <div className="info-card-desc">{description}</div>
        </div>
        <span style={{ color: 'var(--tertiary-text)', fontSize: 18 }}>ⓘ</span>
      </div>
    );
  }

  function PrefillBanner({ industryName }) {
    return (
      <div className="prefill-banner">
        <span className="prefill-banner-icon">✨</span>
        <div className="prefill-banner-text">
          Fields below were <strong>pre-filled</strong> based on your industry
          {industryName ? <> (<strong>{industryName}</strong>)</> : null}.
          Review and edit to match your business.
        </div>
      </div>
    );
  }

  /* ── Modal / alert (used in confirm screen) ─────────────── */

  function AlertModal({ title, message, cancelLabel, confirmLabel, onCancel, onConfirm, destructive }) {
    return (
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 44, zIndex: 100, padding: 20,
      }}>
        <div style={{
          width: '100%', maxWidth: 270, background: 'rgba(250,250,250,0.95)',
          backdropFilter: 'blur(20px)', borderRadius: 14, overflow: 'hidden',
        }}>
          <div style={{ padding: '16px 16px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--primary-text)', marginBottom: 4 }}>
              {title}
            </div>
            <div style={{ fontSize: 13, color: 'var(--primary-text)', lineHeight: 1.35 }}>
              {message}
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '0.5px solid rgba(60,60,67,0.3)' }}>
            <button onClick={onCancel} style={{
              flex: 1, padding: 11, background: 'none', border: 'none',
              borderRight: '0.5px solid rgba(60,60,67,0.3)',
              fontSize: 17, color: 'var(--accent)', fontFamily: 'inherit', cursor: 'pointer',
            }}>{cancelLabel || 'Cancel'}</button>
            <button onClick={onConfirm} style={{
              flex: 1, padding: 11, background: 'none', border: 'none',
              fontSize: 17, fontWeight: 600,
              color: destructive ? 'var(--error)' : 'var(--accent)',
              fontFamily: 'inherit', cursor: 'pointer',
            }}>{confirmLabel || 'OK'}</button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Screen nav (top-of-page links between prototype screens) ── */

  function ScreenNav({ current }) {
    const screens = [
      { href: 'index.html',                     label: 'Overview' },
      { href: '01-industry-picker.html',        label: '1. Picker' },
      { href: '02-prefill-animation.html',      label: '2. Pre-fill' },
      { href: '03-company-info.html',           label: '3. Review' },
      { href: '04-change-industry-confirm.html',label: '4. Confirm' },
      { href: '05-edit-bio.html',               label: '5. Edit bio' },
    ];
    return (
      <div style={{
        display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center',
        marginBottom: 20, maxWidth: 720,
      }}>
        {screens.map(s => (
          <a key={s.href} href={s.href} style={{
            padding: '6px 12px',
            borderRadius: 'var(--r-xxl)',
            border: '1.5px solid ' + (current === s.href ? 'var(--accent)' : 'var(--border)'),
            background: current === s.href ? 'var(--accent)' : 'var(--bg)',
            color: current === s.href ? '#fff' : 'var(--secondary-text)',
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
            fontFamily: 'var(--font-family)',
          }}>{s.label}</a>
        ))}
      </div>
    );
  }

  /* ── Expose to window ───────────────────────────────────── */
  window.UI = {
    PhoneFrame, StatusBar, NavBar,
    Badge, FieldRow, PickerRow, NavRow, InfoCard, PrefillBanner,
    AlertModal, ScreenNav,
  };
})();
