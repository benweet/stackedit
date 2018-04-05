const zero = {
  markdown: {
    abbr: false,
    breaks: false,
    deflist: false,
    del: false,
    fence: false,
    footnote: false,
    linkify: false,
    sub: false,
    sup: false,
    table: false,
    typographer: false,
  },
  emoji: {
    enabled: false,
    shortcuts: false,
  },
  katex: {
    enabled: false,
  },
  mermaid: {
    enabled: false,
  },
};

export default {
  zero: [zero],
  commonmark: [zero, {
    markdown: {
      fence: true,
    },
  }],
  gfm: [zero, {
    markdown: {
      breaks: true,
      del: true,
      fence: true,
      linkify: true,
      table: true,
    },
    emoji: {
      enabled: true,
    },
  }],
  default: [zero, {
    markdown: {
      abbr: true,
      breaks: true,
      deflist: true,
      del: true,
      fence: true,
      footnote: true,
      linkify: true,
      sub: true,
      sup: true,
      table: true,
      typographer: true,
    },
    emoji: {
      enabled: true,
    },
    katex: {
      enabled: true,
    },
    mermaid: {
      enabled: true,
    },
  }],
};
