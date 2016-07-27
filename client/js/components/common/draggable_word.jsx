import React            from "react";
import { DragSource }   from "react-dnd";

import Word             from "./word";
import ItemTypes        from "./draggable_item_types";

const wordSource = {
  beginDrag(props) {
    return {
      itemId: props.id
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

export class DraggableWord extends React.Component {
  static propTypes = {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  };

  render() {
    const { style, connectDragSource, isDragging } = this.props;
    const baseStyle = { display: "inline-block", opacity: isDragging ? 0 : 1, cursor: 'move' };

    return connectDragSource(
      <div className="draggable-word" style={{ ...style, ...baseStyle}}>
        <Word material={this.props.material} />
      </div>
    );
  }
}

export default DragSource(ItemTypes.WORD, wordSource, collect)(DraggableWord);