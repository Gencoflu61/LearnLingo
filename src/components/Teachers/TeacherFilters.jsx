import styles from './TeacherFilters.module.css';

const TeacherFilters = ({ filters, onFilterChange }) => {
  const allLanguages = ['All', 'English', 'Spanish', 'French', 'German', 'Mandarin Chinese', 'Italian', 'Vietnamese', 'Korean'];
  const allLevels = ['All', 'A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficient'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '25', label: '$25' },
    { value: '30', label: '$30' },
    { value: '35', label: '$35' },
    { value: '35+', label: '$35+' }
  ];

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    onFilterChange('language', value === 'All' ? '' : value);
  };

  const handleLevelChange = (e) => {
    const value = e.target.value;
    onFilterChange('level', value === 'All' ? '' : value);
  };

  const handlePriceChange = (e) => {
    onFilterChange('price', e.target.value);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.select}>
        <h1 className={styles.filth1}>Languages</h1>
        <select
          value={filters.language === '' ? 'All' : filters.language}
          onChange={handleLanguageChange}
          className={styles.filterSelect}
        >
          {allLanguages.map(lang => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.select}>
        <h1 className={styles.filth1}>Level of knowledge</h1>
        <select
          value={filters.level === '' ? 'All' : filters.level}
          onChange={handleLevelChange}
          className={styles.filterSelect}
        >
          {allLevels.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      
      <div className={styles.select}>
        <h1 className={styles.filth1}>Price</h1>
        <select
          value={filters.price}
          onChange={handlePriceChange}
          className={styles.filterSelect}
        >
          {priceRanges.map(range => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TeacherFilters;