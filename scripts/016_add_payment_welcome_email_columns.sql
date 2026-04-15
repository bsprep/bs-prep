-- Track welcome email delivery for paid course enrollments
ALTER TABLE payment_orders
  ADD COLUMN IF NOT EXISTS welcome_email_sent_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS welcome_email_error TEXT;