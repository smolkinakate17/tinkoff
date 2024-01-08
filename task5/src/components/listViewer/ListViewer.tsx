import { FunctionComponent } from "react";
import "./listViewer.css";

interface ListViewerProps {
  list: string[];
  setList: Function;
}

const ListViewer: FunctionComponent<ListViewerProps> = ({
  list,
  setList,
}: ListViewerProps) => {
  return (
    <div tabIndex={0} className="listviewer peer/tags">
      {list.map((item, i) => (
        <div key={`${i}-${item}-listItem`} className="tag">
          <div>{item}</div>
          <button
            type="button"
            onClick={() => setList(list.filter((x) => x !== item))}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListViewer;
