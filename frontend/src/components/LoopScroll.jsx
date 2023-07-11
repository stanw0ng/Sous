import React, { useRef, useState, useEffect, useCallback } from 'react';
import '../styles/loop_scroll.scss';

const Loop = ({ outerStyle, innerStyle, children, dataReady, parentHeight }) => {
  const contentRef = useRef(null);
  const scrollRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [numDivs, setNumDivs] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      const scroll = scrollRef.current.scrollTop;
      const contentHeight = contentRef.current.offsetHeight;

      if (scroll >= height) {
        const expandedItemHeight = contentRef.current.children[expandedIndex]?.offsetHeight || 0;
        const totalHeight = contentHeight + expandedItemHeight;
        const scrollPosition = (scroll - height) % totalHeight;
        const targetScroll = scrollPosition >= 0 ? scrollPosition + height : scrollPosition;
        scrollRef.current.scrollTop = targetScroll;
      }
    }
  }, [scrollRef, height, contentRef, expandedIndex]);

  const updateHeight = useCallback(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.offsetHeight;
      setHeight(contentHeight);

      if (contentHeight > 0) {
        const numDivs = Math.ceil(parentHeight / contentHeight) + 1;
        setNumDivs(numDivs);

        if (expandedIndex !== null) {
          const expandedItemHeight = contentRef.current.children[expandedIndex].offsetHeight;
          scrollRef.current.scrollTop += expandedItemHeight - contentHeight;
        }
      } else {
        setNumDivs(1);
      }
    }
  }, [parentHeight, expandedIndex]);

  useEffect(() => {
    updateHeight();
  }, [updateHeight]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    if (contentRef.current && dataReady) {
      observer.observe(contentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [updateHeight, dataReady]);

  if (!dataReady) {
    return <div><h1>There's nothing left to show you!</h1></div>;
  }

  const clonedChildren = Array(numDivs)
    .fill()
    .map((_, index) => (
      <div key={`backup-${index}`}>{children}</div>
    ));

  return (
    <div className="infinite-scroll-loop-outer" style={outerStyle}>
      <div
        className="infinite-scroll-loop-inner"
        ref={scrollRef}
        style={innerStyle}
        onScroll={handleScroll}
      >
        {clonedChildren}
        <div ref={contentRef}>{children}</div>
        {clonedChildren}
      </div>
    </div>
  );
};

export default Loop;
