export default function ProofStripCard({
  image,
  title,
  children,
  className = "",
}) {
  return (
    <div
      className={[
        // gradient border layer
        "rb-border-only rounded-lg",
        className,
      ].join(" ")}
    >
      <div
        className={[
          // actual card body
          "rounded-xl h-full w-full text-center shadow-md",
          "p-4",
        ].join(" ")}
      >
        <div className="flex flex-col items-center gap-2">
          {" "}
          <div
            className="h-10 w-10 icon-gradient"
            style={{ "--icon-mask": `url(${image})` }}
          />
          <div className="flex flex-col gap-1">
            <h3 className="text-text_clr_1 font-semibold text-lg">{title}</h3>
            <div className="text-text_clr_1 text-md">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
