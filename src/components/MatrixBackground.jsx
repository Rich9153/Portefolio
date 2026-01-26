import { useEffect, useRef } from 'react';
import './MatrixBackground.css';

function MatrixBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Définir la taille du canvas
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Caractères à afficher (chiffres et quelques symboles)
    const chars = '0123456789ABCDEFαβγδεζηθικλμνξοπρστυφχψω';
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Tableau pour stocker la position Y de chaque colonne
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Fonction de dessin
    const draw = () => {
      // Fond semi-transparent pour effet de traînée
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Style du texte
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Choisir un caractère aléatoire
        const text = chars[Math.floor(Math.random() * chars.length)];

        // Gradient de couleur (cyan à transparent)
        const gradient = ctx.createLinearGradient(0, drops[i] * fontSize, 0, (drops[i] + 1) * fontSize);
        gradient.addColorStop(0, '#00d9ff');
        gradient.addColorStop(0.5, '#00b8d4');
        gradient.addColorStop(1, 'rgba(0, 217, 255, 0.3)');

        ctx.fillStyle = gradient;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Réinitialiser la position si elle dépasse l'écran
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // Animation
    const interval = setInterval(draw, 50);

    // Redimensionnement
    const handleResize = () => {
      setCanvasSize();
      drops.length = 0;
      for (let i = 0; i < canvas.width / fontSize; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    window.addEventListener('resize', handleResize);

    // Nettoyage
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-background" />;
}

export default MatrixBackground;
