import { useState, useEffect } from 'react';
import { useToc, TocItem } from '../context/TocContext';
import { PageHeader, Tabs } from './docs';

interface ComponentShellProps {
  title: string;
  description: string;
  /** Extra breadcrumb after "Components", e.g. "Button" on variant pages. */
  parent?: string;
  tabs?: string[];
  defaultTab?: string;
  tocItems?: TocItem[];
  children: React.ReactNode | ((activeTab: string) => React.ReactNode);
}

export function ComponentShell({
  title,
  description,
  parent,
  tabs = ['Examples', 'Code', 'Usage'],
  defaultTab,
  tocItems = [],
  children,
}: ComponentShellProps) {
  const { setItems } = useToc();
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]);

  useEffect(() => {
    setItems(tocItems);
    return () => setItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setItems]);

  return (
    <div>
      <PageHeader crumbs={parent ? ['Components', parent] : ['Components']} title={title} lede={description} />
      {tabs.length > 1 && <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} label={`${title} sections`} />}
      <div>{typeof children === 'function' ? children(activeTab) : children}</div>
    </div>
  );
}
