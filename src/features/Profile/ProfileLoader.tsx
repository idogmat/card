import ContentLoader from "react-content-loader";

export const ProfileLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={420}
      height={400}
      viewBox="0 0 420 400"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="100" y="198" rx="0" ry="0" width="200" height="23" />
      <rect x="130" y="228" rx="0" ry="0" width="140" height="17" />
      <rect x="140" y="257" rx="15" ry="15" width="120" height="41" />
      <circle cx="200" cy="115" r="77" />
    </ContentLoader>
  );
};
