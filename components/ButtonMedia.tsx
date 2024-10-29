import Image from "next/image";

export function ButtonMedia() {
  return (
    <div className="flex gap-1 py-2 px-4 backdrop-blur-xl border rounded-full cursor-pointer">
      <p className="uppercase font-bold">LET&apos;S CONNECT</p>
      <Image src="/icons/arrow-up-right.svg" alt="Icone de Flèche" width={20} height={20} />
    </div>
  )
}