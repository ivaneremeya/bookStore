import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/store/hook";
import { fetchAutors, setPage } from "../model/AutorListSlice";
import { CustomPagination } from "../../../shared/pagination/Pagination";
import Skeleton from "../../../shared/ui/skileton/Skeleton";
import { AutorItem } from "../../../entities/Autor-Item/AutorItem";
import styles from "../../books/ui/books.module.scss";

const AutorsListPage: React.FC = () => {
  const navigate = useNavigate();
  const postNumber = 6;
  const { autors, isLoading, page } = useAppSelector(
    (state) => state.autorList,
  );

  const dispatch = useAppDispatch();

  const handlePageChange = (selected: number) => {
    dispatch(setPage(selected + 1));

    navigate(`?page=${selected + 1}`, { replace: true });
  };

  const currentPageNumber = page * postNumber - postNumber;
  const paginatedPosts = [...autors].splice(currentPageNumber, postNumber);

  React.useEffect(() => {
    dispatch(fetchAutors());
  }, [dispatch]);

  return (
    <div className={styles.books__autor}>
      <div className={styles.books__list}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : paginatedPosts.map((item) => (
              <AutorItem
                key={item.id}
                id={item.id}
                firstName={item.first_name}
                secondName={item.second_name}
              />
            ))}
      </div>
      <CustomPagination
        pageCount={4}
        onPageChange={(selected: number) => handlePageChange(selected)}
        forcePage={0}
      />
    </div>
  );
};
export default AutorsListPage;
