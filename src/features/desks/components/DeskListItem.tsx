// todo: move it to redux store
export interface Desk {
  id: string;
  name: string;
}

export interface DeskListItemProps extends Desk {
  actionButtons?: ActionButton[];
}

export interface ActionButton {
  text: string;
  onClick: () => any;
}

export const DeskListItem = ({
  id,
  name,
  actionButtons,
}: DeskListItemProps) => {
  const showActionButtons = actionButtons && actionButtons.length > 0;

  return (
    <div style={styles.wrapperStyle}>
      <div style={styles.infoCellStyle}>
        <div>{id}</div>
        <div>{name}</div>
      </div>
      {showActionButtons && (
        <div>
          {actionButtons?.map(({ text, onClick }) => (
            <button onClick={onClick}>{text}</button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapperStyle: {
    display: "flex",
    border: "1px solid aqua",
  },
  infoCellStyle: {
    textAlign: "center" as const,
  },
};
