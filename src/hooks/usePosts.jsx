import { useState, useEffect } from "react";
// TODO: Exercice 2 - Importer useDebounce
import useDebounce from "./useDebounce";

/**
 * Hook personnalisé pour gérer les posts du blog
 * @param {Object} options - Options de configuration
 * @param {string} options.searchTerm - Terme de recherche
 * @param {string} options.tag - Tag à filtrer
 * @param {number} options.limit - Nombre d'éléments par page
 * @param {boolean} options.infinite - Mode de chargement infini vs pagination
 * @returns {Object} État et fonctions pour gérer les posts
 */
function usePosts({
  searchTerm = "",
  tag = "",
  limit = 10,
  infinite = true,
} = {}) {
  // État local pour les posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Exercice 1 - Ajouter les états nécessaires pour la pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  // TODO: Exercice 4 - Ajouter l'état pour le post sélectionné

  // TODO: Exercice 2 - Utiliser useDebounce pour le terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // TODO: Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = (skip = 0) => {
    let url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;

    if (debouncedSearchTerm) {
      url = `https://dummyjson.com/posts/search?q=${debouncedSearchTerm}`;
    }

    return url;
  };

  // TODO: Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      setError(null);

      const skip = reset ? 0 : (page - 1) * limit;

      const response = await fetch(buildApiUrl(skip));
      const data = await response.json();

      setPosts(data.posts);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
    fetchPosts(true);
  }, [debouncedSearchTerm, tag, limit]);

  // TODO: Exercice 4 - Implémenter la fonction pour charger plus de posts

  // TODO: Exercice 3 - Utiliser useMemo pour calculer les tags uniques

  // TODO: Exercice 4 - Implémenter la fonction pour charger un post par son ID

 return {
  posts,
  loading,
  error,
  page,
  total,
  setPage,
};
}

export default usePosts;
