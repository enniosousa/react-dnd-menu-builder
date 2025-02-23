import React, { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";
import { Collapse } from "./Collapse";
import { I18n, OtherFields, TreeItem as TreeItemType, TreeItems, UrlSuggestion } from "../../types";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ActionTargets } from "../../utilities";

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
  updateitem?: (
    id: UniqueIdentifier,
    data: Omit<TreeItemType, "children">
  ) => void;
  otherfields?: OtherFields;
  i18n: I18n;
  urlSuggestions: UrlSuggestion[];
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      updateitem,
      wrapperRef,
      i18n,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const target = props?.otherfields?.target ?? "_self";
    const [newData, setNewData] = React.useState<
      Omit<TreeItemType, "children">
    >({
      id: value,
      href: props?.otherfields?.href,
      name: props?.otherfields?.name ?? value,
      target,
    });

    return (
      <li
        className={classNames({
          Wrapper: true,
          clone: clone,
          ghost: ghost,
          indicator: indicator,
          disableSelection: disableSelection,
          disableInteraction: disableInteraction,
        })}
        ref={wrapperRef}
        style={
          {
            ...(!clone
              ? {
                paddingLeft: `${indentationWidth * depth}px`,
              }
              : {}),
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          {...handleProps}
          className="TreeItem"
          ref={ref}
          style={{
            ...style,
            height:
              ghost && indicator && childCount
                ? `${childCount * 42 + (childCount - 1) * 9}px`
                : "42px",
          }}
        >
          <span className={"Text"} title={[
            `${i18n.label}: ${props?.otherfields?.name}`,
            `${i18n.url}: ${props?.otherfields?.href}`,
            `${i18n.target}: ${i18n.targetOptions[target]}`,
            `${i18n.id}: ${value}`,
            ].join("\n")}>
            {props?.otherfields?.name}{" "}
            <span
              style={{
                fontSize: "13px",
                fontWeight: "400",
                fontStyle: "italic",
                color: "#50575e",
                marginLeft: "4px",
              }}
            >
              {i18n.targetOptions[target]} &bull; {" "}
              {props?.otherfields?.href}
            </span>
          </span>
          {!clone && onRemove && (
            <Collapse open={open} handleOpen={() => setOpen(!open)} />
          )}
          {clone && childCount && childCount > 1 ? (
            <div className={"Count"}>
              {props.childs &&
                props.childs.map((child: any) => {
                  return (
                    <RecursiveItem child={child} key={child.id} nDepth={1} />
                  );
                })}
            </div>
          ) : null}
        </div>
        {!(props.show === "true") && open && (
          <div
            style={{
              width: "412px",
              border: "1px solid #c3c4c7",
              marginTop: "-1px",
            }}
          >
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  fontSize: "13px",
                  color: "#646970",
                }}
                htmlFor="label"
              >
                {i18n.label}
              </label>
              <input
                value={newData.name}
                onChange={(e) => {
                  const name = e.target.value;
                  const suggestion = props.urlSuggestions.find((suggestion) => suggestion.label === name);
                  setNewData(old => {
                    const href = suggestion ? suggestion.value : old.href;
                    return { ...old, name, href };
                  });
                }}
                type="search"
                id="label"
                style={{
                  border: "1px solid #dcdcde",
                  height: "30px",
                  borderRadius: "4px",
                  padding: "0 10px",
                }}
                list="nameSuggestions"
              />
              <datalist id="nameSuggestions">
                {props.urlSuggestions.map((url) => (
                  <option key={url.value} value={url.label}>
                    {url.value}
                  </option>
                ))}
              </datalist>
              <label
                style={{
                  marginTop: "10px",
                  marginBottom: "5px",
                  fontSize: "13px",
                  color: "#646970",
                }}
                htmlFor="href"
              >
                {i18n.url}
              </label>
              <input
                value={newData.href}
                onChange={(e) => {
                  const href = e.target.value;
                  const suggestion = props.urlSuggestions.find((suggestion) => suggestion.value === href);
                  setNewData(old => {
                    const name = suggestion ? suggestion.label : old.name;
                    return { ...old, href, name };
                  });
                }}
                type="search"
                id="href"
                style={{
                  border: "1px solid #dcdcde",
                  height: "30px",
                  borderRadius: "4px",
                  padding: "0 10px",
                }}
                list="urlSuggestions"
              />
              <datalist id="urlSuggestions">
                {props.urlSuggestions.map((url) => (
                  <option key={url.value} value={url.value}>
                    {url.label}
                  </option>
                ))}
              </datalist>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                {/* target input */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      marginTop: "10px",
                      marginBottom: "5px",
                      fontSize: "13px",
                      color: "#646970",
                    }}
                    htmlFor="id"
                  >
                    {i18n.target}
                  </label>
                  <select
                    defaultValue="_self"
                    value={newData.target}
                    onChange={(e) => {
                      setNewData({ ...newData, target: e.target.value as typeof ActionTargets[number] });
                    }}
                    id="target"
                    style={{
                      border: "1px solid #dcdcde",
                      height: "30px",
                      borderRadius: "4px",
                      padding: "0 10px",
                    }}
                  >
                    {ActionTargets.map((target) => (
                      <option key={target} value={target}>
                        {i18n.targetOptions[target]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* id input */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <label
                    style={{
                      marginTop: "10px",
                      marginBottom: "5px",
                      fontSize: "13px",
                      color: "#646970",
                    }}
                    htmlFor="id"
                  >
                    {i18n.id}
                  </label>
                  <input
                    value={newData.id}
                    onChange={(e) => {
                      setNewData({ ...newData, id: e.target.value });
                    }}
                    type="text"
                    id="id"
                    style={{
                      border: "1px solid #dcdcde",
                      height: "30px",
                      borderRadius: "4px",
                      padding: "0 10px",
                    }}
                  />
                </div>
              </div>

              {/* buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                  gap: "12px",
                }}
              >
                {/* save button */}
                <button
                  style={{
                    all: "unset",
                    height: "32px",
                    backgroundColor: "#2271b1",
                    color: "white",
                    padding: "0 12px",
                    fontSize: "13px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateitem && updateitem(value, newData);
                    setOpen(false);
                  }}
                >
                  {i18n.save}
                </button>

                {/* cancel button (reset and close) */}
                <button
                  style={{
                    all: "unset",
                    height: "32px",
                    backgroundColor: "gray",
                    color: "white",
                    padding: "0 12px",
                    fontSize: "13px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setNewData({
                      id: value,
                      href: props?.otherfields?.href,
                      name: props?.otherfields?.name ?? value,
                      target,
                    });
                    setOpen(false);
                  }}
                >
                  {i18n.cancel}
                </button>

                {/* delete button */}
                <button
                  style={{
                    all: "unset",
                    fontSize: "13px",
                    color: "#b32d2e",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    onRemove && onRemove();
                  }}
                >
                  {i18n.delete}
                </button>
              </div>
            </div>
          </div>
        )}
      </li>
    );
  }
);

const RecursiveItem = (props: {
  child: TreeItemType;
  nDepth: number;
  key: string;
}) => {
  const newDepth = props.nDepth + 1;
  return (
    <>
      <div
        style={{
          width: "414px",
          height: "42px",
          border: "1px solid #dcdcde",
          marginTop: "9px",
          marginLeft: `${props.nDepth * 50}px`,
          backgroundColor: "#f6f7f7",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "0.5rem",
          fontWeight: "600",
          fontSize: "13px",
        }}
      >
        {props.child.name}{" "}
        <span
          style={{
            fontSize: "13px",
            fontWeight: "400",
            fontStyle: "italic",
            color: "#50575e",
            marginLeft: "4px",
          }}
        >
          sub item
        </span>
      </div>
      {props.child.children.map((child: any) => {
        return <RecursiveItem key={child.id} child={child} nDepth={newDepth} />;
      })}
    </>
  );
};
