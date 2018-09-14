import React, { PureComponent } from 'react';

// lib
import { Editor } from 'slate-react';
import { Value } from 'slate';
import { isKeyHotkey } from 'is-hotkey';
import { Button, Icon, ToolBar } from './components';

import CVHelper from '../../../../helper/cv.helper';

import {
  faBold,
  faItalic,
  faUnderline,
  faListUl
} from '@fortawesome/free-solid-svg-icons';

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

class TextEditor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(props.value.toJS()),
      showToolBar: false
    };
  }

  componentDidMount() {
    setTimeout(() => (this.enable = true), 1000);
  }

  hasMark = type => {
    const { value } = this.state;
    return value.activeMarks.some(mark => mark.type === type);
  };

  /**
   * Check if the any of the currently selected blocks are of `type`.
   */
  hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type === type);
  };

  onFocus() {
    this.setState({
      showToolBar: true
    });
    const { onFocus } = this.props;
    if (typeof onFocus === 'function') {
      CVHelper.newThread(onFocus);
    }
  }

  onBlur() {
    this.setState({
      showToolBar: false
    });
    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      CVHelper.newThread(onBlur);
    }
  }

  blur() {
    this.refEditor.blur();
  }

  focus() {
    this.refEditor.focus();
  }

  render() {
    const {
      placeholder,
      autoFocus,
      spellCheck,
      hasBold,
      hasItalic,
      hasUnderline,
      hasBulletedList
    } = this.props;

    // console.log('______________ TextEditor ______________');

    return (
      <div className="textEditor">
        <ToolBar show={this.state.showToolBar}>
          {hasBold && this.renderMarkButton('bold', faBold)}
          {hasItalic && this.renderMarkButton('italic', faItalic)}
          {hasUnderline && this.renderMarkButton('underlined', faUnderline)}
          {hasBulletedList && this.renderBlockButton('bulleted-list', faListUl)}
        </ToolBar>

        <Editor
          ref={ref => (this.refEditor = ref)}
          spellCheck={spellCheck}
          autoFocus={autoFocus}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          renderMark={this.renderMark}
        />
      </div>
    );
  }

  /**
   * Render a mark-toggling toolbar button.
   */
  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        <Icon icon={icon} />
      </Button>
    );
  };

  /**
   * Render a block-toggling toolbar button.
   */
  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value } = this.state;
      const parent = value.document.getParent(value.blocks.first().key);
      isActive = this.hasBlock('list-item') && parent && parent.type === type;
    }

    return (
      <Button
        active={isActive}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        <Icon icon={icon} />
      </Button>
    );
  };

  /**
   * Render a Slate node.
   */
  renderNode = props => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
    }
  };

  /**
   * Render a Slate mark.
   */
  renderMark = props => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
    }
  };

  /**
   * On change, save the new `value`.
   */
  onChange = ({ value }) => {
    if (value.document !== this.state.value.document) {
      if (typeof this.props.onChange === 'function' && this.enable) {
        clearTimeout(this.onChangeTimer);
        this.onChangeTimer = CVHelper.newThread(() => {
          this.props.onChange(this.state.value.toJSON());
        }, 0);
      }
    }

    this.setState({ value });
  };

  /**
   * On key down, if it's a formatting command toggle a mark.
   */
  onKeyDown = (event, change) => {
    let mark;

    if (isBoldHotkey(event)) {
      mark = 'bold';
    } else if (isItalicHotkey(event)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event)) {
      mark = 'code';
    } else {
      return;
    }

    event.preventDefault();
    change.toggleMark(mark);
    return true;
  };

  /**
   * When a mark button is clicked, toggle the current mark.
   */
  onClickMark = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  /**
   * When a block button is clicked, toggle the block type.
   */
  onClickBlock = (event, type) => {
    event.preventDefault();
    const { value } = this.state;
    const change = value.change();
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type);
      const isList = this.hasBlock('list-item');

      if (isList) {
        change
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else {
        change.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item');
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type);
      });

      if (isList && isType) {
        change
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list');
      } else if (isList) {
        change
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type);
      } else {
        change.setBlocks('list-item').wrapBlock(type);
      }
    }

    this.onChange(change);
  };
}

TextEditor.defaultProps = {
  placeholder: '',
  autoFocus: false,
  value: {},
  spellCheck: true,
  hasBold: true,
  hasItalic: true,
  hasUnderline: true,
  hasBulletedList: true
};

export default TextEditor;
