import { useCallback, useEffect, useState } from 'react';

export type AnswerValue = string | string[];

const CACHE_NAME = 'evlv-assessment-draft-v1';
const DRAFT_KEY = '/__evlv-assessment-draft__';

async function writeDraft(data: Record<string, AnswerValue>): Promise<boolean> {
  try {
    if (typeof caches === 'undefined') return false;
    const cache = await caches.open(CACHE_NAME);
    await cache.put(
      new Request(DRAFT_KEY),
      new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
    );
    return true;
  } catch {
    return false;
  }
}

async function readDraft(): Promise<Record<string, AnswerValue> | null> {
  try {
    if (typeof caches === 'undefined') return null;
    const cache = await caches.open(CACHE_NAME);
    const response = await cache.match(DRAFT_KEY);
    if (!response) return null;
    return (await response.json()) as Record<string, AnswerValue>;
  } catch {
    return null;
  }
}

async function removeDraft(): Promise<void> {
  try {
    if (typeof caches === 'undefined') return;
    const cache = await caches.open(CACHE_NAME);
    await cache.delete(DRAFT_KEY);
  } catch {
    // no-op
  }
}

export function useAssessmentDraft() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    readDraft().then((data) => {
      if (!active) return;
      if (data) setAnswers(data);
      setHydrated(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return undefined;
    const timer = window.setTimeout(() => {
      writeDraft(answers).then((ok) => {
        if (ok) setSavedAt(Date.now());
      });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [answers, hydrated]);

  const setAnswer = useCallback((name: string, value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [name]: value }));
  }, []);

  const mergeAnswers = useCallback(
    (partial: Record<string, AnswerValue>, overwrite = false) => {
      setAnswers((prev) => {
        const next = { ...prev };
        let changed = false;
        Object.entries(partial).forEach(([key, value]) => {
          const current = next[key];
          const isEmpty =
            current === undefined || current === '' || (Array.isArray(current) && current.length === 0);
          if (overwrite || isEmpty) {
            next[key] = value;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    },
    []
  );

  const reset = useCallback(async () => {
    setAnswers({});
    setSavedAt(null);
    await removeDraft();
  }, []);

  return { answers, setAnswer, mergeAnswers, savedAt, reset, hydrated };
}