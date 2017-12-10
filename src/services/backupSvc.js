import store from '../store';
import utils from './utils';

export default {
  importBackup(jsonValue) {
    const nameMap = {};
    const parentIdMap = {};
    const textMap = {};
    const propertiesMap = {};
    const discussionsMap = {};
    const commentsMap = {};
    const folderIdMap = {
      trash: 'trash',
    };

    // Parse JSON value
    const parsedValue = JSON.parse(jsonValue);
    Object.entries(parsedValue).forEach(([id, value]) => {
      if (value) {
        const v4Match = id.match(/^file\.([^.]+)\.([^.]+)$/);
        if (v4Match) {
          // StackEdit v4 format
          const [, v4Id, type] = v4Match;
          if (type === 'title') {
            nameMap[v4Id] = value;
          } else if (type === 'content') {
            textMap[v4Id] = value;
          }
        } else if (value.type === 'folder') {
          // StackEdit v5 folder
          const folderId = utils.uid();
          const name = utils.sanitizeName(value.name);
          const parentId = `${value.parentId || ''}` || null;
          store.commit('folder/setItem', {
            id: folderId,
            name,
            parentId,
          });
          folderIdMap[id] = folderId;
        } else if (value.type === 'file') {
          // StackEdit v5 file
          nameMap[id] = utils.sanitizeName(value.name);
          parentIdMap[id] = `${value.parentId || ''}`;
        } else if (value.type === 'content') {
          // StackEdit v5 content
          const [fileId] = id.split('/');
          if (fileId) {
            textMap[fileId] = value.text;
            propertiesMap[fileId] = value.properties;
            discussionsMap[fileId] = value.discussions;
            commentsMap[fileId] = value.comments;
          }
        }
      }
    });

    // Go through the maps
    Object.entries(nameMap).forEach(([externalId, name]) => store.dispatch('createFile', {
      name,
      parentId: folderIdMap[parentIdMap[externalId]],
      text: textMap[externalId],
      properties: propertiesMap[externalId],
      discussions: discussionsMap[externalId],
      comments: commentsMap[externalId],
    }));
  },
};
