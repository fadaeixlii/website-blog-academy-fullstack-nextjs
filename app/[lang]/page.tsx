import { ILangParams } from "@/types/global";
import { getDictionary } from "../../dictionaries";

interface HomeProps extends ILangParams {}
export async function generateStaticParams() {
  const langs = ["en", "fa"];
  console.log(langs);

  return langs.map((lang) => ({
    lang,
  }));
}

export default async function Home({ params }: HomeProps) {
  console.log("first");
  if (!(params.lang === "en" || params.lang === "fa")) {
    return <div>Invalid dictionary returned:</div>;
  }

  const dict = await getDictionary(params.lang);

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
