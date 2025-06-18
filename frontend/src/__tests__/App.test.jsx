import { render } from '@testing-library/react';
import App from '../App';

test('renders main app without crashing', () => {
  render(<App />);
});
