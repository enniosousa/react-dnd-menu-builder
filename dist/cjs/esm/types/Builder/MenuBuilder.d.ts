import "./builder.css";
import type { DeepPartial, I18n, TreeItem, TreeItems, UrlSuggestion } from "./types";
import { i18ns } from "./i18n";
interface Props {
    style?: "bordered" | "shadow";
    items: TreeItems;
    setItems(items: ((items: any) => TreeItem[]) | TreeItems): void;
    language?: keyof typeof i18ns;
    translations?: DeepPartial<I18n>;
    urlSuggestions?: UrlSuggestion[];
}
export declare function MenuBuilder({ style, items: itemsProps, setItems, language, translations, urlSuggestions, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MenuBuilder.d.ts.map