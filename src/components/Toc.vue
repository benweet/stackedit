<template>
  <div class="toc">
    <div class="toc__mask" :style="{top: (maskY - 5) + 'px'}"></div>
    <div class="toc__inner"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import editorSvc from '../services/editorSvc';

export default {
  data: () => ({
    maskY: 0,
  }),
  computed: {
    ...mapGetters('layout', [
      'styles',
    ]),
  },
  mounted() {
    const tocElt = this.$el.querySelector('.toc__inner');

    // TOC click behaviour
    let isMousedown;
    function onClick(e) {
      if (!isMousedown) {
        return;
      }
      e.preventDefault();
      const y = e.clientY - tocElt.getBoundingClientRect().top;

      editorSvc.sectionDescList.some((sectionDesc) => {
        if (y >= sectionDesc.tocDimension.endOffset) {
          return false;
        }
        const posInSection = (y - sectionDesc.tocDimension.startOffset)
          / (sectionDesc.tocDimension.height || 1);
        const editorScrollTop = sectionDesc.editorDimension.startOffset
          + (sectionDesc.editorDimension.height * posInSection);
        editorSvc.editorElt.parentNode.scrollTop = editorScrollTop;
        const previewScrollTop = sectionDesc.previewDimension.startOffset
          + (sectionDesc.previewDimension.height * posInSection);
        editorSvc.previewElt.parentNode.scrollTop = previewScrollTop;
        return true;
      });
    }

    tocElt.addEventListener('mouseup', () => {
      isMousedown = false;
    });
    tocElt.addEventListener('mouseleave', () => {
      isMousedown = false;
    });
    tocElt.addEventListener('mousedown', (e) => {
      isMousedown = e.which === 1;
      onClick(e);
    });
    tocElt.addEventListener('mousemove', (e) => {
      onClick(e);
    });

    // Change mask postion on scroll
    const updateMaskY = () => {
      const scrollPosition = editorSvc.getScrollPosition();
      if (scrollPosition) {
        const sectionDesc = editorSvc.sectionDescList[scrollPosition.sectionIdx];
        this.maskY = sectionDesc.tocDimension.startOffset +
          (scrollPosition.posInSection * sectionDesc.tocDimension.height);
      }
    };

    Vue.nextTick(() => {
      editorSvc.editorElt.parentNode.addEventListener('scroll', () => {
        if (this.styles.showEditor) {
          updateMaskY();
        }
      });
      editorSvc.previewElt.parentNode.addEventListener('scroll', () => {
        if (!this.styles.showEditor) {
          updateMaskY();
        }
      });
    });
  },
};
</script>

<style lang="scss">
.toc__inner {
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  font-size: 10px;
  padding: 10px 20px 40px;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  * {
    font-weight: inherit;
    pointer-events: none;
  }

  .cl-toc-section {
    * {
      margin: 0.2em 0;
      padding: 0.2em 0;
      border-bottom: 0;
    }

    h2 {
      margin-left: 8px;
    }

    h3 {
      margin-left: 16px;
    }

    h4 {
      margin-left: 24px;
    }

    h5 {
      margin-left: 32px;
    }

    h6 {
      margin-left: 40px;
    }
  }
}

.toc__mask {
  position: absolute;
  left: 0;
  width: 100%;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.05);
  pointer-events: none;
}
</style>
