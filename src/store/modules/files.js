import mdSample from '../../markdown/sample.md';

export default {
  namespaced: true,
  state: {
    files: [],
    currentFile: {
      name: 'Test 123456 abcdefghijkl 123456 abcdefghijkl 123456 abcdefghijkl 123456 abcdefghijkl',
      folderId: null,
      isLoaded: true,
      content: {
        state: {},
        text: mdSample,
        properties: {},
        discussions: {},
        comments: {},
      },
    },
  },
  mutations: {
    setCurrentFile: (state, value) => {
      state.currentFile = value;
    },
    setCurrentFileName: (state, value) => {
      if (value) {
        state.currentFile.name = value;
      }
    },
    setCurrentFileContentText: (state, value) => {
      state.currentFile.content.text = value;
    },
    setCurrentFileContentState: (state, value) => {
      state.currentFile.content.state = value;
    },
  },
};
