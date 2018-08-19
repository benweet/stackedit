import workspaceSvc from './workspaceSvc';
import utils from './utils';

export default {
  async importBackup(jsonValue) {
    const fileNameMap = {};
    const folderNameMap = {};
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
            fileNameMap[v4Id] = value;
          } else if (type === 'content') {
            textMap[v4Id] = value;
          }
        } else if (value.type === 'folder') {
          // StackEdit v5 folder
          folderIdMap[id] = utils.uid();
          folderNameMap[id] = value.name;
          parentIdMap[id] = `${value.parentId || ''}`;
        } else if (value.type === 'file') {
          // StackEdit v5 file
          fileNameMap[id] = value.name;
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

    await utils.awaitSequence(
      Object.keys(folderNameMap),
      async externalId => workspaceSvc.setOrPatchItem({
        id: folderIdMap[externalId],
        type: 'folder',
        name: folderNameMap[externalId],
        parentId: folderIdMap[parentIdMap[externalId]],
      }),
    );

    await utils.awaitSequence(
      Object.keys(fileNameMap),
      async externalId => workspaceSvc.createFile({
        name: fileNameMap[externalId],
        parentId: folderIdMap[parentIdMap[externalId]],
        text: textMap[externalId],
        properties: propertiesMap[externalId],
        discussions: discussionsMap[externalId],
        comments: commentsMap[externalId],
      }, true),
    );
  },
};
