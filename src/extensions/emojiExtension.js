import markdownItEmoji from 'markdown-it-emoji';
import extensionSvc from '../services/extensionSvc';

extensionSvc.onGetOptions((options, properties) => {
  options.emoji = properties.extensions.emoji.enabled;
  options.emojiShortcuts = properties.extensions.emoji.shortcuts;
});

extensionSvc.onInitConverter(1, (markdown, options) => {
  if (options.emoji) {
    markdown.use(markdownItEmoji, options.emojiShortcuts ? {} : { shortcuts: {} });
  }
});
