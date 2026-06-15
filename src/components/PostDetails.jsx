import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  const { theme } = useTheme();
  
  const themeClasses = useMemo(() => ({
    card: theme === 'dark' ? 'card mb-4 bg-dark text-light border-secondary' : 'card mb-4',
    button: theme === 'dark' ? 'btn btn-sm btn-outline-light' : 'btn btn-sm btn-outline-secondary'
  }), [theme]);
  
  if (!post) return null;
  
  return (
    <div className={themeClasses.card}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button 
          className={themeClasses.button}
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      
      <div className="card-body">
        {/* TODO: Exercice 4 - Afficher le contenu du post */}
        
        {/* TODO: Exercice 4 - Afficher les réactions et l'utilisateur */}
        
        {/* TODO: Exercice 4 - Afficher les tags */}
      </div>
    </div>
  );
}

export default React.memo(PostDetails);
