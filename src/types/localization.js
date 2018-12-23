// @flow

export type Localization = {
    getLocalizedDate: (string | Date) => string,
    getLocalizedString: (string, ...params: Array<string>) => string,
    getLocalizedNumber: (number | string) => string
};
