"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { setCookie } from "@/utils/utils";

const LanguageSwitcher = () => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const languages = [
    {
      code: "en",
      language: "EN",
    },
    {
      code: "bn",
      language: "BN",
    },
  ];

  const found = languages.find((lang) => pathname.includes(lang.code));
  const [selectedLanguage, setSelectedLanguage] = useState(
    found ?? languages[0]
  );

  const handleLanguageChange = (lang) => {
    /* let path = pathname;
    if (pathname.includes(selectedLanguage.code)) {
      path = pathname.replace(selectedLanguage.code, lang);
    } */
    setSelectedLanguage({
      ...selectedLanguage,
      code: lang,
      language: lang === "en" ? "English" : "Bangla",
    });

    const newPath = pathname
      ?.split("/")
      ?.slice(2, pathname?.split("/")?.length)
      .join("/");

    replace(`/${lang}/${newPath}`, { scroll: false });
    setCookie("lang", lang);
  };

  return (
    <>
      <button
        className={`${
          selectedLanguage.code === "en" && "bg-green-500 rounded-sm"
        }`}
        onClick={() => handleLanguageChange("en")}
      >
        EN
      </button>
      <span>|</span>
      <button
        className={`${
          selectedLanguage.code === "bn" && "bg-green-500 rounded-sm"
        }`}
        onClick={() => handleLanguageChange("bn")}
      >
        BN
      </button>
    </>
  );
};

export default LanguageSwitcher;
