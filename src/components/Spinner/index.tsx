import { FC } from 'react';
import styles from './spinner.module.scss';

const Spinner: FC = () => {
  return (
    <svg
      width="101"
      height="64"
      viewBox="0 0 101 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.spinner}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51 24C46.5817 24 43 27.5817 43 32C43 36.4183 46.5817 40 51 40C55.4183 40 59 36.4183 59 32C59 27.5817 55.4183 24 51 24ZM41 32C41 26.4772 45.4772 22 51 22C56.5228 22 61 26.4772 61 32C61 37.5228 56.5228 42 51 42C45.4772 42 41 37.5228 41 32Z"
        fill="#F6DFCF"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M60 31C60.5523 31 61 31.4477 61 32C61 37.5228 56.5228 42 51 42C50.4477 42 50 41.5523 50 41C50 40.4477 50.4477 40 51 40C55.4183 40 59 36.4183 59 32C59 31.4477 59.4477 31 60 31Z"
        fill="#F44040"
      />
    </svg>
  );
};

export default Spinner;
