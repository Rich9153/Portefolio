import { useEffect, useRef } from 'react';
import './CardMatrixBackground.css';

function CardMatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const parent = canvas.parentElement;

    // Définir la taille du canvas
    const setCanvasSize = () => {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    setCanvasSize();

    // Caractères à afficher
    const chars = '01';
    const fontSize = 12;
    const columns = canvas.width / fontSize;

    // Tableau pour stocker la position Y de chaque colonne
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -20;
    }

    // Fonction de dessin
    const draw = () => {
      // Fond semi-transparent pour effet de traînée
      ctx.fillStyle = 'rgba(26, 26, 46, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Style du texte
      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = 'rgba(0, 217, 255, 0.15)';

      for (let i = 0; i < drops.length; i++) {
        // Choisir un caractère aléatoire
        const text = chars[Math.floor(Math.random() * chars.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Réinitialiser la position si elle dépasse l'écran
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Animation
    const interval = setInterval(draw, 80);

    // Redimensionnement
    const handleResize = () => {
      setCanvasSize();
      drops.length = 0;
      for (let i = 0; i < canvas.width / fontSize; i++) {
        drops[i] = Math.random() * -20;
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parent);

    // Nettoyage
    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="card-matrix-background" />;
}

export default CardMatrixBackground;
