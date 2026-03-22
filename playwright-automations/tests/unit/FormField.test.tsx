import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from '../../src/components/widgets/FormField';

describe('FormField', () => {
  it('renders the label text', () => {
    render(<FormField label="First Name"><input /></FormField>);
    expect(screen.getByText('First Name')).toBeInTheDocument();
  });

  it('renders children inside the field', () => {
    render(
      <FormField label="Email">
        <input data-testid="email-input" />
      </FormField>
    );
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(<FormField label="Name" required><input /></FormField>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show asterisk when required is omitted', () => {
    render(<FormField label="Name"><input /></FormField>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('renders error message when error prop is provided', () => {
    render(
      <FormField label="Name" error="Name is required" errorTestId="error-name">
        <input />
      </FormField>
    );
    expect(screen.getByTestId('error-name')).toHaveTextContent('Name is required');
  });

  it('does not render error element when error is undefined', () => {
    render(
      <FormField label="Name" errorTestId="error-name">
        <input />
      </FormField>
    );
    expect(screen.queryByTestId('error-name')).not.toBeInTheDocument();
  });

  it('error message has red styling', () => {
    render(
      <FormField label="Name" error="Required" errorTestId="error-name">
        <input />
      </FormField>
    );
    const errorEl = screen.getByTestId('error-name');
    expect(errorEl.className).toContain('text-red-500');
  });
});
