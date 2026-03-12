type Position = "left" | "right";
type BgDiamondsProps = {
  diamondSide?: Position;
  ticksSide?: Position;
  showDiamond?: boolean;
  showTicks?: boolean;
  showHlinesTopRight?: boolean;
  showHlinesBottomLeft?: boolean;
  showSlants?: boolean;
};

export default function BackgroundDiamonds({
  diamondSide = "right",
  ticksSide = "left",
  showDiamond = true,
  showTicks = true,

  showHlinesTopRight = true,
  showHlinesBottomLeft = true,

  showSlants = true,
}: BgDiamondsProps) {
  const sideClass =
    diamondSide === "left" ? "bg-decor--left" : "bg-decor--right";
  const ticksClass =
    ticksSide === "right" ? "bg-ticks--right" : "bg-ticks--left";

  return (
    <div className="pointer-events-none fixed inset-0 w-screen overflow-x-clip overflow-y-hidden">
      <div className={`bg-decor ${sideClass}`}>
        <div className="bg-frame">
          {/* Accents */}
          {showTicks && (
            <div className={`bg-ticks ${ticksClass}`}>
              {/* ✅ more ticks */}
              <span className="bg-tick" />
              <span className="bg-tick" />
              <span className="bg-tick" />
              <span className="bg-tick" />
              <span className="bg-tick" />
              <span className="bg-tick" />
              <span className="bg-tick" />
            </div>
          )}

          {showHlinesTopRight && (
            <div className="bg-hlines bg-hlines--top-right">
              <span className="bg-hline bg-hline--cyan" />
              <span className="bg-hline bg-hline--purple" />
            </div>
          )}

          {showHlinesBottomLeft && (
            <div className="bg-hlines bg-hlines--bottom-left">
              <span className="bg-hline bg-hline--cyan" />
              <span className="bg-hline bg-hline--purple" />
            </div>
          )}

          {showSlants && (
            <div className="bg-lines--right">
              <span className="bg-line" />
              <span className="bg-line bg-line--thin" />
            </div>
          )}
        </div>
        {/* ✅ ONE diamond per section */}
        {showDiamond && <div className="bg-shape" />}
      </div>
    </div>
  );
}
