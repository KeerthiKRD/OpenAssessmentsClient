import wrapper from '../../constants/wrapper';

// Local actions
const actions = [];

// Actions that make an api request
const requests = [
  'UPLOAD_MEDIA',
];

export const Constants = wrapper(actions, requests);

export function uploadMedia(file, guid, itemId, bankId) {
  const formData = new FormData();
  formData.append('inputFile', file);
  formData.append('returnUrl', true);

  return {
    bankId,
    itemId,
    file,
    guid,
    apiCall: true,
    type: Constants.UPLOAD_MEDIA,
    body: formData
  };
}