export default function ResponsiveBlocker() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black md:hidden">
      <div className="px-4 text-center text-white">
        <h1 className="mb-4 text-3xl font-bold">Please use a desktop device</h1>
        <p className="text-lg">
          This content is only available on larger screens.
        </p>
      </div>
    </div>
  );
}
