import React from 'react';
import { SelectCallback } from './helpers';

export interface AccordionContextValue {
  activeEventKey: string | null;
  onSelect: SelectCallback | null;
}

const context = React.createContext<AccordionContextValue>({
  activeEventKey: null,
  onSelect: null,
});
context.displayName = 'AccordionContext';

export default context;
