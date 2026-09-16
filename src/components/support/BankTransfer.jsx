'use client';

import { useState } from 'react';
import { Check, Copy, Mail, Landmark } from 'lucide-react';
import { support, supportEmail } from '@/data/support';

export function BankTransfer() {
  const [copyStatus, setCopyStatus] = useState('');

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(support.accountNumber);
      setCopyStatus('Account number copied.');
    } catch {
      setCopyStatus('Copy is unavailable here. Select and copy the account number below.');
    }
  }

  return (
    <section
      id="bank-transfer"
      aria-labelledby="transfer-heading"
      className="scroll-mt-28 rounded-3xl border border-primary/50 bg-surface p-6 sm:p-9"
    >
      <div className="flex items-center gap-3 text-accent">
        <Landmark className="size-5" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">Business bank transfer</p>
      </div>
      <h2 id="transfer-heading" className="mt-5 font-display text-2xl font-bold sm:text-3xl">
        Help move the work forward.
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
        Contribute directly to the company behind TagRides. Support goes towards our Lagos pilot
        preparation, including driver onboarding, field coordination and learning from the pilot.
      </p>

      <dl className="mt-7 space-y-5">
        <div>
          <dt className="text-xs uppercase tracking-wider text-foreground-muted">Account name</dt>
          <dd className="mt-1.5 font-semibold text-foreground">{support.accountName}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wider text-foreground-muted">Bank</dt>
          <dd className="mt-1.5 text-foreground">{support.bank}</dd>
        </div>
        <div className="rounded-2xl border border-border bg-background p-5">
          <dt className="text-xs uppercase tracking-wider text-foreground-muted">Account number</dt>
          <dd className="mt-2 select-all font-mono text-3xl font-semibold tracking-wide text-foreground sm:text-4xl">
            {support.accountNumber}
          </dd>
          <button
            type="button"
            onClick={copyAccount}
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-3 text-xs font-semibold text-foreground transition hover:border-primary hover:bg-primary/10"
          >
            {copyStatus === 'Account number copied.' ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <Copy className="size-4" aria-hidden="true" />
            )}
            Copy account number
          </button>
          <p
            role="status"
            aria-live="polite"
            className="mt-2 min-h-5 text-xs text-foreground-muted"
          >
            {copyStatus}
          </p>
        </div>
      </dl>

      <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
        Check that your bank shows{' '}
        <strong className="text-foreground">{support.accountName}</strong> as the recipient. Use{' '}
        <strong className="text-foreground">TagRides support</strong> as the transfer reference
        where possible.
      </p>
      <div className="mt-7 border-t border-border pt-6">
        <h3 className="font-semibold">After your transfer</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          Email your name, amount, transfer date and transaction reference so we can reconcile your
          contribution and follow up. Transfers are checked manually; this page does not confirm
          payment.
        </p>
        <a
          href={supportEmail(
            'TagRides support — transfer follow-up',
            'Hello TagRides,\n\nI would like to follow up on a business support transfer.\n\nName:\nAmount and currency:\nTransfer date:\nTransaction reference:\n\nPlease confirm receipt after reconciliation.\n',
          )}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary-hover"
        >
          <Mail className="size-4" aria-hidden="true" />
          Email transfer details
        </a>
        <p className="mt-3 break-all text-center text-xs text-foreground-muted">{support.email}</p>
      </div>
    </section>
  );
}
