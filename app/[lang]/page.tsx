import { ILangParams } from "@/types/global";
import { getDictionary } from "../../dictionaries";
import { useDict } from "@/hooks/useDict";

interface HomeProps extends ILangParams {}
export async function generateStaticParams() {
  const langs = ["en", "fa"];

  return langs.map((lang) => ({
    lang,
  }));
}

export default async function Home({ params }: HomeProps) {
  const dict = useDict();

  if (!dict || typeof dict !== "object") {
    console.error("Invalid dictionary returned:", dict);
    throw new Error("Invalid dictionary format");
  }

  return (
    <div>
      <h2>{dict.Coins}</h2>
    </div>
  );
}
