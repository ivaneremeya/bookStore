import React from "react";
import ContentLoader from "react-content-loader";

const InputLoader: React.FC = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="173" cy="57" r="2" />
    <circle cx="154" cy="125" r="2" />
    <rect x="83" y="341" rx="0" ry="0" width="1" height="0" />
    <rect x="99" y="330" rx="0" ry="0" width="2" height="0" />
    <rect x="99" y="340" rx="0" ry="0" width="2" height="2" />
    <rect x="99" y="322" rx="0" ry="0" width="0" height="2" />
    <rect x="87" y="398" rx="0" ry="0" width="1" height="1" />
    <rect x="41" y="10" rx="10" ry="10" width="187" height="44" />
    <rect x="41" y="80" rx="10" ry="10" width="187" height="44" />
    <rect x="41" y="143" rx="10" ry="10" width="187" height="44" />
    <rect x="44" y="344" rx="10" ry="10" width="187" height="44" />
    <rect x="44" y="214" rx="10" ry="10" width="187" height="44" />
    <rect x="44" y="280" rx="10" ry="10" width="187" height="44" />
    <rect x="44" y="409" rx="10" ry="10" width="187" height="44" />
  </ContentLoader>
);

export default InputLoader;
