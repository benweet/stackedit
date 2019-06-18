<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <input class="hidden-file" id="import-backup-file-input" type="file" @change="onImportBackup">
    <label class="menu-entry button flex flex--row flex--align-center" for="import-backup-file-input">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-content-save></icon-content-save>
      </div>
      <div class="flex flex--column">
        Import workspace backup
      </div>
    </label>
    <menu-entry @click.native="exportWorkspace">
      <icon-content-save slot="icon"></icon-content-save>
      Export workspace backup
    </menu-entry>
  </div>
</template>

<script>
import MenuEntry from './common/MenuEntry';
import utils from '../../services/utils';
import store from '../../store';
import backupSvc from '../../services/backupSvc';

export default {
  components: {
    MenuEntry,
  },
  methods: {
    onImportBackup(evt) {
      const file = evt.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target.result;
          if (text.match(/\uFFFD/)) {
            store.dispatch('notification/error', 'File is not readable.');
          } else {
            backupSvc.importBackup(text);
          }
        };
        const blob = file.slice(0, 10000000);
        reader.readAsText(blob);
      }
    },
    exportWorkspace() {
      window.location.href = utils.addQueryParams('app', {
        ...utils.queryParams,
        exportWorkspace: true,
      }, true);
      window.location.reload();
    },
  },
};
</script>
