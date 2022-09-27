import PropTypes from 'prop-types';
import React from 'react';

import getMatchBounds  from './getMatchBoundsUtil';

const propTypes = {
  children: PropTypes.string.isRequired,
  highlightClassName: PropTypes.string,
  search: PropTypes.string.isRequired,
};

const defaultProps = {
  highlightClassName: 'rbt-highlight-text',
};

const Highlighter = ({
  children,
  highlightClassName,
  search,
}) => {
  if (!search || !children) {
    return <>{children}</>;
  }

  let matchCount = 0;
  let remaining = children;

  const highlighterChildren = [];

  while (remaining) {
    const bounds = getMatchBounds(remaining, search);

    // No match anywhere in the remaining string, stop.
    if (!bounds) {
      highlighterChildren.push(remaining);
      break;
    }

    // Capture the string that leads up to a match.
    const nonMatch = remaining.slice(0, bounds.start);
    if (nonMatch) {
      highlighterChildren.push(nonMatch);
    }

    // Capture the matching string.
    const match = remaining.slice(bounds.start, bounds.end);
    highlighterChildren.push(
      <mark className={highlightClassName} key={matchCount}>
        {match}
      </mark>
    );
    matchCount += 1;

    // And if there's anything left over, continue the loop.
    remaining = remaining.slice(bounds.end);
  }
console.log('highlighterChildren ',highlighterChildren)
  return <>{highlighterChildren}</>;
};

Highlighter.propTypes = propTypes;
Highlighter.defaultProps = defaultProps;

export default Highlighter;