/* eslint-disable @next/next/no-img-element */
import { brandBusiness } from '@/data/brandKit';
import { CurrentDate } from '@/components/brand-kit/CurrentDate';

const mark = '/assets/brand/mark.svg';
const reverse = '/assets/brand/lockup-reverse.svg';
const lockup = '/assets/brand/lockup-horizontal.svg';
const qr = '/assets/brand/website-qr.svg';

function ContactBlock() {
  return (
    <div className="op-contact">
      <span>{brandBusiness.email}</span>
      <span>{brandBusiness.phone}</span>
      <span>tagrider.com</span>
      <span>{brandBusiness.address}</span>
    </div>
  );
}

function DocumentHeader({ title, reference }) {
  return (
    <header className="op-doc-header">
      <img src={lockup} alt="TagRides" />
      <div>
        <small>{brandBusiness.company}</small>
        <h1>{title}</h1>
        <span>{reference}</span>
      </div>
    </header>
  );
}

function LineItems({ type }) {
  const columns = {
    invoice: ['Description', 'Qty', 'Unit', 'Rate (NGN)', 'Amount (NGN)'],
    quotation: ['Scope / deliverable', 'Qty', 'Unit', 'Rate (NGN)', 'Amount (NGN)'],
    'purchase-order': ['SKU / description', 'Unit', 'Qty', 'Unit cost', 'Amount'],
    'delivery-note': ['Item / package', 'Ordered', 'Delivered', 'Condition', 'Received'],
    'work-order': ['Task / requirement', 'Assigned to', 'Priority', 'Due', 'Status'],
  }[type];
  return (
    <table className="op-table">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }, (_, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>&nbsp;</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function StandardDocument({ type }) {
  const labels = {
    invoice: ['Invoice', 'Invoice no. TR-INV-________'],
    quotation: ['Quotation', 'Quote no. TR-QT-________'],
    'purchase-order': ['Purchase order', 'PO no. TR-PO-________'],
    'delivery-note': ['Delivery note', 'DN no. TR-DN-________'],
    'work-order': ['Work order', 'WO no. TR-WO-________'],
  };
  const [title, reference] = labels[type];
  const supplier = type === 'purchase-order';
  const delivery = type === 'delivery-note';
  const workOrder = type === 'work-order';
  const partyLabel = supplier
    ? 'Supplier'
    : workOrder
      ? 'Assigned team / vendor'
      : delivery
        ? 'Recipient / destination'
        : 'Customer';
  const secondaryDate = delivery
    ? 'Delivery date / time'
    : workOrder
      ? 'Start / completion window'
      : type === 'quotation'
        ? 'Valid until'
        : type === 'invoice'
          ? 'Due date'
          : 'Required delivery date';

  return (
    <article className="op-sheet op-a4">
      <DocumentHeader title={title} reference={reference} />
      <section className="op-parties">
        <div>
          <small>{partyLabel}</small>
          <p>Name / company __________________________________</p>
          <p>Email __________________________________________</p>
          <p>Phone __________________________________________</p>
          <p>Address _________________________________________</p>
        </div>
        <div>
          <small>Document details</small>
          <p>
            Issue date <CurrentDate />
          </p>
          <p>{secondaryDate} __________________</p>
          <p>Prepared by __________________</p>
          <p>
            {delivery
              ? 'Order / invoice reference'
              : workOrder
                ? 'Site / route / programme'
                : 'Reference'}{' '}
            ___________________
          </p>
        </div>
      </section>
      <LineItems type={type} />
      <section className="op-summary">
        <div>
          <small>
            {workOrder
              ? 'Scope, safety and completion criteria'
              : delivery
                ? 'Shortage, damage or delivery exceptions'
                : 'Notes / terms'}
          </small>
          <p>________________________________________________________________</p>
          <p>________________________________________________________________</p>
          <p>________________________________________________________________</p>
        </div>
        {!delivery && !workOrder && (
          <div>
            <p>Subtotal __________________</p>
            <p>Tax _______________________</p>
            <p>Other _____________________</p>
            <strong>Total ______________________</strong>
          </div>
        )}
      </section>
      <section className="op-signatures">
        <p>{workOrder ? 'Issued by' : 'Authorised by'} __________________________</p>
        <p>
          {delivery
            ? 'Received by / date'
            : workOrder
              ? 'Completed / accepted by'
              : type === 'quotation'
                ? 'Accepted by / date'
                : 'Customer / supplier'}{' '}
          __________________________
        </p>
      </section>
      <footer className="op-doc-footer">
        <ContactBlock />
        <p>
          {brandBusiness.company} · {brandBusiness.website}
        </p>
      </footer>
    </article>
  );
}

function InspectionDocument({ snag = false }) {
  const title = snag ? 'Snag list' : 'Site inspection report';
  return (
    <article className="op-sheet op-a4">
      <DocumentHeader
        title={title}
        reference={`${snag ? 'SN' : 'SI'} no. TR-${snag ? 'SN' : 'SI'}-________`}
      />
      <section className="op-inspection-meta">
        <p>Location / route / project ______________________________</p>
        <p>
          Inspection date <CurrentDate />
        </p>
        <p>Prepared by __________________</p>
      </section>
      <table className="op-table op-inspection-table">
        <thead>
          <tr>
            {(snag
              ? ['Area', 'Issue / defect', 'Owner', 'Due / status']
              : ['Area', 'Observation', 'Action / owner', 'Due date']
            ).map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 8 }, (_, index) => (
            <tr key={index}>
              <td>&nbsp;</td>
              <td />
              <td />
              <td />
            </tr>
          ))}
        </tbody>
      </table>
      <section className="op-signatures">
        <p>Prepared by __________________________</p>
        <p>Acknowledged by __________________________</p>
      </section>
      <footer className="op-doc-footer">
        <ContactBlock />
        <p>Record facts, assign ownership and keep evidence with the issued copy.</p>
      </footer>
    </article>
  );
}

function ProjectHandover() {
  return (
    <article className="op-sheet op-a4">
      <DocumentHeader title="Project handover" reference="HO no. TR-HO-________" />
      <section className="op-inspection-meta">
        <p>Project / location ______________________________</p>
        <p>
          Issue date <CurrentDate />
        </p>
        <p>Completion date __________________</p>
      </section>
      <div className="op-handover-summary">
        <small>Completed scope / exclusions / outstanding items</small>
        <p />
      </div>
      <div className="op-checklist">
        {[
          'Work inspected',
          'Access / keys transferred',
          'Documents supplied',
          'Outstanding items recorded',
          'Client walkthrough completed',
        ].map((item) => (
          <p key={item}>
            <i />
            {item}
          </p>
        ))}
      </div>
      <section className="op-signatures">
        <p>Issued by / date __________________________</p>
        <p>Accepted by / date __________________________</p>
      </section>
      <footer className="op-doc-footer">
        <ContactBlock />
        <p>Acceptance confirms the recorded handover state, subject to listed outstanding items.</p>
      </footer>
    </article>
  );
}

function ComplimentSlip() {
  return (
    <article className="op-sheet op-dl op-compliment">
      <img src={lockup} alt="TagRides" />
      <ContactBlock />
      <h1>With compliments</h1>
      <div className="op-note-line" />
      <small>{brandBusiness.tagline}</small>
    </article>
  );
}

function Envelope() {
  return (
    <article className="op-sheet op-envelope">
      <img src={lockup} alt="TagRides" />
      <ContactBlock />
      <div className="op-envelope-recipient">
        Recipient name
        <br />
        Address line
        <br />
        City / postcode
      </div>
    </article>
  );
}

function SocialMediaKit() {
  return (
    <article className="op-application-board op-social-kit">
      <DocumentHeader title="Social media kit" reference="1080 × 1350 / 1080 × 1920 px" />
      <div className="op-social-layouts">
        <div>
          <img src={reverse} alt="TagRides" />
          <strong>Going your way.</strong>
          <span>Service announcement</span>
        </div>
        <div>
          <img src={reverse} alt="TagRides" />
          <strong>Safety starts before pickup.</strong>
          <span>Safety education</span>
        </div>
        <div>
          <img src={mark} alt="" />
          <strong>Route-share, explained.</strong>
          <span>Product education</span>
        </div>
      </div>
      <p>
        Use verified product facts, real locations and one clear action per frame. Never publish
        invented traction, safety or pricing claims.
      </p>
    </article>
  );
}

function SiteBoard() {
  return (
    <article className="op-application-board op-site-board">
      <img src={reverse} alt="TagRides" />
      <small>ACTIVATION / OPERATIONS LOCATION</small>
      <h1>LOCATION / PROGRAMME __________________</h1>
      <p>Verified pickup guidance · Driver onboarding · Field support</p>
      <div>
        <img src={qr} alt="QR code linking to tagrider.com" />
        <span>Scan to visit tagrider.com</span>
      </div>
      <footer>
        {brandBusiness.phone} · {brandBusiness.email}
      </footer>
    </article>
  );
}

function VehicleLivery() {
  return (
    <article className="op-application-board op-livery-board">
      <DocumentHeader title="Vehicle livery" reference="Measured installer template required" />
      <svg viewBox="0 0 900 360" role="img" aria-label="TagRides vehicle livery production concept">
        <path
          d="M124 238h645l-34-101-166-57H322L210 136Z"
          fill="#171717"
          stroke="#555"
          strokeWidth="4"
        />
        <path d="m237 137 99-42h215l133 42Z" fill="#88b8c1" opacity=".55" />
        <path d="M124 238h645v53H124Z" fill="#008080" />
        <path d="M583 238h186v53H583Z" fill="#F59E0B" />
        <circle cx="270" cy="288" r="49" fill="#090909" stroke="#777" strokeWidth="8" />
        <circle cx="662" cy="288" r="49" fill="#090909" stroke="#777" strokeWidth="8" />
        <image href={reverse} x="370" y="162" width="215" height="72" />
      </svg>
      <p>
        Installer must survey every vehicle, preserve windows, lights, handles and statutory
        markings, then return final cut paths for approval.
      </p>
    </article>
  );
}

function BrandStamp() {
  return (
    <article className="op-stamp-sheet">
      <div className="op-stamp">
        <img src={mark} alt="" />
        <strong>TAG-ALONG LTD</strong>
        <span>INTERNAL APPROVAL</span>
      </div>
      <h1>38 mm non-statutory brand stamp</h1>
      <p>
        Do not treat this artwork as a statutory company seal. Add registration wording only after
        legal verification.
      </p>
    </article>
  );
}

function Letterhead() {
  return (
    <article className="op-sheet op-a4 op-letterhead">
      <DocumentHeader title="" reference="Formal correspondence" />
      <div className="op-letter-meta">
        <p>
          Date <CurrentDate />
        </p>
        <p>To ______________________</p>
        <p>Subject ___________________________________________________________</p>
      </div>
      <div className="op-letter-body">
        <p>Dear ____________________,</p>
        <p>Begin the approved correspondence here.</p>
        <p>____________________________________________________________________________</p>
        <p>____________________________________________________________________________</p>
        <p>____________________________________________________________________________</p>
        <p>____________________________________________________________________________</p>
        <p>Yours sincerely,</p>
        <strong>{brandBusiness.founder}</strong>
        <span>
          {brandBusiness.role} · {brandBusiness.company}
        </span>
      </div>
      <footer className="op-letter-footer">
        <ContactBlock />
      </footer>
    </article>
  );
}

function Receipt() {
  return (
    <article className="op-sheet op-a5 op-receipt">
      <DocumentHeader title="Receipt" reference="Receipt no. TR-RC-________" />
      <div className="op-receipt-total">
        <small>Amount received</small>
        <strong>₦ ____________________</strong>
      </div>
      <div className="op-receipt-lines">
        <p>Received from __________________________________________</p>
        <p>For ____________________________________________________</p>
        <p>Payment reference ______________________________________</p>
        <p>Payment method _________________________________________</p>
        <p>
          Date <CurrentDate /> · Time __________________
        </p>
      </div>
      <section className="op-signatures">
        <p>Issued by __________________</p>
        <p>Authorised signature __________________</p>
      </section>
      <footer className="op-doc-footer">
        <ContactBlock />
      </footer>
    </article>
  );
}

function BusinessCard() {
  return (
    <div className="op-card-sheet">
      <article className="op-business-card op-card-front">
        <img src={reverse} alt="TagRides" />
        <strong>{brandBusiness.tagline}</strong>
        <span>{brandBusiness.company}</span>
      </article>
      <article className="op-business-card op-card-back">
        <div>
          <h1>{brandBusiness.founder}</h1>
          <p>{brandBusiness.role}</p>
        </div>
        <div className="op-card-contact">
          <span>{brandBusiness.phone}</span>
          <span>{brandBusiness.operationsEmail}</span>
          <span>tagrider.com</span>
        </div>
        <img src={qr} alt="QR code linking to tagrider.com" />
        <small>Scan to visit TagRides</small>
      </article>
    </div>
  );
}

function StaffId() {
  return (
    <div className="op-card-sheet">
      <article className="op-id-card op-id-front">
        <img src={reverse} alt="TagRides" />
        <div className="op-id-photo">PHOTO</div>
        <h1>STAFF NAME</h1>
        <p>Role / department</p>
        <span>Staff ID: TR-________</span>
        <small>Valid until: ____________</small>
      </article>
      <article className="op-id-card op-id-back">
        <img src={mark} alt="" />
        <p>
          This card identifies a TAG-ALONG LTD team member. Confirm current status through
          authorised company channels.
        </p>
        <div>
          <span>{brandBusiness.phone}</span>
          <span>{brandBusiness.email}</span>
          <span>tagrider.com</span>
        </div>
        <img className="op-id-qr" src={qr} alt="QR code linking to tagrider.com" />
        <small>Website QR · not identity verification</small>
      </article>
    </div>
  );
}

function EmailSignature() {
  return (
    <article className="op-email-signature">
      <div>
        <img src={mark} alt="TagRides" />
      </div>
      <section>
        <h1>{brandBusiness.founder}</h1>
        <p>
          {brandBusiness.role} · {brandBusiness.company}
        </p>
        <span>
          {brandBusiness.phone} · {brandBusiness.operationsEmail}
        </span>
        <a href={brandBusiness.website}>tagrider.com</a>
        <small>{brandBusiness.tagline}</small>
      </section>
    </article>
  );
}

export function OperationalTemplate({ type }) {
  if (type === 'business-card') return <BusinessCard />;
  if (type === 'staff-id') return <StaffId />;
  if (type === 'letterhead') return <Letterhead />;
  if (type === 'receipt') return <Receipt />;
  if (type === 'email-signature') return <EmailSignature />;
  if (type === 'site-inspection') return <InspectionDocument />;
  if (type === 'snag-list') return <InspectionDocument snag />;
  if (type === 'project-handover') return <ProjectHandover />;
  if (type === 'compliment-slip') return <ComplimentSlip />;
  if (type === 'envelope') return <Envelope />;
  if (type === 'social-media-kit') return <SocialMediaKit />;
  if (type === 'site-board') return <SiteBoard />;
  if (type === 'vehicle-livery') return <VehicleLivery />;
  if (type === 'stamp') return <BrandStamp />;
  return <StandardDocument type={type} />;
}
