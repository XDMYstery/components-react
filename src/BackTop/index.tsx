import classNames from 'classnames';
import omit from 'omit.js';
import * as React from 'react';
import './style/index';

const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
  }
};

export interface IBackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  target?: HTMLElement;
  className?: string;
  style?: React.CSSProperties;
}
export interface IBackTopState {
  visible: boolean;
}

class BackTop extends React.Component<IBackTopProps, IBackTopState> {
  public static defaultProps: IBackTopProps = {
    visibilityHeight: 400,
    target: document.documentElement,
  };
  public scrollEvent: any;
  public state: IBackTopState = {
    visible: false,
  };
  public componentDidMount(): void {
    this.scrollEvent = this.props.target.addEventListener('scroll', this.handleScroll);
  }
  public componentWillUnmount(): void {
    this.props.target.removeEventListener('scroll', this.scrollEvent);
  }
  public scrollToTop = (e: React.MouseEvent<HTMLDivElement>): void => {
    const scrollTop = this.props.target.scrollTop;
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        window.requestAnimationFrame(frameFunc);
      } else {
        this.setScrollTop(0);
      }
    };
    window.requestAnimationFrame(frameFunc);
    if (this.props.onClick) { (this.props.onClick)(e); }
  }
  public setScrollTop(value: number): void {
    this.props.target.scrollTop = value;
  }
  public handleScroll = (): void => {
    this.setState({
      visible: this.props.target.scrollTop > this.props.visibilityHeight,
    });
  }
  public render(): React.ReactNode {
    if (this.state.visible) {
      const divProps = omit(this.props, [
        'children',
        'visibilityHeight',
        'onClick',
        'target',
        'className',
      ]);
      return (
        <div {...divProps} className={classNames('xdusa-back-top', this.props.className)} onClick={this.scrollToTop}>
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}

export default BackTop;
