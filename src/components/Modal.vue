<template>
  <div class="modal" v-focus @keyup.esc="setContent()">
    <div class="modal__inner-1">
      <div class="modal__inner-2">
        <div class="modal__content-text" v-html="content.text"></div>
        <div class="modal__button-bar">
          <button v-for="button in content.buttons" :key="button.text" class="button" @click="button.onClick()">{{button.text}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  directives: {
    focus: {
      inserted(el) {
        const eltToFocus = el.querySelector('input.text-input') || el.querySelector('button.button');
        if (eltToFocus) {
          eltToFocus.focus();
        }
      },
    },
  },
  computed: mapState('modal', [
    'content',
  ]),
  methods: {
    ...mapMutations('modal', [
      'setContent',
    ]),
    hideOnExternalEvent(evt) {
      if (this.content) {
        const modalInner = this.$el.querySelector('.modal__inner-2');
        let target = evt.target;
        while (target) {
          if (target === modalInner) {
            return;
          }
          target = target.parentNode;
        }
        this.setContent();
      }
    },
  },
  mounted() {
    window.addEventListener('focusin', this.hideOnExternalEvent);
  },
  destroyed() {
    window.removeEventListener('focusin', this.hideOnExternalEvent);
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(192, 192, 192, 0.8);
  overflow: auto;
}

.modal__inner-1 {
  margin: 0 auto;
  display: table;
  min-width: 320px;
  max-width: 500px;
}

.modal__inner-2 {
  margin: 50px 10px;
  background-color: #fff;
  padding: 25px 50px;
  border-radius: $border-radius-base;
}

.modal__button-bar {
  margin-top: 1.75rem;
  text-align: right;

  .button {
    margin-left: 5px;
  }
}
</style>
