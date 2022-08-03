import React, {
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import useCheckScreen from "../../hooks/useCheckScreen";
import styles from "./Carousel.module.css";

interface CarouselProps<T> {
  data: T[];
  selectedId: string,
  renderItem: (item: T) => JSX.Element;
  numItemsDesktop: number;
  numItemsMobile: number;
}

type AnyType = {
  Id: string,
  [key: string]: unknown
}

export function Carousel<T extends AnyType>({
  data,
  renderItem,
  numItemsDesktop,
  numItemsMobile,
  selectedId
}: CarouselProps<T>) {
  const gap = 18;
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const [elRefs, setElRefs] = React.useState<
    React.MutableRefObject<HTMLDivElement>[]
  >([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobileView = useCheckScreen();
  const numItems = isMobileView ? numItemsMobile : numItemsDesktop;

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(data.length)
        .fill(0)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [data]);

  useEffect(() => {
    const slidesContainer = slidesContainerRef.current;
    const el = elRefs[currentSlide]?.current;
    if (slidesContainer && el) {
      const posX = el.offsetLeft - slidesContainer.offsetLeft;
      slidesContainer.scrollTo({ left: posX, top: 0, behavior: 'smooth' });
    }
  }, [currentSlide, elRefs]);

  useEffect(() => {
    setCurrentSlide(
      Math.min(Math.max(currentSlide, 0), data.length - numItems)
    );
  }, [currentSlide, data.length, isMobileView, numItems]);

  const prev = () => {
    setCurrentSlide(Math.max(currentSlide - 1, 0))
  };

  const next = () => {
    setCurrentSlide(Math.min(currentSlide + 1, data.length - numItems));
  }

  const caculateImageWidth = () => {
    return `calc((100% - ${gap * (numItems - 1)}px) / ${numItems})`
  }

  return (
    <div>
      <div className={styles.slider}>
        {currentSlide > 0 && (
          <div className={styles["left-btn"]} onClick={prev}>
            {`<`}
          </div>
        )}
        {currentSlide < data.length - numItems && (
          <div className={styles["right-btn"]} onClick={next}>
            {`>`}
          </div>
        )}
        <div ref={slidesContainerRef} className={styles.slides} style={{ gap }}>
          {data.map((item, index) => (
            <div
              className={selectedId === item.Id ? styles.selected : styles.card}
              ref={elRefs[index]}
              key={index}
              style={{ width: caculateImageWidth() }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
