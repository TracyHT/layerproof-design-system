import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface TocItem {
  id: string;
  label: string;
  level?: 1 | 2; // 1=section, 2=subsection (indented)
}

interface TocContextType {
  items: TocItem[];
  activeId: string;
  setItems: (items: TocItem[]) => void;
  setActiveId: (id: string) => void;
}

const TocContext = createContext<TocContextType>({
  items: [],
  activeId: '',
  setItems: () => {},
  setActiveId: () => {},
});

export function TocProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  return (
    <TocContext.Provider value={{ items, activeId, setItems, setActiveId }}>
      {children}
    </TocContext.Provider>
  );
}

export const useToc = () => useContext(TocContext);
