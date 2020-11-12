import classNames from 'classnames';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useUncontrolled } from 'uncontrollable';
import { useBootstrapPrefix } from './ThemeProvider';
import createWithBsPrefix from './createWithBsPrefix';
import AccordionToggle from './AccordionToggle';
import AccordionCollapse from './AccordionCollapse';
import AccordionContext from './AccordionContext';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';

const AccordionItem = createWithBsPrefix('accordion-item');
const AccordionHeader = createWithBsPrefix('accordion-header', {
  Component: 'h2',
});
const AccordionBody = createWithBsPrefix('accordion-body');

export interface AccordionProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    BsPrefixPropsWithChildren {
  activeKey?: string;
  defaultActiveKey?: string;
  onSelect?: SelectCallback;
  flush?: boolean;
}

type Accordion = BsPrefixRefForwardingComponent<'div', AccordionProps> & {
  Toggle: typeof AccordionToggle;
  Collapse: typeof AccordionCollapse;
  Item: typeof AccordionItem;
  Header: typeof AccordionHeader;
  Body: typeof AccordionBody;
};

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /** @default 'accordion' */
  bsPrefix: PropTypes.string,

  /** The current active key that corresponds to the currently expanded card */
  activeKey: PropTypes.string,

  /** The default active key that is expanded on start */
  defaultActiveKey: PropTypes.string,

  /**
   * Renders accordion edge-to-edge with its parent container
   */
  flush: PropTypes.bool,
};

const Accordion = (React.forwardRef((props: AccordionProps, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    activeKey,
    bsPrefix,
    children,
    className,
    onSelect,
    flush,
    ...controlledProps
  } = useUncontrolled(props, {
    activeKey: 'onSelect',
  });

  const prefix = useBootstrapPrefix(bsPrefix, 'accordion');
  const contextValue = useMemo(
    () => ({
      activeEventKey: activeKey || null,
      onSelect: onSelect || null,
    }),
    [activeKey, onSelect],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <Component
        ref={ref}
        {...controlledProps}
        className={classNames(className, prefix, flush && `${prefix}-flush`)}
      >
        {children}
      </Component>
    </AccordionContext.Provider>
  );
}) as unknown) as Accordion;

Accordion.displayName = 'Accordion';
Accordion.propTypes = propTypes;
Accordion.Toggle = AccordionToggle;
Accordion.Collapse = AccordionCollapse;
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;

export default Accordion;
