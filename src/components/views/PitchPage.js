import React from 'react';
import { useTranslation } from "react-i18next";
import LanguagePicker from '../locales/LanguagePicker';
import Footer from '../Footer';

import "../locales/i18n";

function PitchPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-3xl px-4">
        <article>
          <div className="bg-white py-14 px-4 shadow sm:rounded-lg sm:px-12">
            
            <LanguagePicker />
          
            <h1 className="mb-5 text-3xl sm:text-5xl leading-9 font-bold text-gray-900">
              {t("PitchPage.title")}
            </h1>

            <div> 
              {t("PitchPage.text", { myVar: 'interpolate', joinArrays: '' })}
            </div>

          </div>    
      </article>  

      <Footer />

    </div>
  );
}

export default PitchPage
