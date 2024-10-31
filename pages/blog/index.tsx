import Section from '@/components/Section';
import Link from 'next/link';

export default function Blogs() {
  // const posts = [
  //   {
  //     slug: 'comment-jai-appris-a-coder',
  //     title: 'Comment j\'ai appris à coder'
  //   }
  // ];

  return (
    <Section>
      <Link href='/blog/comment-jai-appris-a-coder'>
        Comment j&apos;ai appris à coder
      </Link>
    </Section>
  );
}
