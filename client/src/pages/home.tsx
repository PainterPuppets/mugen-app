import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import DirectoryStructureSection from "@/components/sections/DirectoryStructureSection";
import CodeExampleSection from "@/components/sections/CodeExampleSection";
import APITestingSection from "@/components/sections/APITestingSection";
import GetStartedSection from "@/components/sections/GetStartedSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <DirectoryStructureSection />
      <CodeExampleSection />
      <APITestingSection />
      <GetStartedSection />
    </>
  );
}
