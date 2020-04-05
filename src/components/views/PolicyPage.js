import React from 'react';
import { useTranslation } from "react-i18next";
import LanguagePicker from '../locales/LanguagePicker';
import Footer from '../Footer';


import "../locales/i18n";

function DataPolicyPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-3xl px-4">
        <article className="whitespace-pre">
          <div className="bg-white py-14 px-4 shadow sm:rounded-lg sm:px-24">
            
            <LanguagePicker />
          
            <h1 className="mb-5 text-3xl sm:text-5xl leading-9 font-bold text-gray-900">
              {t("PolicyPage.title")}
            </h1>

            <div>
              {t("PolicyPage.text")}
            </div>

          </div>   
      </article>  

      <Footer />

    </div>
  );
}

export default DataPolicyPage
