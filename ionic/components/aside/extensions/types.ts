import {Aside} from 'ionic/components/aside/aside';
import {CSS} from 'ionic/util/dom'

// TODO use setters instead of direct dom manipulation
const asideManipulator = {
  setSliding(sliding) {
    this.aside.getNativeElement().classList[sliding ? 'add' : 'remove']('no-transition');
  },
  setOpen(open) {
    this.aside.getNativeElement().classList[open ? 'add' : 'remove']('open');
  },
  setTransform(t) {
    if(t === null) {
      this.aside.getNativeElement().style[CSS.transform] = '';
    } else {
      this.aside.getNativeElement().style[CSS.transform] = 'translate3d(' + t + 'px,0,0)';
    }
  }
}
const contentManipulator = {
  setSliding(sliding) {
    this.aside.contentElement.classList[sliding ? 'add' : 'remove']('no-transition');
  },
  setOpen(open) {
    this.aside.contentElement.classList[open ? 'add' : 'remove'](
      `aside-open-${this.aside.side}`
    )
  },
  setTransform(t) {
    if(t === null) {
      this.aside.contentElement.style[CSS.transform] = '';
    } else {
      this.aside.contentElement.style[CSS.transform] = 'translate3d(' + t + 'px,0,0)';
    }
  }
}

const backdropManipulator = {
  setSliding(sliding) {
    this.aside.backdrop.isTransitioning = sliding;
    //.classList[sliding ? 'add' : 'remove']('no-transition');
  },
  setOpen(open) {
    console.log('Setting open', open);
    let amt = open ? 0.6 : 0;
    this.aside.backdrop.backgroundColor = 'rgba(0,0,0,' + amt + ')';
  },
  setTransform(t) {
    console.log('TRANSFORM', t);
    if(t === null) {
      t = this.aside.width();
    }
    let fade = 0.6 * t / this.aside.width();
    this.aside.backdrop.backgroundColor = 'rgba(0,0,0,' + fade + ')';
  }
}

export class AsideType {
  constructor(aside: Aside) {
    this.aside = aside;

    setTimeout(() => {
      aside.contentElement.classList.add('aside-content')
    })
  }
}

export class AsideTypeOverlay extends AsideType {
  setSliding(sliding) {
    asideManipulator.setSliding.call(this, sliding);
    backdropManipulator.setSliding.call(this, sliding);
  }
  setOpen(open) {
    asideManipulator.setOpen.call(this, open);
    backdropManipulator.setOpen.call(this, open);
  }
  setTransform(t) {
    asideManipulator.setTransform.call(this, t);
    backdropManipulator.setTransform.call(this, t);
  }
}

export class AsideTypePush extends AsideType {
  setSliding(sliding) {
    asideManipulator.setSliding.call(this, sliding);
    contentManipulator.setSliding.call(this, sliding);
  }
  setOpen(open) {
    asideManipulator.setOpen.call(this, open);
    contentManipulator.setOpen.call(this, open);
  }
  setTransform(t) {
    asideManipulator.setTransform.call(this, t);
    contentManipulator.setTransform.call(this, t);
  }
}

export class AsideTypeReveal extends AsideType {
  setSliding(sliding) {
    contentManipulator.setSliding.call(this, sliding);
  }
  setOpen(sliding) {
    contentManipulator.setOpen.call(this, sliding);
  }
  setTransform(t) {
    contentManipulator.setTransform.call(this, t);
  }
}
