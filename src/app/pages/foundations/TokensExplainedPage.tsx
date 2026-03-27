import { FoundationShell, ComingSoonBody } from '../../components/FoundationShell';

export function TokensExplainedPage() {
  return (
    <FoundationShell tag="Foundations / Tokens" title="Design tokens explained" description="Learn how to work with LayerProof design tokens.">
      <ComingSoonBody items={['Introduction', 'Getting started', 'Examples', 'Reference']} />
    </FoundationShell>
  );
}
