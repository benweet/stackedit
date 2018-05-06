import bezierEasing from 'bezier-easing';

const easings = {
  materialIn: bezierEasing(0.75, 0, 0.8, 0.25),
  materialOut: bezierEasing(0.25, 0.8, 0.25, 1),
  inOut: bezierEasing(0.25, 0.1, 0.67, 1),
};

const vendors = ['moz', 'webkit'];
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; x += 1) {
  window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
  window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`] ||
    window[`${vendors[x]}CancelRequestAnimationFrame`];
}

const transformStyles = [
  'WebkitTransform',
  'MozTransform',
  'msTransform',
  'OTransform',
  'transform',
];

const transitionEndEvents = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  msTransition: 'MSTransitionEnd',
  OTransition: 'oTransitionEnd',
  transition: 'transitionend',
};

function getStyle(styles) {
  const elt = document.createElement('div');
  return styles.reduce((result, style) => {
    if (elt.style[style] === undefined) {
      return undefined;
    }
    return style;
  }, undefined);
}

const transformStyle = getStyle(transformStyles);
const transitionStyle = getStyle(Object.keys(transitionEndEvents));
const transitionEndEvent = transitionEndEvents[transitionStyle];

function identity(x) {
  return x;
}

function ElementAttribute(name) {
  this.name = name;
  this.setStart = (animation) => {
    const value = animation.elt[name];
    animation.$start[name] = value;
    return value !== undefined && animation.$end[name] !== undefined;
  };
  this.applyCurrent = (animation) => {
    animation.elt[name] = animation.$current[name];
  };
}

function StyleAttribute(name, unit, defaultValue, wrap = identity) {
  this.name = name;
  this.setStart = (animation) => {
    let value = parseFloat(animation.elt.style[name]);
    if (Number.isNaN(value)) {
      value = animation.$current[name] || defaultValue;
    }
    animation.$start[name] = value;
    return animation.$end[name] !== undefined;
  };
  this.applyCurrent = (animation) => {
    animation.elt.style[name] = wrap(animation.$current[name]) + unit;
  };
}

function TransformAttribute(name, unit, defaultValue, wrap = identity) {
  this.name = name;
  this.setStart = (animation) => {
    let value = animation.$current[name];
    if (value === undefined) {
      value = defaultValue;
    }
    animation.$start[name] = value;
    if (animation.$end[name] === undefined) {
      animation.$end[name] = value;
    }
    return value !== undefined;
  };
  this.applyCurrent = (animation) => {
    const value = animation.$current[name];
    return value !== defaultValue && `${name}(${wrap(value)}${unit})`;
  };
}

const attributes = [
  new ElementAttribute('scrollTop'),
  new ElementAttribute('scrollLeft'),
  new StyleAttribute('opacity', '', 1),
  new StyleAttribute('zIndex', '', 0),
  new TransformAttribute('translateX', 'px', 0, Math.round),
  new TransformAttribute('translateY', 'px', 0, Math.round),
  new TransformAttribute('scale', '', 1),
  new TransformAttribute('rotate', 'deg', 0),
].concat([
  'width',
  'height',
  'top',
  'right',
  'bottom',
  'left',
].map(name => new StyleAttribute(name, 'px', 0, Math.round)));

class Animation {
  constructor(elt) {
    this.elt = elt;
    this.$current = {};
    this.$pending = {};
  }

  start(param1, param2, param3) {
    let endCb = param1;
    let stepCb = param2;
    let useTransition = false;
    if (typeof param1 === 'boolean') {
      useTransition = param1;
      endCb = param2;
      stepCb = param3;
    }

    this.stop();
    this.$start = {};
    this.$end = this.$pending;
    this.$pending = {};
    this.$attributes = attributes.filter(attribute => attribute.setStart(this));
    this.$end.duration = this.$end.duration || 0;
    this.$end.delay = this.$end.delay || 0;
    this.$end.easing = easings[this.$end.easing] || easings.materialOut;
    this.$end.endCb = typeof endCb === 'function' && endCb;
    this.$end.stepCb = typeof stepCb === 'function' && stepCb;
    this.$startTime = Date.now() + this.$end.delay;
    if (!this.$end.duration) {
      this.loop(false);
    } else if (useTransition) {
      this.loop(true);
    } else {
      this.$requestId = window.requestAnimationFrame(() => this.loop(false));
    }
    return this.elt;
  }

  stop() {
    window.cancelAnimationFrame(this.$requestId);
  }

  loop(useTransition) {
    const onTransitionEnd = (evt) => {
      if (evt.target === this.elt) {
        this.elt.removeEventListener(transitionEndEvent, onTransitionEnd);
        const { endCb } = this.$end;
        this.$end.endCb = undefined;
        if (endCb) {
          endCb();
        }
      }
    };

    let progress = (Date.now() - this.$startTime) / this.$end.duration;
    let transition = '';
    if (useTransition) {
      progress = 1;
      const transitions = [
        'all',
        `${this.$end.duration}ms`,
        this.$end.easing.toCSS(),
      ];
      if (this.$end.delay) {
        transitions.push(`${this.$end.duration}ms`);
      }
      transition = transitions.join(' ');
      if (this.$end.endCb) {
        this.elt.addEventListener(transitionEndEvent, onTransitionEnd);
      }
    } else if (progress < 1) {
      this.$requestId = window.requestAnimationFrame(() => this.loop(false));
      if (progress < 0) {
        return;
      }
    } else if (this.$end.endCb) {
      this.$requestId = window.requestAnimationFrame(this.$end.endCb);
    }

    const coeff = this.$end.easing.get(progress);
    const transforms = this.$attributes.reduce((result, attribute) => {
      if (progress < 1) {
        const diff = this.$end[attribute.name] - this.$start[attribute.name];
        this.$current[attribute.name] = this.$start[attribute.name] + (diff * coeff);
      } else {
        this.$current[attribute.name] = this.$end[attribute.name];
      }
      const transform = attribute.applyCurrent(this);
      if (transform) {
        result.push(transform);
      }
      return result;
    }, []);

    if (transforms.length) {
      transforms.push('translateZ(0)'); // activate GPU
    }
    const transform = transforms.join(' ');
    this.elt.style[transformStyle] = transform;
    this.elt.style[transitionStyle] = transition;
    if (this.$end.stepCb) {
      this.$end.stepCb();
    }
  }
}

attributes.map(attribute => attribute.name).concat('duration', 'easing', 'delay')
  .forEach((name) => {
    Animation.prototype[name] = function setter(val) {
      this.$pending[name] = val;
      return this;
    };
  });

function animate(elt) {
  if (!elt.$animation) {
    elt.$animation = new Animation(elt);
  }
  return elt.$animation;
}

export default {
  animate,
};
