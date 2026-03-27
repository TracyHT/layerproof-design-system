import { FoundationShell, ComingSoonBody } from '../../components/FoundationShell';

export function TokensDesignPage() {
  return (
    <FoundationShell tag="Foundations / Tokens" title="Use tokens in design
Migrate to tokens" description="Learn how to work with LayerProof design tokens.">
      <ComingSoonBody items={['Introduction', 'Getting started', 'Examples', 'Reference']} />
    </FoundationShell>
  );
}
