import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import en from "../../locale/en.ts";

export const defaultNS = "translation";
export const resources = {
    en
}
i18next
    .use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        ns: [defaultNS],
        defaultNS,
        resources,
    })

