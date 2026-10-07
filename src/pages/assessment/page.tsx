import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Logo from '@/components/feature/Logo';
import Button from '@/components/base/Button';
import Container from '@/components/base/Container';
import FieldInput from './components/FieldInput';
import CompletionScreen from './components/CompletionScreen';
import { assessmentSteps, TOTAL_STEPS, type Field, type Step } from './steps';
import { useAssessmentDraft, type AnswerValue } from '@/hooks/useAssessmentDraft';
import { programs } from '@/mocks/programs';
import { usePageMeta } from '@/hooks/usePageMeta';

function formatAnswer(field: Field, value: AnswerValue | undefined): string {
  if (value === undefined || value === null || value === '') return '—';

  if (field.type === 'consent') {
    return value === 'agreed' ? 'Agreed' : 'Not agreed';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return '—';
    return value
      .map((item) => field.options?.find((option) => option.value === item)?.label || item)
      .join(', ');
  }

  return field.options?.find((option) => option.value === value)?.label || value;
}

export default function Assessment() {
  usePageMeta({
    title: 'Take the 3-Minute Assessment | EVOLV Today',
    description:
      'Take the free 3-minute assessment. A licensed clinician reviews your answers and decides whether treatment is appropriate.',
    canonicalPath: '/assessment',
  });

  const { answers, setAnswer, mergeAnswers, savedAt, reset, hydrated } = useAssessmentDraft();
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const step = assessmentSteps[stepIndex];
  const progress = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);
  const minutesLeft = Math.max(1, Math.ceil((TOTAL_STEPS - stepIndex) * 0.2));

  useEffect(() => {
    if (!hydrated) return;
    const slug = searchParams.get('program');
    if (!slug) return;
    const program = programs.find((item) => item.slug === slug);
    if (!program) return;
    const partial: Record<string, AnswerValue> = { primaryGoal: program.goalId };
    if (['Injectable', 'Topical', 'Oral', 'Personalized'].includes(program.formatGroup)) {
      partial.preferredCategory = program.formatGroup;
    }
    mergeAnswers(partial);
  }, [hydrated, searchParams, mergeAnswers]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  const validateStep = () => {
    const nextErrors: Record<string, string> = {};

    step.fields.forEach((field) => {
      if (!field.required || field.optional) return;
      const value = answers[field.name];

      if (field.type === 'consent') {
        if (value !== 'agreed') nextErrors[field.name] = 'Please agree to continue.';
      } else if (field.type === 'multiselect') {
        if (!Array.isArray(value) || value.length === 0) {
          nextErrors[field.name] = 'Please select at least one option.';
        }
      } else if (!value || (typeof value === 'string' && !value.trim())) {
        nextErrors[field.name] = 'This field is required.';
      }
    });

    if (step.id === 'eligibility' && answers.age) {
      const age = Number(answers.age);
      if (Number.isNaN(age) || age < 18) {
        nextErrors.age = 'You must be 18 or older to use EVOLV Today.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    if (stepIndex < TOTAL_STEPS - 1) {
      setStepIndex((index) => index + 1);
      setErrors({});
    }
  };

  const goBack = () => {
    if (stepIndex > 0) {
      setStepIndex((index) => index - 1);
      setErrors({});
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    reset();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const savedLabel = savedAt ? 'Draft saved' : hydrated ? 'Autosave on' : 'Loading draft…';

  return (
    <div className="flex min-h-screen flex-col bg-background-100">
      <header className="sticky top-0 z-40 border-b border-background-300/70 bg-background-50/95 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 font-label text-[0.72rem] uppercase tracking-[0.08em] text-foreground-600 sm:inline-flex">
              <i className="ri-cloud-line text-sm leading-none text-primary-600" aria-hidden="true"></i>
              {savedLabel}
            </span>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 whitespace-nowrap font-label text-[0.78rem] font-medium text-foreground-700 transition-colors duration-200 hover:text-primary-700"
            >
              <i className="ri-close-line text-base leading-none" aria-hidden="true"></i>
              Save and exit
            </Link>
          </div>
        </Container>

        <div className="h-1 w-full bg-background-200">
          <div
            className="h-full bg-primary-500 transition-all duration-500 ease-out"
            style={{ width: `${submitted ? 100 : progress}%` }}
          />
        </div>
      </header>

      {submitted ? (
        <main className="flex-1">
          <CompletionScreen />
        </main>
      ) : (
        <>
          <main className="flex-1 py-10 md:py-14">
            <Container className="max-w-3xl">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-background-200 px-3 py-1 font-label text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-foreground-700">
                  Step {stepIndex + 1} of {TOTAL_STEPS} · {step.section}
                </span>
                <span className="inline-flex items-center gap-1.5 font-label text-[0.72rem] text-foreground-600">
                  <i className="ri-timer-line text-sm leading-none" aria-hidden="true"></i>
                  About {minutesLeft} {minutesLeft === 1 ? 'minute' : 'minutes'} left
                </span>
              </div>

              <h1
                ref={headingRef}
                tabIndex={-1}
                className="mt-6 font-heading text-[1.7rem] leading-tight tracking-[-0.01em] text-foreground-950 outline-none md:text-[2.2rem]"
              >
                {step.title}
              </h1>
              {step.subtitle ? (
                <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-foreground-700">
                  {step.subtitle}
                </p>
              ) : null}

              {step.isReview ? (
                <div className="mt-8 space-y-4">
                  {assessmentSteps
                    .filter((item) => !item.isReview)
                    .map((item) => {
                      const index = assessmentSteps.findIndex((s) => s.id === item.id);
                      return (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-background-200 bg-background-50 p-5 md:p-6"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <h2 className="font-heading text-[1.05rem] text-foreground-950">{item.section}</h2>
                            <button
                              type="button"
                              onClick={() => {
                                setStepIndex(index);
                                setErrors({});
                              }}
                              className="whitespace-nowrap font-label text-[0.76rem] font-medium text-primary-700 transition-colors duration-200 hover:text-primary-600 cursor-pointer"
                            >
                              Edit
                            </button>
                          </div>
                          <dl className="mt-4 space-y-2.5">
                            {item.fields.map((field) => (
                              <div key={field.name} className="grid grid-cols-1 gap-1 sm:grid-cols-[12rem_1fr] sm:gap-4">
                                <dt className="text-[0.8rem] text-foreground-600">{field.label}</dt>
                                <dd className="text-[0.86rem] text-foreground-900">
                                  {formatAnswer(field, answers[field.name])}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      );
                    })}

                  <div className="rounded-2xl border border-background-300 bg-background-50 p-5">
                    <p className="text-[0.82rem] leading-relaxed text-foreground-700">
                      By submitting, you confirm the information above is accurate. A licensed clinician will
                      review it independently. Completing this assessment does not guarantee a prescription, and
                      your treatment charge is captured only after clinical approval.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2">
                  {step.fields.map((field) => (
                    <FieldInput
                      key={field.name}
                      field={field}
                      value={answers[field.name]}
                      onChange={(value) => {
                        setAnswer(field.name, value);
                        if (errors[field.name]) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next[field.name];
                            return next;
                          });
                        }
                      }}
                      error={errors[field.name]}
                    />
                  ))}
                </div>
              )}

              <div className="mt-8 flex items-start gap-3 rounded-2xl bg-secondary-50 px-4 py-3.5">
                <i className="ri-lock-2-line mt-0.5 text-base leading-none text-secondary-800" aria-hidden="true"></i>
                <p className="text-[0.78rem] leading-relaxed text-secondary-900">
                  Your answers are private and encrypted. A clinician may decline treatment, and nothing is
                  charged until treatment is approved. Answers save automatically as you go.
                </p>
              </div>
            </Container>
          </main>

          <div className="sticky bottom-0 z-40 border-t border-background-300/70 bg-background-50/95 backdrop-blur-md">
            <Container className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={goBack}
                disabled={stepIndex === 0}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-foreground-950/15 px-5 py-2.5 font-label text-sm font-medium text-foreground-900 transition-colors duration-200 hover:border-primary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-40 cursor-pointer"
              >
                <i className="ri-arrow-left-line text-base leading-none" aria-hidden="true"></i>
                Back
              </button>

              {step.isReview ? (
                <Button
                  onClick={handleSubmit}
                  variant="primary"
                  size="lg"
                  iconAfter="ri-send-plane-line"
                  className="sm:min-w-56"
                >
                  Submit assessment
                </Button>
              ) : (
                <Button onClick={goNext} variant="primary" size="lg" iconAfter="ri-arrow-right-line" className="sm:min-w-40">
                  Continue
                </Button>
              )}
            </Container>
          </div>
        </>
      )}
    </div>
  );
}