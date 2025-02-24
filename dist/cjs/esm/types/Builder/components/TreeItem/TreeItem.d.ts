import React, { HTMLAttributes } from "react";
import { I18n, OtherFields, TreeItem as TreeItemType, TreeItems, UrlSuggestion } from "../../types";
import { UniqueIdentifier } from "@dnd-kit/core";
export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
    childCount?: number;
    clone?: boolean;
    collapsed?: boolean;
    depth: number;
    disableInteraction?: boolean;
    disableSelection?: boolean;
    ghost?: boolean;
    handleProps?: any;
    indicator?: boolean;
    indentationWidth: number;
    value: string;
    onCollapse?(): void;
    onRemove?(): void;
    wrapperRef?(node: HTMLLIElement): void;
    childs?: TreeItems;
    show?: string;
    updateitem?: (id: UniqueIdentifier, data: Omit<TreeItemType, "children">) => void;
    otherfields?: OtherFields;
    i18n: I18n;
    urlSuggestions: UrlSuggestion[];
}
export declare const TreeItem: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TreeItem.d.ts.map