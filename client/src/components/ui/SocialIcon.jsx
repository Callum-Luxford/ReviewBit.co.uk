function SocialIcon({ href = "#", Icon, label }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="
        group inline-flex items-center justify-center
        w-10 h-10 rounded-xl
        border border-white/10
        bg-white/5 backdrop-blur-md
        hover:bg-white/10
        transition-all duration-300
      "
    >
      <Icon className="text-text_clr_1 opacity-90 group-hover:opacity-100 transition" />
    </a>
  );
}

export default SocialIcon;

// function SocialIcon({ href = "#", image, label }) {
//   return (
//     <a
//       href={href}
//       aria-label={label}
//       target="_blank"
//       rel="noreferrer"
//       className="inline-flex items-center justify-center"
//     >
//       <div
//         className="h-10 w-10 icon-gradient"
//         style={{ "--icon-mask": `url(${image})` }}
//       />
//     </a>
//   );
// }

// export default SocialIcon;

