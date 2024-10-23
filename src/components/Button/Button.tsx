export default function Button({ onClick, children, style }: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      className="rounded bg-slate-500 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white"
      style={{
        ...(style || {}),
      }}
    >
      {children}
    </button>
  );
}
