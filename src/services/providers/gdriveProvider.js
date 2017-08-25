import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerUtils from './providerUtils';

export default {
  downloadContent(token, syncLocation) {
    return googleHelper.downloadFile(token, syncLocation.gdriveFileId)
      .then(content => providerUtils.parseContent(content));
  },
  uploadContent(token, item, syncLocation, ifNotTooLate) {
    const file = store.state.file.itemMap[syncLocation.fileId];
    const name = (file && file.name) || 'Untitled';
    const parents = [];
    if (syncLocation.gdriveParentId) {
      parents.push(syncLocation.gdriveParentId);
    }
    return googleHelper.saveFile(
      token,
      name,
      parents,
      providerUtils.serializeContent(item),
      syncLocation && syncLocation.gdriveId,
      ifNotTooLate,
    )
      .then(gdriveFile => ({
        ...syncLocation,
        gdriveId: gdriveFile.id,
      }));
  },
};
