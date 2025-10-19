import Image from 'next/image';

export default function PromoBanner() {
  return (
    <div className="relative w-full h-auto">
      <Image
        src="/big-banner.jpeg"
        alt="BAJAJ Motosiklet Promosyon - Hayalinizdeki Motosiklete Senetli Satış İmkanıyla Sahip Olun"
        width={1920}
        height={600}
        className="w-full h-auto object-cover"
        priority
      />
    </div>
  );
}
