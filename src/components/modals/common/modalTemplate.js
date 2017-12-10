import ModalInner from './ModalInner';
import FormEntry from './FormEntry';
import store from '../../../store';

const collator = new Intl.Collator(undefined, { sensitivity: 'base' });

export default (desc) => {
  const component = {
    ...desc,
    data: () => ({
      ...desc.data ? desc.data() : {},
      errorTimeouts: {},
    }),
    components: {
      ...desc.components || {},
      ModalInner,
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
      setError(name) {
        clearTimeout(this.errorTimeouts[name]);
        const formEntry = this.$el.querySelector(`.form-entry[error=${name}]`);
        if (formEntry) {
          formEntry.classList.add('form-entry--error');
          this.errorTimeouts[name] = setTimeout(() => {
            formEntry.classList.remove('form-entry--error');
          }, 1000);
        }
      },
    },
  };
  Object.entries(desc.computedLocalSettings || {}).forEach(([key, id]) => {
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
      component.computed.allTemplates = () => {
        const allTemplates = store.getters['data/allTemplates'];
        const sortedTemplates = {};
        Object.entries(allTemplates)
          .sort(([, template1], [, template2]) => collator.compare(template1.name, template2.name))
          .forEach(([templateId, template]) => {
            sortedTemplates[templateId] = template;
          });
        return sortedTemplates;
      };
      // Make use of `function` to have `this` bound to the component
      component.methods.configureTemplates = function () { // eslint-disable-line func-names
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
