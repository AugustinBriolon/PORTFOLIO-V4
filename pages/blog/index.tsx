import Link from "next/link";

export default function Blogs() {

  // const posts = [
  //   {
  //     slug: 'comment-jai-appris-a-coder',
  //     title: 'Comment j\'ai appris à coder'
  //   }
  // ];

  return (
    <section className='min-h-[90vh] max-h-fit max-w-screen-xl mx-auto w-full flex flex-col items-center px-2'>
      <Link href='/blog/comment-jai-appris-a-coder'>
        Comment j&apos;ai appris à coder
      </Link>
    </section>
  );
}
