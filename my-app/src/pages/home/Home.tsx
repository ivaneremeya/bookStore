import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BookCard } from "../../entities/book-card/books-card/BookCard";
import { useAppDispatch, useAppSelector } from "../../app/store/hook";
import { Book } from "../books/ui/TypeBooks";
import { fetchBooks } from "../books/api/ApiBooks";
import { Loader } from "../../shared/ui/Loader/Loader";
import styles from "./home.module.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  const books: Book[] = useAppSelector((state) => state.bookList.books);
  const [isLoading, setLoadingnt] = React.useState(false);
  const { t } = useTranslation(["error"]);

  React.useEffect(() => {
    if (!books.length) {
      dispatch(fetchBooks({ errorMessage: t("error:BookError") })).then(() => {
        setLoadingnt(true);
      });
    } else {
      setLoadingnt(true);
    }
  }, [books, dispatch]);

  return (
    <div>
      {isLoading ? (
        <Carousel
          animation="slide"
          indicators
          navButtonsAlwaysVisible
          navButtonsAlwaysInvisible={false}
          cycleNavigation
          fullHeightHover={false}
          sx={{
            // maxWidth: "600px",
            flexGrow: 1,
            margin: "auto",
            mt: 5,
          }}
        >
          {books.map((item) => (
            <Paper
              key={item.id}
              sx={{
                position: "relative",
                backgroundColor: "grey.100",
                color: "#fff",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                p: 4,
              }}
              elevation={10}
              className={styles.fadeIn}
            >
              <BookCard
                id={item.id}
                price={item.price}
                descr={item.description}
                title={item.title}
              />
            </Paper>
          ))}
        </Carousel>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Home;
