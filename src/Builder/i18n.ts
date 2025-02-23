import { type I18n } from "./types";

export const en: I18n = {
    label: 'Navigation Label',
    url: 'Navigation Url',
    target: 'Navigation Target',
    id: 'Navigation ID',
    targetOptions: {
        _blank: 'New Tab',
        _self: 'Same Tab',
        _parent: 'Parent Tab',
        _top: 'Top Tab',
    },
    save: 'Save Menu',
    delete: 'Delete Menu',
    cancel: 'Cancel',
};

export const pt_BR: I18n = {
    label: 'Texto',
    url: 'URL',
    target: 'Alvo',
    id: 'ID',
    targetOptions: {
        _blank: 'Nova Aba',
        _self: 'Mesma Aba',
        _parent: 'Aba Pai',
        _top: 'Aba Superior',
    },
    save: 'Salvar',
    delete: 'Excluir',
    cancel: 'Cancelar',
};

export const i18ns = { en, pt_BR } as const;