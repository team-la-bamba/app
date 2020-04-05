import React from "react";
import { useTranslation } from "react-i18next";

function Header({ children }) {
  const { t } = useTranslation();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md px-8">
      <h1 className="mt-6 text-center text-4xl leading-9 font-bold text-gray-900">
        {t("Header.title")}{" "}
        <span role="img" aria-label="fever-emoji">
          🤒
        </span>
      </h1>

      <p className="mt-4 text-center text-m leading-6 text-gray-700 max-w">
        {children}
      </p>
    </div>
  );
}

export default Header;
