import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CheckoutForm } from '../../src/components/payment/CheckoutForm';
import { OrderSummary } from '../../src/components/payment/OrderSummary';
import { PaymentSuccess } from '../../src/components/payment/PaymentSuccess';
import type { Course } from '../../src/data/courses';

const mockCourse: Course = {
  id: 1,
  title: 'Complete React Developer in 2024: Zero to Mastery',
  instructor: 'Andrei Neagoie',
  rating: 4.7,
  reviews: 28453,
  price: 14.99,
  originalPrice: 89.99,
  category: 'Web Development',
  level: 'All Levels',
  duration: '40.5 hours',
  students: 91245,
  thumbnail: 'https://example.com/thumb.jpg',
  description: 'A great course.',
  whatYouLearn: ['React', 'Hooks', 'Context', 'Redux', 'Testing', 'Deployment'],
  requirements: ['Basic JS', 'HTML/CSS', 'Node installed'],
};

// ── OrderSummary ────────────────────────────────────────────────────────────

describe('OrderSummary', () => {
  it('renders Order Summary heading', () => {
    render(<OrderSummary course={mockCourse} />);
    expect(screen.getByText('Order Summary')).toBeInTheDocument();
  });

  it('displays course title', () => {
    render(<OrderSummary course={mockCourse} />);
    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
  });

  it('displays instructor name', () => {
    render(<OrderSummary course={mockCourse} />);
    expect(screen.getByText(mockCourse.instructor)).toBeInTheDocument();
  });

  it('displays the discounted price as total', () => {
    render(<OrderSummary course={mockCourse} />);
    expect(screen.getByText(`$${mockCourse.price}`)).toBeInTheDocument();
  });

  it('displays the original price struck through', () => {
    render(<OrderSummary course={mockCourse} />);
    expect(screen.getByText(`$${mockCourse.originalPrice}`)).toBeInTheDocument();
  });

  it('displays calculated discount amount', () => {
    render(<OrderSummary course={mockCourse} />);
    const discount = (mockCourse.originalPrice - mockCourse.price).toFixed(2);
    expect(screen.getByText(`−$${discount}`)).toBeInTheDocument();
  });

  it('shows secure checkout text', () => {
    render(<OrderSummary course={mockCourse} />);
    expect(screen.getByText(/Secure checkout/i)).toBeInTheDocument();
  });
});

// ── CheckoutForm ────────────────────────────────────────────────────────────

describe('CheckoutForm', () => {
  const renderForm = (onSuccess = vi.fn()) =>
    render(
      <MemoryRouter>
        <CheckoutForm course={mockCourse} onSuccess={onSuccess} />
      </MemoryRouter>
    );

  it('renders all personal information fields', () => {
    renderForm();
    expect(screen.getByTestId('input-first-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-last-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
  });

  it('renders all payment fields', () => {
    renderForm();
    expect(screen.getByTestId('input-card-number')).toBeInTheDocument();
    expect(screen.getByTestId('input-expiry')).toBeInTheDocument();
    expect(screen.getByTestId('input-cvv')).toBeInTheDocument();
  });

  it('renders all billing address fields', () => {
    renderForm();
    expect(screen.getByTestId('input-address')).toBeInTheDocument();
    expect(screen.getByTestId('input-city')).toBeInTheDocument();
    expect(screen.getByTestId('input-zip')).toBeInTheDocument();
    expect(screen.getByTestId('input-country')).toBeInTheDocument();
  });

  it('submit button shows course price', () => {
    renderForm();
    expect(screen.getByTestId('submit-btn')).toHaveTextContent(`$${mockCourse.price}`);
  });

  it('shows required field errors on empty submit', async () => {
    renderForm();
    await userEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('error-first-name')).toBeInTheDocument();
      expect(screen.getByTestId('error-last-name')).toBeInTheDocument();
      expect(screen.getByTestId('error-email')).toBeInTheDocument();
      expect(screen.getByTestId('error-card-number')).toBeInTheDocument();
      expect(screen.getByTestId('error-expiry')).toBeInTheDocument();
      expect(screen.getByTestId('error-cvv')).toBeInTheDocument();
      expect(screen.getByTestId('error-address')).toBeInTheDocument();
      expect(screen.getByTestId('error-city')).toBeInTheDocument();
      expect(screen.getByTestId('error-zip')).toBeInTheDocument();
      expect(screen.getByTestId('error-country')).toBeInTheDocument();
    });
  });

  it('shows invalid email error', async () => {
    renderForm();
    await userEvent.type(screen.getByTestId('input-email'), 'not-an-email');
    await userEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() =>
      expect(screen.getByTestId('error-email')).toHaveTextContent('Invalid email address')
    );
  });

  it('shows card number format error when spaces are missing', async () => {
    renderForm();
    await userEvent.type(screen.getByTestId('input-card-number'), '1234567890123456');
    await userEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() =>
      expect(screen.getByTestId('error-card-number')).toBeInTheDocument()
    );
  });

  it('shows expiry format error for invalid pattern', async () => {
    renderForm();
    await userEvent.type(screen.getByTestId('input-expiry'), '1227');
    await userEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() =>
      expect(screen.getByTestId('error-expiry')).toHaveTextContent('Expiry must be MM/YY')
    );
  });

  it('shows CVV error for fewer than 3 digits', async () => {
    renderForm();
    await userEvent.type(screen.getByTestId('input-cvv'), '12');
    await userEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() =>
      expect(screen.getByTestId('error-cvv')).toHaveTextContent('CVV must be 3 or 4 digits')
    );
  });

  it('calls onSuccess after valid form submission', async () => {
    const onSuccess = vi.fn();
    renderForm(onSuccess);

    await userEvent.type(screen.getByTestId('input-first-name'), 'John');
    await userEvent.type(screen.getByTestId('input-last-name'), 'Doe');
    await userEvent.type(screen.getByTestId('input-email'), 'john@example.com');
    await userEvent.type(screen.getByTestId('input-card-number'), '1234 5678 9012 3456');
    await userEvent.type(screen.getByTestId('input-expiry'), '12/27');
    await userEvent.type(screen.getByTestId('input-cvv'), '123');
    await userEvent.type(screen.getByTestId('input-address'), '123 Main St');
    await userEvent.type(screen.getByTestId('input-city'), 'New York');
    await userEvent.type(screen.getByTestId('input-zip'), '10001');
    await userEvent.selectOptions(screen.getByTestId('input-country'), 'US');

    await userEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => expect(onSuccess).toHaveBeenCalledOnce());
  });
});

// ── PaymentSuccess ──────────────────────────────────────────────────────────

describe('PaymentSuccess', () => {
  const renderSuccess = () =>
    render(
      <MemoryRouter>
        <PaymentSuccess course={mockCourse} />
      </MemoryRouter>
    );

  it('renders success page with testid', () => {
    renderSuccess();
    expect(screen.getByTestId('success-page')).toBeInTheDocument();
  });

  it('shows Payment Successful heading', () => {
    renderSuccess();
    expect(screen.getByRole('heading', { name: /Payment Successful/i })).toBeInTheDocument();
  });

  it('shows enrolled course title', () => {
    renderSuccess();
    expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
  });

  it('renders Browse More Courses button', () => {
    renderSuccess();
    expect(screen.getByRole('button', { name: /Browse More Courses/i })).toBeInTheDocument();
  });
});
