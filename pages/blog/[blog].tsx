import Section from '@/components/Section';
import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();

  return (
    <Section>
      {pathname && <p>Project: {pathname.split('/').pop()}</p>}
      <p>Test</p>
    </Section>
  );
}
