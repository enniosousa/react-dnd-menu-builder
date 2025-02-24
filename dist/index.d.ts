import { UniqueIdentifier } from '@dnd-kit/core';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare const ActionTargets: readonly ["_blank", "_self", "_parent", "_top"];

interface TreeItem {
    id: UniqueIdentifier;
    href?: string;
    children: TreeItem[];
    collapsed?: boolean;
    name: string;
    target?: typeof ActionTargets[number];
}
type TreeItems = TreeItem[];
interface I18n {
    label: string;
    url: string;
    target: string;
    id: string;
    targetOptions: {
        _blank: string;
        _self: string;
        _parent: string;
        _top: string;
    };
    save: string;
    delete: string;
    cancel: string;
}
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
interface UrlSuggestion {
    label: string;
    value: string;
}

declare const i18ns: {
    readonly en: I18n;
    readonly pt_BR: I18n;
};

interface Props {
    style?: "bordered" | "shadow";
    items: TreeItems;
    setItems(items: ((items: any) => TreeItem[]) | TreeItems): void;
    language?: keyof typeof i18ns;
    translations?: DeepPartial<I18n>;
    urlSuggestions?: UrlSuggestion[];
}
declare function MenuBuilder({ style, items: itemsProps, setItems, language, translations, urlSuggestions, }: Props): react_jsx_runtime.JSX.Element;

export { MenuBuilder as default, i18ns };
