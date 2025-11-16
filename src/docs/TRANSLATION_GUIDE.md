# Guide de traduction du Portfolio

## Comment utiliser le système de traduction

Le portfolio dispose maintenant d'un système de traduction Français/Anglais.

### Utiliser les traductions dans un composant

1. Importez le hook `useLanguage` :
```jsx
import { useLanguage } from '../contexts/LanguageContext';
```

2. Dans votre composant, utilisez le hook :
```jsx
function MonComposant() {
  const { t, language } = useLanguage();

  return (
    <div>
      <h1>{t.section.titre}</h1>
    </div>
  );
}
```

### Ajouter de nouvelles traductions

Les traductions se trouvent dans `/src/contexts/LanguageContext.jsx`.

Ajoutez vos textes dans les deux langues :

```jsx
const translations = {
  fr: {
    maSection: {
      titre: "Mon titre en français",
      description: "Ma description..."
    }
  },
  en: {
    maSection: {
      title: "My title in English",
      description: "My description..."
    }
  }
};
```

### Sections déjà traduites

✅ Navigation (navbar)
✅ Page d'accueil (Home)
✅ Page À propos (About)
✅ Page Parcours (Education)
✅ Page Projets (Projects)
✅ Page Contact (Contact)
✅ Footer

### Le bouton de langue

Le bouton FR/EN se trouve dans la navbar et permet de basculer entre les deux langues instantanément.
