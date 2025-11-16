# Configuration EmailJS pour le formulaire de contact

## Étapes pour configurer EmailJS

### 1. Créer un compte EmailJS (gratuit)
1. Allez sur https://www.emailjs.com/
2. Cliquez sur "Sign Up" et créez un compte gratuit
3. Connectez-vous à votre compte

### 2. Configurer votre service email
1. Dans le dashboard, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur d'email (Gmail recommandé)
4. Suivez les instructions pour connecter votre Gmail (ulrichbab09@gmail.com)
5. Notez le **Service ID** qui apparaît

### 3. Créer un template d'email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce template :

**Nom du template** : contact_form

**Subject** :
```
Nouveau message de {{from_name}} - {{subject}}
```

**Content** :
```
Vous avez reçu un nouveau message depuis votre portfolio :

De : {{from_name}}
Email : {{from_email}}
Sujet : {{subject}}

Message :
{{message}}

---
Ce message a été envoyé depuis votre formulaire de contact.
```

4. Sauvegardez et notez le **Template ID**

### 4. Obtenir votre clé publique
1. Allez dans "Account" → "General"
2. Trouvez votre **Public Key**
3. Notez-la

### 5. Mettre à jour le code
Ouvrez le fichier `src/pages/Contact.jsx` et remplacez aux lignes 29-31 :

```javascript
const serviceId = 'YOUR_SERVICE_ID';  // Remplacez par votre Service ID
const templateId = 'YOUR_TEMPLATE_ID';  // Remplacez par votre Template ID
const publicKey = 'YOUR_PUBLIC_KEY';  // Remplacez par votre Public Key
```

### 6. Tester le formulaire
1. Allez sur http://localhost:5173/contact
2. Remplissez le formulaire
3. Cliquez sur "Envoyer le message"
4. Vérifiez votre boîte email ulrichbab09@gmail.com

## Exemple de configuration

```javascript
const serviceId = 'service_abc1234';
const templateId = 'template_xyz5678';
const publicKey = 'mno9012pqr3456';
```

## Limite gratuite
- EmailJS offre **200 emails gratuits par mois**
- Si vous dépassez, vous devrez upgrader vers un plan payant

## Dépannage

### Si les emails n'arrivent pas :
1. Vérifiez vos identifiants (Service ID, Template ID, Public Key)
2. Vérifiez que le service Gmail est bien connecté
3. Regardez dans les spams de votre boîte mail
4. Consultez les logs dans le dashboard EmailJS

### Erreur de CORS :
- EmailJS gère automatiquement les CORS, pas de configuration nécessaire

## Alternative : FormSubmit
Si vous préférez une solution encore plus simple (sans configuration) :

Remplacez le formulaire par :
```html
<form action="https://formsubmit.co/ulrichbab09@gmail.com" method="POST">
```

Mais EmailJS offre plus de contrôle et personnalisation.
