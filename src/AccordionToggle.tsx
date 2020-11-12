import React, { useContext } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AccordionContext from './AccordionContext';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';
import { useBootstrapPrefix } from './ThemeProvider';

type EventHandler = React.EventHandler<React.SyntheticEvent>;

export interface AccordionToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BsPrefixPropsWithChildren {
  eventKey: string;
}

type AccordionToggle = BsPrefixRefForwardingComponent<
  'div',
  AccordionToggleProps
>;

const propTypes = {
  /** Set a custom element for this component */
  as: PropTypes.elementType,

  /**
   * A key that corresponds to the collapse component that gets triggered
   * when this has been clicked.
   */
  eventKey: PropTypes.string.isRequired,

  /** A callback function for when this component is clicked */
  onClick: PropTypes.func,
};

export function useAccordionToggle(
  eventKey: string,
  onClick?: EventHandler,
): EventHandler {
  const { activeEventKey, onSelect } = useContext(AccordionContext);

  return (e) => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    const eventKeyPassed = eventKey === activeEventKey ? null : eventKey;

    if (onSelect) onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

const AccordionToggle: AccordionToggle = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'button',
      bsPrefix,
      className,
      children,
      eventKey,
      onClick,
      ...props
    }: AccordionToggleProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-button');
    const accordionOnClick = useAccordionToggle(eventKey, onClick);
    const { activeEventKey } = useContext(AccordionContext);

    if (Component === 'button') {
      props.type = 'button';
    }

    return (
      <Component
        ref={ref}
        onClick={accordionOnClick}
        {...props}
        aria-expanded={eventKey === activeEventKey}
        className={classNames(
          className,
          bsPrefix,
          eventKey !== activeEventKey && 'collapsed',
        )}
      >
        {children}
      </Component>
    );
  },
);

AccordionToggle.propTypes = propTypes;

export default AccordionToggle;
