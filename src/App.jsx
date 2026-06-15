import React, { useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
// TODO: Exercice 1 - Importer le hook usePosts
import usePosts from "./hooks/usePosts";
// TODO: Exercice 2 - Importer le hook useLocalStorage
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const { theme } = useTheme();
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  // TODO: Exercice 1 - Utiliser le hook usePosts pour récupérer les posts
  const { posts, loading, error, availableTags } = usePosts({
    searchTerm,
    tag: selectedTag,
  });

  // TODO: Exercice 2 - Utiliser useLocalStorage pour le mode de défilement
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage("infiniteScroll", true);

  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handleSearchChange = React.useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleTagSelect = React.useCallback((tag) => {
    setSelectedTag(tag);
  }, []);

  const handleInfiniteScrollChange = React.useCallback((e) => {
    setInfiniteScroll(e.target.checked);
  }, [setInfiniteScroll]);

  return (
    <div className={`${theme} container py-4`}>
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-5 fw-bold">Blog</h1>
          <ThemeToggle />
        </div>
        <div className="form-check form-switch mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="infinite-scroll"
            checked={infiniteScroll}
            onChange={handleInfiniteScrollChange}
          />
          <label className="form-check-label" htmlFor="infinite-scroll">
            Défilement infini
          </label>
        </div>
      </header>

      <main>
        <PostSearch
          onSearch={handleSearchChange}
          onTagSelect={handleTagSelect}
          availableTags={availableTags}
          selectedTag={selectedTag}
        />

        {/* TODO: Exercice 1 - Afficher un message d'erreur si nécessaire */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* TODO: Exercice 4 - Ajouter le composant PostDetails */}

        {/* TODO: Exercice 1 - Passer les props nécessaires à PostList */}
        <PostList
          posts={posts}
          loading={loading}
          error={error}
          onTagClick={handleTagSelect}
          infiniteScroll={infiniteScroll}
        />
      </main>

      <footer className="pt-3 mt-4 text-center border-top">
        <p>TP React Hooks - Blog &middot; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
