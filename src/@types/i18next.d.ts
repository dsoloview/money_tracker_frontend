import "i18next";
import {defaultNS, resources} from "../tools/language/language.ts";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNS;
        resources: typeof resources["en"];
    }
}