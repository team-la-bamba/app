import React from 'react';
import { useTranslation } from "react-i18next";
import LanguagePicker from '../locales/LanguagePicker';

import "../locales/i18n";

function DataPolicyPage() {
  const { t } = useTranslation();

  return (
      <article className="sm:mx-auto sm:w-full max-w-5xl px-8 whitespace-pre">
        <div className="bg-white py-14 px-4 shadow sm:rounded-lg sm:px-24">
          
          <LanguagePicker />
        
          <h1 className="mb-5 text-5xl leading-9 font-bold text-gray-900">
            {t("PolicyPage.title")}
          </h1>

          <div>
            {t("PolicyPage.text")}
          </div>

        </div>   
    </article>  
  );
}

export default DataPolicyPage
