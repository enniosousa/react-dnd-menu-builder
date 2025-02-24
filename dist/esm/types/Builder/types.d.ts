import type { MutableRefObject } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';
import { ActionTargets } from './utilities';
export interface TreeItem {
    id: UniqueIdentifier;
    href?: string;
    children: TreeItem[];
    collapsed?: boolean;
    name: string;
    target?: typeof ActionTargets[number];
}
export type TreeItems = TreeItem[];
export interface FlattenedItem extends TreeItem {
    parentId: UniqueIdentifier | null;
    depth: number;
    index: number;
}
export type SensorContext = MutableRefObject<{
    items: FlattenedItem[];
    offset: number;
}>;
export interface I18n {
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
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export interface UrlSuggestion {
    label: string;
    value: string;
}
export type OtherFields = Omit<FlattenedItem, "id" | "children" | "collapsed" | "depth">;
//# sourceMappingURL=types.d.ts.map