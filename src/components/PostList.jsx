import React, { useCallback, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
// TODO: Exercice 4 - Importer useIntersectionObserver
import LoadingSpinner from "./LoadingSpinner";

/**
 * Composant d'affichage de la liste des posts
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.posts - Liste des posts à afficher
 * @param {boolean} props.loading - Indicateur de chargement
 * @param {boolean} props.hasMore - Indique s'il y a plus de posts à charger
 * @param {Function} props.onLoadMore - Fonction pour charger plus de posts
 * @param {Function} props.onPostClick - Fonction appelée au clic sur un post
 * @param {Function} props.onTagClick - Fonction appelée au clic sur un tag
 * @param {boolean} props.infiniteScroll - Mode de défilement infini activé ou non
 */
function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true,
}) {
  const { theme } = useTheme();
  const themeClasses = useMemo(() => ({
    card: theme === "dark" ? "card mb-4 bg-dark text-light border-secondary" : "card mb-4",
    badge: theme === "dark" ? "badge bg-info text-dark me-2" : "badge bg-primary me-2",
  }), [theme]);

  // TODO: Exercice 4 - Utiliser useIntersectionObserver pour le défilement infini

  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handlePostClick = useCallback((post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  }, [onPostClick]);

  const handleTagClick = useCallback((e, tag) => {
    e.stopPropagation(); // Éviter de déclencher le clic sur le post
    if (onTagClick) {
      onTagClick(tag);
    }
  }, [onTagClick]);

  // TODO: Exercice 1 - Gérer le cas où il n'y a pas de posts
  if (posts.length === 0 && !loading) {
    return <p>Aucun post trouvé.</p>;
  }

  return (
    <div className="post-list">
      {/* TODO: Exercice 1 - Afficher la liste des posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className={themeClasses.card}
          onClick={() => handlePostClick(post)}
        >
          <div className="card-body">
            <h4 className="card-title">{post.title}</h4>

            <p className="card-text">{post.body}</p>

            <div className="mt-3">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className={themeClasses.badge}
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Afficher le spinner de chargement */}
      {loading && <LoadingSpinner />}

      {/* TODO: Exercice 4 - Ajouter la référence pour le défilement infini */}

      {/* TODO: Exercice 1 - Ajouter le bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && (
        <button className="btn btn-primary" onClick={onLoadMore}>
          Charger plus
        </button>
      )}
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostList);
