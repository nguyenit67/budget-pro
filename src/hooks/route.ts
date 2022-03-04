import { matchPath, useLocation } from 'react-router-dom';

export function useMatchPatterns(patterns: string[]) {
  const { pathname } = useLocation();

  for (const pattern of patterns) {
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}
