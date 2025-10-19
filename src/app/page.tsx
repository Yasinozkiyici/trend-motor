import HomeHeroProvider from '@/app/(public)/home-hero-provider';
import HomeFeaturedProvider from '@/app/(public)/home-featured-provider';
import ContactSection from '@/components/ContactSection';
import FAQ from '@/components/FAQ';

export default function HomePage() {
  return (
    <HomeHeroProvider>
      <HomeFeaturedProvider>
        {/* Contact Section */}
        <ContactSection />
        
        {/* FAQ Section */}
        <FAQ />
      </HomeFeaturedProvider>
    </HomeHeroProvider>
  );
}
