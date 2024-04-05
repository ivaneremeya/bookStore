import React, { useMemo } from "react";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import styles from "./pagination.module.scss";

interface Props {
  pageCount: number;
  onPageChange: (selected: number) => void;
  forcePage: number;
}

export const CustomPagination = React.memo(
  ({ pageCount, onPageChange, forcePage }: Props) => {
    const iconProviderValueLeft = useMemo(
      () => ({ color: "#B8C1CC", size: "36px" }),
      [],
    );
    const iconProviderValueRight = useMemo(
      () => ({ color: "#B8C1CC", size: "36px" }),
      [],
    );

    return (
      <div className={styles.pagination__container}>
        <ReactPaginate
          containerClassName={styles.pagination}
          pageClassName={styles.page__item}
          activeClassName={styles.active}
          onPageChange={(event: { selected: number }) =>
            onPageChange(event.selected)
          }
          pageRangeDisplayed={6}
          pageCount={pageCount}
          forcePage={forcePage}
          renderOnZeroPageCount={null}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={iconProviderValueLeft}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={iconProviderValueRight}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>
    );
  },
);
