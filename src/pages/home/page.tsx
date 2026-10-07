import { useState } from 'react';
import Hero from './components/Hero';
import PopularTreatments from './components/PopularTreatments';
import TrustStrip from './components/TrustStrip';
import GoalSelector from './components/GoalSelector';
import HowItWorksSection from './components/HowItWorksSection';
import Comparison from './components/Comparison';
import Standards from './components/Standards';
import MedicalDirector from './components/MedicalDirector';
import ClinicalTeamSection from './components/ClinicalTeamSection';
import SocialProof from './components/SocialProof';
import HumanSupport from './components/HumanSupport';
import Included from './components/Included';
import PharmacyQuality from './components/PharmacyQuality';
import ResourcesBand from './components/ResourcesBand';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import { usePageMeta } from '@/hooks/usePageMeta';

export default function Home() {
  usePageMeta({
    title: 'EVOLV Today | Physician-Guided Telehealth & Longevity Care',
    description:
      'Physician-guided telehealth for longevity, recovery, energy, sleep, metabolic health, skin, hair and sexual wellness. Prescribed online, shipped from licensed US pharmacies.',
    canonicalPath: '/',
  });

  const [activeGoal, setActiveGoal] = useState<string | null>(null);

  const handleSelectFromCard = (goalId: string) => {
    setActiveGoal(goalId);
    const target = document.getElementById('programs');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterGoal = (goalId: string) => setActiveGoal(goalId);
  const handleClearGoal = () => setActiveGoal(null);

  return (
    <>
      <Hero />
      <PopularTreatments
        activeGoal={activeGoal}
        onSelectGoal={handleFilterGoal}
        onClearGoal={handleClearGoal}
      />
      <TrustStrip />
      <GoalSelector activeGoal={activeGoal} onSelect={handleSelectFromCard} />
      <HowItWorksSection />
      <Comparison />
      <Standards />
      <MedicalDirector />
      <ClinicalTeamSection />
      <SocialProof />
      <HumanSupport />
      <Included />
      <PharmacyQuality />
      <ResourcesBand />
      <FaqSection />
      <FinalCta />
    </>
  );
}