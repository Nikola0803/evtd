import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';
import Logo from '@/components/feature/Logo';
import {
  portalPatient,
  currentTreatment,
  reviewStatus,
  pharmacyStatus,
  shipment,
  renewal,
  upcomingPayment,
  messages,
  documents,
  labs,
  treatmentInstructions,
  sideEffectReporting,
  emergencyGuidance,
} from '@/mocks/portal';
import { usePageMeta } from '@/hooks/usePageMeta';

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
  { id: 'messages', label: 'Messages', icon: 'ri-chat-3-line' },
  { id: 'documents', label: 'Documents & labs', icon: 'ri-folder-2-line' },
  { id: 'instructions', label: 'Instructions & safety', icon: 'ri-shield-cross-line' },
];

function Card({ title, icon, children }: { title: string; icon: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-background-200 bg-background-50 p-5 md:p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100 text-secondary-800">
          <i className={`${icon} text-base leading-none`} aria-hidden="true"></i>
        </span>
        <h3 className="font-heading text-[1.05rem] text-foreground-950">{title}</h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function Portal() {
  usePageMeta({
    title: 'Patient Portal | EVOLV Today',
    description:
      'Your EVOLV Today patient portal concept: treatment status, clinical review, pharmacy and shipping, renewals, messages and safety guidance.',
    canonicalPath: '/portal',
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [showPause, setShowPause] = useState(false);
  const [planPaused, setPlanPaused] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background-100">
      <header className="sticky top-0 z-40 border-b border-background-300/70 bg-background-50/95 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4" wide>
          <Logo />
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 font-label text-[0.78rem] font-semibold text-primary-700">
                {portalPatient.initials}
              </span>
              <div className="leading-tight">
                <p className="text-[0.82rem] font-medium text-foreground-950">{portalPatient.name}</p>
                <p className="text-[0.72rem] text-foreground-600">{portalPatient.memberSince}</p>
              </div>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-md border border-foreground-950/15 px-3.5 py-2 font-label text-[0.78rem] font-medium text-foreground-900 transition-colors duration-200 hover:border-primary-500"
            >
              <i className="ri-logout-box-r-line text-base leading-none" aria-hidden="true"></i>
              Sign out
            </Link>
          </div>
        </Container>
      </header>

      <main className="flex-1 py-8 md:py-10">
        <Container wide>
          <div className="rounded-2xl border border-dashed border-background-300 bg-background-50 px-5 py-4">
            <p className="flex flex-wrap items-center gap-2 text-[0.78rem] text-foreground-600">
              <i className="ri-information-line text-base leading-none text-primary-600" aria-hidden="true"></i>
              <span className="font-semibold text-foreground-800">Portal concept preview.</span>
              This is a design concept with sample statuses. Connecting a secure backend is required before real
              patient data is stored or displayed.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[15rem_1fr] lg:gap-10">
            <nav aria-label="Portal sections" className="lg:sticky lg:top-28 lg:self-start">
              <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {tabs.map((tab) => (
                  <li key={tab.id} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={activeTab === tab.id}
                      className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-md px-4 py-3 text-left font-label text-[0.82rem] font-medium transition-colors duration-200 cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-primary-500 text-background-50'
                          : 'text-foreground-700 hover:bg-background-200'
                      }`}
                    >
                      <i className={`${tab.icon} text-base leading-none`} aria-hidden="true"></i>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 hidden rounded-2xl bg-background-200 p-4 lg:block">
                <p className="text-[0.75rem] leading-relaxed text-foreground-700">
                  Medical questions are handled by licensed clinicians. Account, billing and delivery questions
                  go to EVOLV Support.
                </p>
              </div>
            </nav>

            <div>
              {activeTab === 'overview' ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Card title="Current treatment" icon="ri-capsule-line">
                    <p className="font-heading text-base text-foreground-950">{currentTreatment.name}</p>
                    <p className="mt-1 text-[0.8rem] text-foreground-600">
                      {currentTreatment.format} · {currentTreatment.startedOn}
                    </p>
                    <p className="mt-3 text-[0.86rem] leading-relaxed text-foreground-700">
                      {currentTreatment.directions}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary-100 px-3 py-1 font-label text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-primary-700">
                      <i className="ri-check-line text-xs leading-none" aria-hidden="true"></i>
                      {currentTreatment.status}
                    </span>
                  </Card>

                  <Card title="Clinical review status" icon="ri-stethoscope-line">
                    <p className="font-heading text-base text-foreground-950">{reviewStatus.stage}</p>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground-700">{reviewStatus.copy}</p>
                    <ol className="mt-4 space-y-2.5">
                      {reviewStatus.steps.map((item) => (
                        <li key={item.label} className="flex items-center gap-2.5 text-[0.82rem]">
                          <i
                            className={`${
                              item.state === 'done' ? 'ri-checkbox-circle-fill text-primary-600' : 'ri-time-line text-foreground-500'
                            } text-base leading-none`}
                            aria-hidden="true"
                          ></i>
                          <span className={item.state === 'done' ? 'text-foreground-900' : 'text-foreground-600'}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <p className="mt-4 text-[0.75rem] text-foreground-500">{reviewStatus.date}</p>
                  </Card>

                  <Card title="Pharmacy status" icon="ri-building-2-line">
                    <p className="font-heading text-base text-foreground-950">{pharmacyStatus.stage}</p>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground-700">{pharmacyStatus.copy}</p>
                    <p className="mt-3 text-[0.8rem] text-foreground-600">{pharmacyStatus.pharmacy}</p>
                    <p className="mt-1 text-[0.75rem] text-foreground-500">{pharmacyStatus.lastUpdate}</p>
                  </Card>

                  <Card title="Shipment tracking" icon="ri-truck-line">
                    <p className="font-heading text-base text-foreground-950">{shipment.status}</p>
                    <p className="mt-1 text-[0.8rem] text-foreground-600">
                      {shipment.carrier} · {shipment.tracking}
                    </p>
                    <p className="mt-1 text-[0.8rem] text-foreground-600">{shipment.eta}</p>
                    <ol className="mt-5 space-y-3">
                      {shipment.events.map((event) => (
                        <li key={event.label} className="flex items-center gap-3">
                          <span
                            className={`h-2.5 w-2.5 shrink-0 rounded-full ${event.done ? 'bg-primary-500' : 'bg-background-400'}`}
                            aria-hidden="true"
                          ></span>
                          <span className="flex-1 text-[0.82rem] text-foreground-800">{event.label}</span>
                          <span className="font-label text-[0.72rem] text-foreground-500">{event.date}</span>
                        </li>
                      ))}
                    </ol>
                  </Card>

                  <Card title="Next renewal" icon="ri-refresh-line">
                    <p className="font-heading text-base text-foreground-950">{renewal.nextReview}</p>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground-700">{renewal.copy}</p>
                  </Card>

                  <Card title="Upcoming payment" icon="ri-bank-card-line">
                    <p className="font-heading text-base text-foreground-950">
                      {upcomingPayment.amount} · {upcomingPayment.date}
                    </p>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-foreground-700">{upcomingPayment.copy}</p>
                  </Card>

                  <div className="md:col-span-2">
                    <Card title="Plan controls" icon="ri-settings-3-line">
                      <p className="text-[0.86rem] leading-relaxed text-foreground-700">
                        You can pause or cancel your plan from here, subject to the terms shown at checkout.
                        Prescriptions already dispensed cannot be returned.
                      </p>
                      {planPaused ? (
                        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-md bg-secondary-50 px-4 py-3">
                          <p className="flex-1 text-[0.82rem] text-secondary-900">
                            Your plan is paused. Your clinician will not issue a new renewal while it is paused.
                          </p>
                          <button
                            type="button"
                            onClick={() => setPlanPaused(false)}
                            className="whitespace-nowrap rounded-md border border-secondary-300 px-4 py-2 font-label text-[0.78rem] font-medium text-secondary-900 transition-colors duration-200 hover:bg-secondary-100 cursor-pointer"
                          >
                            Resume plan
                          </button>
                        </div>
                      ) : showPause ? (
                        <div className="mt-4 flex flex-wrap items-center gap-4 rounded-md bg-background-100 px-4 py-3">
                          <p className="flex-1 text-[0.82rem] text-foreground-700">
                            Pause your plan? You can resume at any time.
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setPlanPaused(true);
                              setShowPause(false);
                            }}
                            className="whitespace-nowrap rounded-md bg-primary-500 px-4 py-2 font-label text-[0.78rem] font-medium text-background-50 transition-colors duration-200 hover:bg-primary-600 cursor-pointer"
                          >
                            Confirm pause
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowPause(false)}
                            className="whitespace-nowrap rounded-md border border-foreground-950/15 px-4 py-2 font-label text-[0.78rem] font-medium text-foreground-900 transition-colors duration-200 cursor-pointer"
                          >
                            Keep my plan
                          </button>
                        </div>
                      ) : (
                        <div className="mt-4 flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => setShowPause(true)}
                            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-4 py-2.5 font-label text-[0.8rem] font-medium text-foreground-900 transition-colors duration-200 hover:border-primary-500 cursor-pointer"
                          >
                            <i className="ri-pause-circle-line text-base leading-none" aria-hidden="true"></i>
                            Pause plan
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-4 py-2.5 font-label text-[0.8rem] font-medium text-foreground-900 transition-colors duration-200 hover:border-accent-600 cursor-pointer"
                          >
                            <i className="ri-close-circle-line text-base leading-none" aria-hidden="true"></i>
                            Cancel plan
                          </button>
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
              ) : null}

              {activeTab === 'messages' ? (
                <div className="space-y-5">
                  <div className="flex items-start gap-3 rounded-2xl bg-secondary-50 px-5 py-4">
                    <i className="ri-alert-line mt-0.5 text-base leading-none text-secondary-800" aria-hidden="true"></i>
                    <p className="text-[0.82rem] leading-relaxed text-secondary-900">
                      Never use these messages for emergencies. For urgent symptoms, call 911 or seek in-person
                      care. Sensitive health details are never included in email or SMS previews.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div className="rounded-2xl border border-background-200 bg-background-50 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-heading text-[1.05rem] text-foreground-950">Message Clinical Team</h3>
                        <span className="rounded-full bg-primary-100 px-3 py-1 font-label text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-primary-700">
                          Medical
                        </span>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {messages
                          .filter((message) => message.role === 'clinical')
                          .map((message) => (
                            <li key={message.id} className="rounded-md border border-background-200 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-[0.82rem] font-medium text-foreground-950">{message.subject}</p>
                                <span className="font-label text-[0.7rem] text-foreground-500">{message.date}</span>
                              </div>
                              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-foreground-600">
                                {message.preview}
                              </p>
                            </li>
                          ))}
                      </ul>
                      <button
                        type="button"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-4 py-2.5 font-label text-[0.82rem] font-medium text-background-50 transition-colors duration-200 hover:bg-primary-600 cursor-pointer"
                      >
                        <i className="ri-edit-line text-base leading-none" aria-hidden="true"></i>
                        Write a secure message
                      </button>
                    </div>

                    <div className="rounded-2xl border border-background-200 bg-background-50 p-5 md:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-heading text-[1.05rem] text-foreground-950">Contact EVOLV Support</h3>
                        <span className="rounded-full bg-secondary-100 px-3 py-1 font-label text-[0.66rem] font-semibold uppercase tracking-[0.1em] text-secondary-900">
                          Non-medical
                        </span>
                      </div>
                      <ul className="mt-4 space-y-3">
                        {messages
                          .filter((message) => message.role === 'support')
                          .map((message) => (
                            <li key={message.id} className="rounded-md border border-background-200 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <p className="text-[0.82rem] font-medium text-foreground-950">{message.subject}</p>
                                <span className="font-label text-[0.7rem] text-foreground-500">{message.date}</span>
                              </div>
                              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-foreground-600">
                                {message.preview}
                              </p>
                            </li>
                          ))}
                      </ul>
                      <Link
                        to="/faq"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-4 py-2.5 font-label text-[0.82rem] font-medium text-foreground-900 transition-colors duration-200 hover:border-primary-500"
                      >
                        <i className="ri-customer-service-2-line text-base leading-none" aria-hidden="true"></i>
                        Contact support
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeTab === 'documents' ? (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <Card title="Documents" icon="ri-file-text-line">
                    <ul className="divide-y divide-background-200">
                      {documents.map((doc) => (
                        <li key={doc.id} className="flex items-center justify-between gap-4 py-3">
                          <div>
                            <p className="text-[0.86rem] font-medium text-foreground-950">{doc.name}</p>
                            <p className="mt-0.5 text-[0.74rem] text-foreground-600">
                              {doc.kind} · {doc.date} · {doc.size}
                            </p>
                          </div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background-200 text-foreground-700">
                            <i className="ri-download-2-line text-base leading-none" aria-hidden="true"></i>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card title="Labs (where applicable)" icon="ri-test-tube-line">
                    <ul className="divide-y divide-background-200">
                      {labs.map((lab) => (
                        <li key={lab.id} className="flex items-center justify-between gap-4 py-3">
                          <div>
                            <p className="text-[0.86rem] font-medium text-foreground-950">{lab.name}</p>
                            <p className="mt-0.5 text-[0.74rem] text-foreground-600">{lab.date}</p>
                          </div>
                          <span className="rounded-full bg-background-200 px-3 py-1 font-label text-[0.66rem] uppercase tracking-[0.08em] text-foreground-700">
                            {lab.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-[0.76rem] leading-relaxed text-foreground-600">
                      If your clinician requests laboratory testing, results and instructions appear here.
                    </p>
                  </Card>
                </div>
              ) : null}

              {activeTab === 'instructions' ? (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                  <Card title="Treatment instructions" icon="ri-list-check-2">
                    <ul className="space-y-3">
                      {treatmentInstructions.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-foreground-800">
                          <i className="ri-check-line mt-1 text-base leading-none text-primary-600" aria-hidden="true"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card title="Side-effect reporting" icon="ri-error-warning-line">
                    <ul className="space-y-3">
                      {sideEffectReporting.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-foreground-800">
                          <i className="ri-arrow-right-s-line mt-1 text-base leading-none text-primary-600" aria-hidden="true"></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-4 py-2.5 font-label text-[0.82rem] font-medium text-foreground-900 transition-colors duration-200 hover:border-primary-500 cursor-pointer"
                    >
                      Report a side effect
                    </button>
                  </Card>

                  <div className="rounded-2xl border border-accent-300 bg-accent-50 p-5 md:p-6">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-200 text-accent-950">
                        <i className="ri-alarm-warning-line text-base leading-none" aria-hidden="true"></i>
                      </span>
                      <h3 className="font-heading text-[1.05rem] text-foreground-950">Emergency guidance</h3>
                    </div>
                    <p className="mt-4 text-[0.86rem] leading-relaxed text-foreground-800">{emergencyGuidance}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}