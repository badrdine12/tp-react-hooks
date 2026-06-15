import React, { useCallback, useMemo, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Composant de recherche de posts
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSearch - Fonction appelée lors de la saisie
 * @param {Function} props.onTagSelect - Fonction appelée lors de la sélection d'un tag
 * @param {Array} props.availableTags - Liste des tags disponibles
 * @param {string} props.selectedTag - Tag actuellement sélectionné
 */
function PostSearch({ 
  onSearch, 
  onTagSelect, 
  availableTags = [], 
  selectedTag = '' 
}) {
  const [searchInput, setSearchInput] = useState('');
  
  // TODO: Exercice 3 - Utiliser le hook useTheme
  const { theme } = useTheme();
  // TODO: Exercice 3 - Utiliser useCallback pour optimiser le gestionnaire
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  }, [onSearch]);

  const handleClearSearch = useCallback(() => {
    setSearchInput('');
    onSearch('');
  }, [onSearch]);

  const handleTagChange = useCallback((e) => {
    onTagSelect(e.target.value);
  }, [onTagSelect]);
  
  // TODO: Exercice 3 - Appliquer les classes CSS en fonction du thème
  const themeClasses = useMemo(() => ({
    button: theme === 'dark' ? 'btn btn-outline-light' : 'btn btn-outline-secondary',
    select: theme === 'dark' ? 'form-select bg-dark text-light border-secondary' : 'form-select'
  }), [theme]);
  
  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {/* TODO: Exercice 1 - Ajouter le bouton pour effacer la recherche */}
            {searchInput && (
              <button
                className={themeClasses.button}
                type="button"
                onClick={handleClearSearch}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        </div>
        
        <div className="col-md-4">
          <select
            className={themeClasses.select}
            value={selectedTag}
            onChange={handleTagChange}
            aria-label="Filtrer par tag"
          >
            <option value="">Tous les tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostSearch);
