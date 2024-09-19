/* eslint-disable react-hooks/exhaustive-deps */
import styles from './app.module.css';

import { SearchResultPage } from '../pages/search-result';
import { mockFlights } from 'app/mock-data/mock-flights';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { actions } from 'services/search-result-slice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.setInitialFlights(mockFlights));
  }, [mockFlights]);

  return (
    <div className={`${styles.app_container} container`}>
      <header className={`${styles.header} container pt-8 pb-8`}></header>
      <div className={styles.content}>
        <SearchResultPage></SearchResultPage>
      </div>
      <footer className={`${styles.footer} container pt-8 pb-8`}></footer>
    </div>
  );
}

export default App;
