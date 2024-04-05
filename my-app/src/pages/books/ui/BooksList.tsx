import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Book } from "./TypeBooks";
import { FormSortBooks } from "../../../features/books/sort-books/FormSortBooks";
import { BookCard } from "../../../entities/book-card/books-card/BookCard";
import { CustomPagination } from "../../../shared/pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../../app/store/hook";
import { setPage } from "../model/reducer/slice/BookListSlice";
import { fethPaginationBooks } from "../api/ApiBooks";
import styles from "./books.module.scss";
import Skeleton from "../../../shared/ui/skileton/Skeleton";

const BooksList: React.FC = () => {
  const navigate = useNavigate();
  const { page, isLoading } = useAppSelector((state) => state.bookList);
  const perPage: number = 6;
  const { t } = useTranslation(["error"]);
  const dispatch = useAppDispatch();
  const handlePageChange = React.useCallback((selected: number) => {
    dispatch(setPage(selected + 1));
    const dataPage = {
      page: selected + 1,
      page_size: perPage,
      errorMsg: t("error:paginationError"),
    };
    dispatch(fethPaginationBooks(dataPage));
    navigate(`?page=${selected + 1}`, { replace: true });
  }, []);
  const books: Book[] = useAppSelector((state) => state.bookList.books);
  React.useEffect(() => {
    console.log("fethPaginationBooks");
    dispatch(
      fethPaginationBooks({
        page,
        page_size: perPage,
        errorMsg: t("error:paginationError"),
      }),
    );
  }, [page]);

  return (
    <>
      <div className={styles.books__container}>
        <FormSortBooks />
        <div className={styles.books__list}>
          {isLoading
            ? Array.from({ length: perPage }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : books.map((item) => (
                <BookCard
                  key={item.id}
                  id={item.id}
                  price={item.price}
                  title={item.title}
                  descr={item.description}
                />
              ))}
        </div>
      </div>
      <CustomPagination
        pageCount={4}
        onPageChange={handlePageChange}
        forcePage={0}
      />
    </>
  );
};
export default BooksList;
