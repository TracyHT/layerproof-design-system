import { Section, Sub, Panel, Grid, Card, DoDont } from './docs';

const tones = [
  {
    context: 'Success',
    tone: 'Encouraging, brief',
    chip: 'lp-chip--success',
    bg: 'var(--status-success-background)',
    border: 'var(--status-success-border)',
    fg: 'var(--status-success-foreground)',
    text: 'Your post is ready. Download it or schedule it for later.',
  },
  {
    context: 'Error',
    tone: 'Helpful, never blaming',
    chip: 'lp-chip--danger',
    bg: 'var(--status-danger-background)',
    border: 'var(--status-danger-border)',
    fg: 'var(--status-danger-foreground)',
    text: "We couldn't read that URL. Check the link is public, then try again.",
  },
  {
    context: 'Information',
    tone: 'Clear and factual',
    chip: 'lp-chip--info',
    bg: 'var(--status-info-background)',
    border: 'var(--status-info-border)',
    fg: 'var(--status-info-foreground)',
    text: 'You have 120 credits left this month. They renew on November 1.',
  },
];

export function VoiceSection() {
  return (
    <Section
      id="voice"
      title="Voice and tone"
      desc="Our voice stays the same everywhere; the tone shifts with the moment. Most of our readers are busy business owners, not designers — write for them."
    >
      <Panel>
        <Grid cols={3}>
          <Card title="Clear" text="Plain words, short sentences. Explain design ideas without jargon." />
          <Card title="Confident" text="We know the craft and say so simply. No hedging, no hype." />
          <Card title="Warm" text="Supportive and human. Celebrate progress; never make anyone feel behind." />
        </Grid>
      </Panel>

      <Sub title="Tone in context">
        <div className="lp-rows lp-rows--outline">
          {tones.map((t) => (
            <div key={t.context} className="lp-row" style={{ ['--lp-row-cols' as string]: '140px minmax(0,1fr)' }}>
              <div>
                <strong>{t.context}</strong>
                <div className="lp-card__meta" style={{ marginTop: 2 }}>{t.tone}</div>
              </div>
              <div style={{ background: t.bg, border: `1px solid ${t.border}`, color: t.fg, borderRadius: 'var(--radius-lg)', padding: '10px 14px' }}>
                {t.text}
              </div>
            </div>
          ))}
        </div>
      </Sub>

      <Sub title="Writing guidelines">
        <DoDont
          dos={[
            'Use active voice and present tense',
            'Talk to the reader as "you"',
            'Keep sentences short and scannable',
            'Use contractions (we\'re, you\'ll, it\'s)',
            'Name buttons for what they do: "Create post", not "Submit"',
          ]}
          donts={[
            'Passive voice or corporate speak',
            'Design jargon without explanation',
            'Long, stacked sentences',
            'Blaming the user in errors',
            'All caps or extra punctuation!!!',
          ]}
        />
      </Sub>
    </Section>
  );
}
