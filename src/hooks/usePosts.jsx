import { useState, useEffect, useCallback, useMemo } from "react";
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
  const [selectedPost, setSelectedPost] = useState(null);

  // TODO: Exercice 2 - Utiliser useDebounce pour le terme de recherche
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // TODO: Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = useCallback((skip = 0) => {
    let url = `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;

    if (debouncedSearchTerm) {
      url = `https://dummyjson.com/posts/search?q=${debouncedSearchTerm}`;
    } else if (tag) {
      url = `https://dummyjson.com/posts/tag/${encodeURIComponent(tag)}?limit=${limit}&skip=${skip}`;
    }

    return url;
  }, [debouncedSearchTerm, tag, limit]);

  // TODO: Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = useCallback(async (reset = false, pageToLoad = 1) => {
    try {
      setLoading(true);
      setError(null);

      const skip = reset ? 0 : (pageToLoad - 1) * limit;

      const response = await fetch(buildApiUrl(skip));
      const data = await response.json();
      setPosts((prevPosts) => reset ? data.posts : [...prevPosts, ...data.posts]);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [buildApiUrl, limit]);

  // TODO: Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
    setPage(1);
    fetchPosts(true, 1);
  }, [debouncedSearchTerm, tag, limit, fetchPosts]);

  // TODO: Exercice 4 - Implémenter la fonction pour charger plus de posts
  const loadMorePosts = useCallback(async () => {
    if (!loading && page * limit < total) {
      const nextPage = page + 1;
      setPage(nextPage);
      await fetchPosts(false, nextPage);
    }
  }, [fetchPosts, loading, page, limit, total]);

  // TODO: Exercice 3 - Utiliser useMemo pour calculer les tags uniques
  const availableTags = useMemo(() => {
    return [...new Set(posts.flatMap((post) => post.tags || []))];
  }, [posts]);

  // TODO: Exercice 4 - Implémenter la fonction pour charger un post par son ID
  const loadPost = useCallback(async (id) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await response.json();
      setSelectedPost(data);
    } catch (err) {
      setError(err.message);
    }
  }, []);

 return {
  posts,
  loading,
  error,
  page,
  total,
  setPage,
  availableTags,
  selectedPost,
  setSelectedPost,
  loadPost,
  loadMorePosts,
};
}

export default usePosts;
