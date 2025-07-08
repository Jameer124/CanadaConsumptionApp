export default function Loading() {
  return (
    <>
      <div id="loader-2">
        <div className="loading">
          <div className="arc"></div>
          <div className="arc"></div>
          <div className="arc"></div>
        </div>
        <span>Loading...</span>
      </div>
      <div className="overlay"></div>
    </>
  );
}
