import { CSSProperties } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import { AnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { TreeItem, Props as TreeItemProps } from "./TreeItem";
import { iOS } from "../../utilities";
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

const animateLayoutChanges: AnimateLayoutChanges = ({
  isSorting,
  wasDragging,
}) => (isSorting || wasDragging ? false : true);

export function SortableTreeItem({ id, depth, i18n, urlSuggestions, ...props }: Props) {
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <TreeItem
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      ghost={isDragging}
      disableSelection={iOS}
      disableInteraction={isSorting}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      i18n={i18n}
      urlSuggestions={urlSuggestions}
      {...props}
    />
  );
}
