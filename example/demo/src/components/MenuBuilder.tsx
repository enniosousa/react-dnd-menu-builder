import { Flex, Modal, Select } from "antd";
import { useState } from "react";
import MenuBuilder, { i18ns } from "react-dnd-menu-builder";
import { Button, Input } from "antd";

const lang: keyof typeof i18ns = 'pt_BR';
const i18n = i18ns[lang];
type MenuBuilderProps = Parameters<typeof MenuBuilder>[0];
type MenuBuilderItem = MenuBuilderProps["items"][number];
type UrlSuggestions = MenuBuilderProps["urlSuggestions"];
const urlSuggestions: UrlSuggestions = [
  { label: "Home", value: "/home" },
  { label: "Blog", value: "/blog" },
  { label: "About", value: "/about" },
  { label: "Contact", value: "/contact" },
]
function MenuBuilderX({
  menus,
  handleMenus,
}: {
  menus: any;
  handleMenus: any;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<MenuBuilderItem>({
    id: "",
    name: "",
    href: "",
    children: [],
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    handleMenus([
      ...menus,
      {
        ...formData,
        id: Math.random().toString(36).substring(7),
      },
    ]);
    setFormData({ id: "", name: "", href: "", children: [] });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{}}>
      <Button
        type="primary"
        onClick={() => {
          showModal();
        }}
      >
        Add Menu
      </Button>
      <MenuBuilder items={menus} setItems={handleMenus}
        language={lang}
        // partial translations
        // translations={{
        //   targetOptions: {
        //     _blank: "Nova aba",
        //   },
        // }}
        urlSuggestions={urlSuggestions}
      />
      <Modal
        title="Add Menu"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
      >
        <label
          style={{
            fontSize: "12px",
            color: "#1d1d1d7f",
          }}
          htmlFor="add-menu-label"
        >
          {i18n.label}
        </label>
        <Input
          id="add-menu-label"
          placeholder="Home"
          value={formData.name}
          type="search"
          onChange={(e) => {
            // setFormData({ ...formData, name: e.target.value });
            const value = e.target.value;
            const suggestion = urlSuggestions?.find((s) => s.label === value);
            setFormData(old => {
              return {
                ...old,
                name: value,
                href: suggestion?.value ?? old.href
              }
            })
          }}
          list="add-menu-label-suggestions"
        />
        <datalist id="add-menu-label-suggestions">
          {urlSuggestions?.map((suggestion) => (
            <option key={suggestion.value} value={suggestion.label}>
              {suggestion.value}
            </option>
          ))}
        </datalist>
        <div style={{ marginTop: 15 }}>
          <label
            style={{
              fontSize: "12px",
              color: "#1d1d1d7f",
            }}
            htmlFor="add-menu-url"
          >
            {i18n.url}
          </label>
          <Input
            id="add-menu-url"
            placeholder="/home"
            value={formData.href}
            onChange={(e) => {
              // setFormData({ ...formData, href: e.target.value })
              const value = e.target.value;
              const suggestion = urlSuggestions?.find((s) => s.value === value);
              setFormData(old => {
                return {
                  ...old,
                  name: suggestion?.label ?? old.name,
                  href: value
                }
              })
            }}
            list="add-menu-url-suggestions"
            type="search"
          />
          <datalist id="add-menu-url-suggestions">
            {urlSuggestions?.map((suggestion) => (
              <option key={suggestion.value} value={suggestion.value}>
                {suggestion.label}
              </option>
            ))}
          </datalist>
        </div>
        <Flex style={{ marginTop: 15, gap: '15px' }} justify="space-between">
          <div style={{ width: "100%" }}>
            <label
              style={{
                fontSize: "12px",
                color: "#1d1d1d7f",
              }}
              htmlFor="add-menu-target"
            >
              {i18n.target}
            </label>
            <Select
              id="add-menu-target"
              style={{ display: 'block' }}
              value={formData.target
                ? formData.target
                : "_self"}
              onChange={(value) => {
                setFormData({ ...formData, target: value })
              }}
            >
              {Object.entries(i18n.targetOptions).map(([key, value]) => <Select.Option value={key}>{value}</Select.Option>)}
            </Select>
          </div>
          <div style={{ width: "100%" }}>
            <label
              style={{
                fontSize: "12px",
                color: "#1d1d1d7f",
              }}
              htmlFor="add-menu-id"
            >
              {i18n.id}
            </label>
            <Input
              id="add-menu-id"
              placeholder="home-link"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </div>
        </Flex>

      </Modal>
    </div>
  );
}

export default MenuBuilderX;
