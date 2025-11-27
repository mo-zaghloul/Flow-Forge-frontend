import Image from "next/image";

export default function MyLogo() {
  return (
    <Image
      src="/FlowForgeLogo.png"
      alt="Logo"
      width={25}
      height={25}
    />
  );
}
