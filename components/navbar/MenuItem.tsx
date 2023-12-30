interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem = ({ onClick, label }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="text-sm px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuItem;
