import type { UniqueIdentifier } from "@dnd-kit/core";
import { Props as TreeItemProps } from "./TreeItem";
import { I18n, OtherFields, TreeItem as TreeItemType, TreeItems, UrlSuggestion } from "../../types";
interface Props extends TreeItemProps {
    id: UniqueIdentifier;
    childs?: TreeItems;
    show?: string;
    updateitem?: (id: UniqueIdentifier, data: Omit<TreeItemType, "children">) => void;
    otherfields?: OtherFields;
    i18n: I18n;
    urlSuggestions: UrlSuggestion[];
}
export declare function SortableTreeItem({ id, depth, i18n, urlSuggestions, ...props }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SortableTreeItem.d.ts.map