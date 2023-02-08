import React, { useEffect, useState } from 'react';
import { TextInput } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';

const CONTENT_FIELD_ID = 'content';
const WORDS_PER_MINUTE = 160;

const readingTime = (content) => {
  let wordCount = 0;
  content.content.forEach(
    (paragraph) => (wordCount += paragraph.content[0].value.split(' ').length)
  );
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
  return `${minutes} minute${minutes > 1 ? 's' : ''} read`;
};

const Field = () => {
  const sdk = useSDK();
  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];
  // const [blogText, setBlogText] = useState(contentField.getValue());

  // console.log('blogText', blogText);
  const [timeToRead, setTimeToRead] = useState('0 minutes read');

  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      // setBlogText(value);
      setTimeToRead(readingTime(value));
    });
    return () => detach();
  }, [contentField]);

  return (
    <>
      <TextInput name='time-read' value={timeToRead} readOnly={true} />
      <span>
        <small>small text</small>
      </span>
    </>
  );
};

export default Field;
