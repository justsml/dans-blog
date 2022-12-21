import React from "react";
import PropTypes from "prop-types";

export default function ResponsiveImage({ alt, srcSetWebp, srcSet, src, style, className }) {
  return (
    <picture aria-label={alt} className={className} style={style}>
      {srcSetWebp && <source type="image/webp" srcSet={srcSetWebp} />}
      {srcSet && <source srcSet={srcSet} />}
      <img src={src} alt={alt} />
    </picture>
  );
}

ResponsiveImage.propTypes = {
  alt: PropTypes.string.isRequired,
  style: PropTypes.object,
  className: PropTypes.string,
  srcSetWebp: PropTypes.string,
  srcSet: PropTypes.string,
  src: PropTypes.string.isRequired
};
