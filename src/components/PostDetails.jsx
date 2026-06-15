import React, { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  const { theme } = useTheme();
  const reactions =
    typeof post?.reactions === "object"
      ? `${post.reactions.likes ?? 0} likes, ${post.reactions.dislikes ?? 0} dislikes`
      : `${post?.reactions ?? 0} réactions`;

  const themeClasses = useMemo(
    () => ({
      card:
        theme === "dark"
          ? "card mb-4 bg-dark text-light border-secondary"
          : "card mb-4",
      button:
        theme === "dark"
          ? "btn btn-sm btn-outline-light"
          : "btn btn-sm btn-outline-secondary",
    }),
    [theme],
  );

  if (!post) return null;
  post = { ...post, reactions };

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
        <p className="card-text">{post.body}</p>

        {/* TODO: Exercice 4 - Afficher les réactions et l'utilisateur */}
        <p className="card-text">
          <small className="text-muted">
            Par {post.userId} - {post.reactions} réactions
          </small>
        </p>

        {/* TODO: Exercice 4 - Afficher les tags */}
        <div className="mt-3">
          {post.tags?.map((tag) => (
            <span
              key={tag}
              className="badge bg-primary me-2"
              style={{ cursor: "pointer" }}
              onClick={() => onTagClick && onTagClick(tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(PostDetails);
