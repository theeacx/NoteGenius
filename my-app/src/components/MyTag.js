import React from 'react';

function MyTag(props) {
  const { text, color } = props;

  const tagStyle = {
    display: 'inline-block',
    padding: '3px 6px', /* Adjust the padding as needed */
    marginRight: '3px', /* Adjust the margin as needed */
    borderRadius: '3px', /* Adjust the border-radius as needed */
    backgroundColor: color || 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '0.8rem', /* Adjust the font size as needed */
  };

  return (
    <span style={tagStyle}>{text}</span>
  );
}

export default MyTag;
