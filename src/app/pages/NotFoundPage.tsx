import { Link } from 'react-router';
import { Button } from '../components/ui/button';

export function NotFoundPage() {
  return (
    <div className="lp-home" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 560 }}>
        <p className="type-h1" style={{ color: 'var(--accent-foreground-brand)' }}>404</p>
        <h1 className="type-h3" style={{ marginTop: 8 }}>This page doesn't exist</h1>
        <p className="lp-page-lede">It may have moved when the docs were reorganised. Start from the home page or browse the foundations.</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
          <Button asChild variant="default"><Link to="/">Go to home</Link></Button>
          <Button asChild variant="outline"><Link to="/foundations">Browse foundations</Link></Button>
        </div>
      </div>
    </div>
  );
}
