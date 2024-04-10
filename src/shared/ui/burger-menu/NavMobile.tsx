import React from "react";
import { Link } from "react-router-dom";
import styles from "./burger.module.scss";
import { useOutsideClick } from "../../hook/useClickOutside";

export const NavMobile = () => {
  const [isOpen, setOpen] = React.useState(false);
  const menuRef = React.useRef(null);

  const handleOpen = () => setOpen(!isOpen);

  useOutsideClick(menuRef, () => setOpen(false));

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <li>
          <Link to="/AutorListPage" className={styles.menuItem}>
            authors
          </Link>
        </li>
        <li>
          <Link to="/cart" className={styles.menuItem}>
            cart
          </Link>
        </li>
        <li>
          <Link to="/BooksList?page=1" className={styles.menuItem}>
            books
          </Link>
        </li>
      </ul>
      <button type="button" onClick={handleOpen} className={styles.hamburger}>
        <i className="menuIcon material-icons">menu</i>
      </button>
    </div>
  );
};
