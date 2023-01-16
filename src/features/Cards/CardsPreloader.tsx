import ContentLoader from "react-content-loader";

export const CardsPreloader = () => {
  return (
    <ContentLoader
      speed={2}
      width={1280}
      height={500}
      viewBox="0 0 1280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      overflow={"auto"}
    >
      <rect x="0" y="23" rx="6" ry="6" width="1262" height="55" />
      <rect x="0" y="85" rx="6" ry="6" width="1262" height="80" />
      <rect x="-1" y="174" rx="6" ry="6" width="1262" height="80" />
      <rect x="0" y="264" rx="6" ry="6" width="1262" height="80" />
      <rect x="0" y="355" rx="6" ry="6" width="1262" height="80" />

      <rect x="0" y="464" rx="2" ry="2" width="269" height="26" />
    </ContentLoader>
  );
};
