import FormEntry from './FormEntry';
import store from '../../store';

export default (desc) => {
  const component = {
    ...desc,
    components: {
      FormEntry,
    },
    computed: {
      ...desc.computed || {},
      config() {
        return store.getters['modal/config'];
      },
      currentFileName() {
        return store.getters['file/current'].name;
      },
    },
    methods: {
      ...desc.methods || {},
      openFileProperties: () => store.dispatch('modal/open', 'fileProperties'),
    },
  };
  Object.keys(desc.computedLocalSettings || {}).forEach((key) => {
    const id = desc.computedLocalSettings[key];
    component.computed[key] = {
      get() {
        return store.getters['data/localSettings'][id];
      },
      set(value) {
        store.dispatch('data/patchLocalSettings', {
          [id]: value,
        });
      },
    };
    if (key === 'selectedTemplate') {
      component.computed.allTemplates = () => store.getters['data/allTemplates'];
      component.methods.configureTemplates = () => {
        store.dispatch('modal/open', {
          type: 'templates',
          selectedId: this.selectedTemplate,
        })
          .then(({ templates, selectedId }) => {
            store.dispatch('data/setTemplates', templates);
            store.dispatch('data/patchLocalSettings', {
              [id]: selectedId,
            });
          });
      };
    }
  });
  component.computedLocalSettings = null;
  return component;
};
