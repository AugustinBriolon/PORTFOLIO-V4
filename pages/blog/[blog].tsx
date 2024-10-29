import { usePathname } from 'next/navigation';

export default function Page() {
  const pathname = usePathname();

  return (
    <section className='min-h-[90vh] max-h-fit max-w-screen-xl mx-auto w-full flex flex-col items-center px-2'>
      {pathname && <p>Project: {pathname.split('/').pop()}</p>}
      <p>Test</p>
    </section>
  );
}
