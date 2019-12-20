import * as c from '../../../../../custom_templates/constants';

import { removeByIndex, constructFieldConfigEntry } from './index';

export const setEntryLoading = ({ setState, roleKey, value }) => {
  setState(prevState => ({
    loadingEntries: { ...prevState.loadingEntries, [roleKey]: value }
  }));
};
