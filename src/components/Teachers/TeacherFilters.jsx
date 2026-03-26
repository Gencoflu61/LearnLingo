import styles from './TeacherFilters.module.css';

const TeacherFilters = ({ filters, onFilterChange, onReset }) => {
  // Tüm dilleri topla
  const allLanguages = ['All', 'English', 'Spanish', 'French', 'German', 'Mandarin Chinese', 'Italian', 'Vietnamese', 'Korean'];
  
  // Tüm seviyeler
  const allLevels = ['All', 'A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficient'];
  
  // Fiyat aralıkları
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-25', label: '$0 - $25' },
    { value: '25-30', label: '$25 - $30' },
    { value: '30-35', label: '$30 - $35' },
    { value: '35+', label: '$35+' }
  ];

  return (
    <div className={styles.filters}>
      <select
        value={filters.language}
        onChange={(e) => onFilterChange('language', e.target.value)}
        className={styles.filterSelect}
      >
        {allLanguages.map(lang => (
          <option key={lang} value={lang === 'All' ? '' : lang}>
            {lang}
          </option>
        ))}
      </select>
      
      <select
        value={filters.level}
        onChange={(e) => onFilterChange('level', e.target.value)}
        className={styles.filterSelect}
      >
        {allLevels.map(level => (
          <option key={level} value={level === 'All' ? '' : level}>
            {level}
          </option>
        ))}
      </select>
      
      <select
        value={filters.price}
        onChange={(e) => onFilterChange('price', e.target.value)}
        className={styles.filterSelect}
      >
        {priceRanges.map(range => (
          <option key={range.value} value={range.value}>
            {range.label}
          </option>
        ))}
      </select>
      
      <button onClick={onReset} className={styles.resetBtn}>
        Reset Filters
      </button>
    </div>
  );
};

export default TeacherFilters;