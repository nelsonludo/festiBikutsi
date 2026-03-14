import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        festival: "The Festival",
        lineup: "Lineup",
        schedule: "Schedule",
        gallery: "Gallery",
        registration: "Artist Portal",
      },
      hero: {
        title: "Where Tradition Meets Rhythm",
        subtitle: "Experience the soul of Bikutsi in the heart of Yaoundé.",
        cta: "Register as Artist",
        explore: "Explore Program",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
      },
      history: {
        title: "The Heart of ",
        span: "Bikutsi",
        items: {
          origins: {
            year: "Origins",
            title: "The Beti Legacy",
            desc: "Bikutsi started as a traditional rhythmic dance performed by Beti women in the forests of Central Cameroon.",
          },
          forties: {
            year: "1940s",
            title: "Messen-g-Bikutsi",
            desc: "The first acoustic experiments bringing Bikutsi to the broader social gatherings outside tribal rituals.",
          },
          seventies: {
            year: "1970s",
            title: "Electric Evolution",
            desc: "The introduction of electric guitars mimicking the balafon sounds, revolutionizing the genre.",
          },
          ninetynine: {
            year: "1999",
            title: "The First Festibikutsi",
            desc: "Initiated to preserve the authentic sound while promoting modern Bikutsi to the world.",
          },
          twentysix: {
            year: "2026",
            title: "The Global Stage",
            desc: "Festibikutsi 2026 celebrates 27 years of excellence and cultural resilience.",
          },
        },
      },
      lineup: {
        title: "Official ",
        span: "Lineup",
        subtitle: "The Best of Bikutsi 2026",
        modal: {
          featured: "Featured Artist",
          epk: "View EPK",
          follow: "Follow",
        },
        artists: {
          ladyponce: {
            name: "Lady Ponce",
            genre: "Modern Bikutsi",
            bio: "Known as the Queen of Bikutsi, Lady Ponce has redefined the genre with her powerful vocals and vibrant stage presence, blending traditional rhythms with modern pop elements.",
          },
          coco: {
            name: "Coco Argentée",
            genre: "Bikutsi Pop",
            bio: "A dynamic performer known for her innovative choreography and hit singles that have captured the hearts of fans across Africa and the diaspora.",
          },
          mani: {
            name: "Mani Bella",
            genre: "Bikutsi Fusion",
            bio: "Mani Bella brings a unique energy to the Bikutsi scene, famous for her style and the massive hit 'Pala Pala' that became a global anthem.",
          },
          ami: {
            name: "Ami Koïta",
            genre: "Traditional Bikutsi",
            bio: "A guardian of the authentic Beti sound, Ami preserves the acoustic essence of Bikutsi using traditional instruments like the Balafon and Mvet.",
          },
        },
      },
      schedule: {
        title: "Festival ",
        span: "Program",
        subtitle: "3 Days of Pure Energy",
        reminder: "Set Reminder",
        days: {
          day1: "Day 1",
          day2: "Day 2",
          day3: "Day 3",
        },
        noEvents: "Program for this day",
        comingSoon: "Program Coming Soon",
        events: {
          opening: {
            artist: "Opening Ceremony",
            stage: "Main Stage",
            type: "Ritual",
          },
          ladyponce: {
            artist: "Lady Ponce",
            stage: "Main Stage",
            type: "Modern Bikutsi",
          },
          mani: { artist: "Mani Bella", stage: "Vibe Stage", type: "Fusion" },
          ami: {
            artist: "Ami Koïta",
            stage: "Acoustic Stage",
            type: "Traditional",
          },
          coco: {
            artist: "Coco Argentée",
            stage: "Main Stage",
            type: "Bikutsi Pop",
          },
          guest: {
            artist: "Special Guest",
            stage: "Main Stage",
            type: "Surprise",
          },
          workshops: {
            artist: "Traditional Workshops",
            stage: "Workshop Area",
            type: "Educational",
          },
          finale: {
            artist: "Grand Finale",
            stage: "Main Stage",
            type: "All Stars",
          },
        },
      },
      gallery: {
        title: "Festival ",
        span: "Gallery",
        subtitle: "Memories in Rhythm",
        moment: "Festival Moment",
      },
      portal: {
        title: "Artist ",
        span: "Portal",
        subtitle: "Join the 2026 Edition",
        labels: {
          name: "Full Name",
          stage: "Stage Name",
          genre: "Genre",
          email: "Email Address",
          epk: "EPK / Socials Link",
          bio: "Short Bio",
          profile: "Profile Photo",
          submit: "Submit Application",
          submitting: "Submitting...",
        },
        placeholders: {
          name: "Jean Dupont",
          stage: "K-Rhythm",
          email: "artist@example.com",
          link: "https://myspace.com/artist",
          bio: "Tell us about your rhythmic journey...",
          profile: "Upload your profile photo...",
        },
        genres: {
          modern: "Modern Bikutsi",
          trad: "Traditional Bikutsi",
          fusion: "Bikutsi Fusion",
          other: "Other",
        },
        success: "Registration successful! We will review your profile.",
        error: "Something went wrong. Please try again.",
        networkError: "Network error. Is the server running?",
      },
      visitor: {
        title: "Visitor ",
        span: "Info",
        subtitle: "Plan Your Journey",
        faqTitle: "Frequently Asked Questions",
        travel: {
          title: "Travel Tips",
          desc: "Yaoundé Nsimalen Airport is the main entry point. Use official airport shuttles.",
        },
        lodging: {
          title: "Accommodation",
          desc: "We recommend hotels in the Bastos or Omnisport neighborhoods for easy access.",
        },
        mapBtn: "Open in Google Maps",
        faqs: {
          q1: {
            q: "Where is the festival located?",
            a: "The festival takes place at the 10eme arret Nkoabang precisely at the Camp Artistique de Lada in Yaoundé, Cameroon.",
          },
          q2: {
            q: "Is the event family-friendly?",
            a: "Yes, we have designated areas for children and traditional workshops starting from 10:00 AM.",
          },
          q3: {
            q: "How can I buy tickets?",
            a: "The entrance is completely <span>FREE !!!</span>",
          },
        },
        mapLocation: "Camp Artistique de Lada",
        mapCity: "10eme arret Nkoabang, Yaoundé, Cameroon",
      },

      footer: {
        quote:
          '"Celebrating the rhythmic heartbeat of Cameroon. Bikutsi is not just music; it\'s our soul, our resilience, and our future."',
        linksTitle: "Quick Links",
        contactTitle: "Contact Us",
        rights: "All Rights Reserved.",
        privacy: "Privacy Policy",
        links: {
          festival: "The Festival",
          lineup: "2026 Artist Lineup",
          schedule: "Program & Stages",
          registration: "Artist Registration",
          admin: "Admin Portal",
        },
        privacyModal: {
          title: "Privacy Policy",
          content: [
            "At Festibikutsi, we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Festibikutsi.",
            "Information we collect includes your name, email address, and IP address. We use this information to provide and improve our services, communicate with you, and personalize your experience.",
            "We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted partners who assist us in operating our website and delivering our services.",
            "By using our website, you consent to our Privacy Policy. If you have any questions or concerns about our privacy practices, please contact us.",
          ],
          close: "Close",
        },
      },
      admin: {
        login: {
          title: "CMS Portal Access",
          subtitle: "Secure Administrative Environment",
          email: "Email Address",
          password: "Password",
          signIn: "Sign In to Dashboard",
          signingIn: "Signing In...",
          welcome: "Welcome back, Admin!",
          error: "Login failed. Check your credentials.",
          emailError: "Invalid email address",
          passwordError: "Password must be at least 6 characters",
        },
        dashboard: {
          title: "Dashboard Overview",
          subtitle: "Welcome back! Here's what's happening today.",
          stats: {
            totalArtists: "Total Artists",
            pending: "Pending Approval",
            daysToFestival: "Days to Festival",
            schedule: "Schedule Events",
            gallery: "Live Gallery",
            visible: "Visible",
          },
          actions: {
            title: "Quick Actions",
            review: "Review New Applications",
            update: "Update Festival Timeline",
          },
          viewSite: "View Live Site",
          countdown: {
            title: "Festival Countdown",
            label: "Festival Start Date",
            save: "Update Countdown",
            hint: "This will update the global countdown timer for all visitors.",
            success: "Festival date updated!",
            error: "Failed to update date",
          },
        },
        common: {
          dashboard: "Dashboard",
          clear: "Clear Selection",
          logoutSuccess: "Logged out successfully",
          logoutError: "Logout failed",
          logout: "Logout",
        },
        artists: {
          title: "Artist Management",
          subtitle: "Review applications and manage the official lineup.",
          table: {
            name: "Artist / Stage Name",
            genre: "Genre",
            status: "Status",
            visibility: "Visibility",
            actions: "Actions",
          },
          status: {
            approved: "Approved",
            pending: "Pending",
          },
          visibility: {
            published: "Published",
            draft: "Draft",
          },
          actions: {
            add: "Add Artist",
            approve: "Approve Artist",
            approveBtn: "Approve",
            setDraft: "Set to Draft",
            publish: "Publish to Lineup",
            delete: "Delete Artist",
            rejectBtn: "Reject & Delete",
            confirmDelete: "Are you sure? This cannot be undone.",
            confirmApprove: "Approve this artist for the lineup?",
            confirmReject: "Reject and permanently delete this artist?",
            viewDetails: "View Details",
          },
          details: {
            title: "Artist Profile",
            info: "Basic Information",
            contact: "Contact Info",
            bio: "Biography",
            epk: "EPK / Socials",
            genre: "Genre",
            status: "Status",
            close: "Close Details",
          },
          success: {
            created: "Artist created successfully",
            updated: "Artist updated successfully",
            removed: "Artist removed",
          },
        },
        schedule: {
          title: "Festival Schedule",
          subtitle: "Manage the timeline of events across different stages.",
          form: {
            day: "Day (1, 2, 3)",
            time: "Time (e.g. 18:00)",
            artist: "Artist Name",
            stage: "Stage",
            type: "Category / Type",
            selectArtist: "Select an artist",
            special: "Special",
            activity: "Activity / Event Title",
            add: "Add to Schedule",
          },
          table: {
            slot: "Slot",
            artist: "Artist",
            location: "Location",
            actions: "Actions",
          },
          success: {
            added: "Schedule item added",
            updated: "Status updated",
            deleted: "Deleted",
          },
          actions: {
            confirmDelete: "Delete this schedule item?",
          },
          list: {
            title: "Day {{day}} Schedule",
            slots: "{{count}} slots",
            empty: "No events scheduled yet for this day.",
          },
        },
        gallery: {
          title: "Gallery Manager",
          subtitle: "Manage the visual history of the festival.",
          dragHint: "Drag & Drop Supported",
          dropZone: "Drop to Upload",
          dropSubtitle: "Release to add media to gallery",
          empty: "No media yet. Upload your first files above.",
          form: {
            url: "Image URL (Public Path)",
            alt: "Alt Text",
            add: "Add Item",
            select: "Select Files",
            uploadAll: "Upload All",
            uploading: "Uploading",
          },
          pending: {
            title: "Pending Uploads",
            count: "files ready",
          },
          actions: {
            toggleFeatured: "Toggle Featured",
            confirmDelete: "Delete this media item?",
          },
          success: {
            added: "Item added to gallery",
            allUploaded: "All files uploaded successfully",
            deleted: "Deleted",
          },
          error: {
            upload: "Upload failed. Please try again.",
          },
        },
        history: {
          title: "History Manager",
          subtitle: "Manage the festival's rhythmic timeline.",
          form: {
            year: "Year / Era",
            title: "Milestone Title",
            description: "Milestone Description",
            order: "Display Order",
            add: "Add Milestone",
          },
          table: {
            year: "Year",
            title: "Title",
            actions: "Actions",
          },
          success: {
            added: "Milestone added",
            updated: "Milestone updated",
            deleted: "Milestone removed",
          },
        },
        howItWorks: {
          title: "How It Works",
          subtitle:
            "Your complete guide to managing the FestiBikutsi admin panel.",
          intro:
            "This guide will help you understand every section of the admin panel and how to use it effectively to manage the FestiBikutsi festival content.",
          sections: {
            dashboard: {
              title: "Dashboard",
              icon: "LayoutDashboard",
              desc: "The Dashboard is your command center. Here you get a bird's-eye view of the entire festival operation.",
              steps: [
                "View key statistics: total registered artists, pending approvals, and days remaining until the festival.",
                "Use the Festival Countdown section to update the festival start date — this syncs the live countdown timer visible to all website visitors.",
                "Use Quick Actions to jump directly to the Artists or Schedule managers.",
                'Click "View Live Site" to preview the public website in a new tab.',
              ],
            },
            artists: {
              title: "Artist Manager",
              desc: "The Artist Manager is where you review all artist applications submitted through the public Artist Portal.",
              steps: [
                "Browse the table of all submitted artists with their name, genre, approval status, and visibility.",
                "Click any row to open a detailed side panel with the artist's full bio, contact info, EPK link, and profile photo.",
                "Use the green checkmark (\u2713) to approve an artist — approved artists can be added to the schedule.",
                "Use the eye icon to toggle an artist's visibility between Published (visible in the public lineup) and Draft (hidden).",
                "Use the trash icon to permanently remove an artist from the database.",
                'Use the "Add Artist" button to manually add an artist with a photo directly from the admin panel.',
              ],
            },
            schedule: {
              title: "Schedule Manager",
              desc: "The Schedule Manager lets you build and manage the festival's event timeline across multiple stages and days.",
              steps: [
                "Use the Day 1 / Day 2 / Day 3 tabs to switch between days.",
                "Fill in the form on the left: choose a stage, select the event type (Performance, Workshop, Ceremony, etc.), pick an artist or enter an activity name, and set the time.",
                'For "Performance" events, a dropdown of approved artists appears automatically.',
                "For other types (Workshop, Ceremony, Other), a free-text input appears so you can type a custom event title.",
                'Click "Add to Schedule" to save the slot.',
                "In the list on the right, use the eye icon to toggle an event between Live (visible to the public) and Draft.",
                "Use the trash icon to delete a schedule item.",
              ],
            },
            gallery: {
              title: "Gallery Manager",
              desc: "The Gallery Manager controls all photos and videos displayed in the public gallery section.",
              steps: [
                'Drag and drop image or video files directly anywhere on the page, or click "Select Files" to browse.',
                "A preview grid will appear showing files pending upload.",
                'Click "Upload All" to save the files to the server and add them to the gallery.',
                "In the gallery grid, hover over any item to reveal action buttons.",
                "Click the star icon to mark an item as Featured (highlighted in the public gallery).",
                "Click the eye icon to toggle an item's visibility between published and hidden.",
                "Click the red trash icon to permanently delete a media item.",
              ],
            },
            history: {
              title: "History Manager",
              desc: 'The History Manager controls the timeline of milestones displayed in the "History of Bikutsi" section on the public website.',
              steps: [
                "The list shows all existing milestones sorted by their display order.",
                "Use the up/down arrows on each card to reorder milestones on the public page.",
                'Click "Add Milestone" to open the form where you fill in a Year/Era, a Title, a Description, and a display order number.',
                "Click the trash icon on any milestone to permanently remove it.",
              ],
            },
            language: {
              title: "Language & Session",
              desc: "The admin panel supports both English and French, matching the public website.",
              steps: [
                "Click the globe icon at the bottom of the sidebar to toggle between English (EN) and French (FR).",
                "The language change applies instantly to all labels, buttons, and messages in both the admin panel and the public website.",
                "To log out securely, click the Logout button at the bottom of the sidebar. You will be redirected to the login page.",
              ],
            },
          },
          tip: {
            title: "Pro Tips",
            items: [
              "Always approve an artist first before adding them to the schedule — only approved artists appear in the schedule dropdown.",
              "Use Draft mode to prepare content in advance without making it public.",
              "The festival countdown updates in real-time for all visitors as soon as you save a new date.",
              "Uploaded images are stored permanently on the server and served instantly worldwide.",
            ],
          },
        },
      },
    },
  },
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        festival: "Le Festival",
        lineup: "Artistes",
        schedule: "Programme",
        gallery: "Galerie",
        registration: "Portail Artiste",
      },
      hero: {
        title: "Quand la Tradition Rencontre le Rythme",
        subtitle: "Découvrez l'âme du Bikutsi au cœur de Yaoundé.",
        cta: "S'inscrire comme Artiste",
        explore: "Explorer le Programme",
        days: "Jours",
        hours: "Heures",
        minutes: "Minutes",
        seconds: "Secondes",
      },
      history: {
        title: "Le Cœur du ",
        span: "Bikutsi",
        items: {
          origins: {
            year: "Origines",
            title: "L'Héritage Beti",
            desc: "Le Bikutsi a commencé comme une danse rythmique traditionnelle pratiquée par les femmes Beti dans les forêts du centre du Cameroun.",
          },
          forties: {
            year: "Années 1940",
            title: "Messen-g-Bikutsi",
            desc: "Les premières expériences acoustiques amenant le Bikutsi dans les rassemblements sociaux plus larges.",
          },
          seventies: {
            year: "Années 1970",
            title: "Évolution Électrique",
            desc: "L'introduction des guitares électriques imitant les sons du balafon, révolutionnant le genre.",
          },
          ninetynine: {
            year: "1999",
            title: "Le Premier Festibikutsi",
            desc: "Initié pour préserver le son authentique tout en promouvant le Bikutsi moderne dans le monde.",
          },
          twentysix: {
            year: "2026",
            title: "La Scène Mondiale",
            desc: "Festibikutsi 2026 célèbre 27 ans d'excellence et de résilience culturelle.",
          },
        },
      },
      lineup: {
        title: "Programmation ",
        span: "Officielle",
        subtitle: "Le Meilleur du Bikutsi 2026",
        modal: {
          featured: "Artiste Vedette",
          epk: "Voir EPK",
          follow: "Suivre",
        },
        artists: {
          ladyponce: {
            name: "Lady Ponce",
            genre: "Bikutsi Moderne",
            bio: "Connue comme la Reine du Bikutsi, Lady Ponce a redéfini le genre avec sa voix puissante et sa présence scénique vibrante, mêlant rythmes traditionnels et éléments pop modernes.",
          },
          coco: {
            name: "Coco Argentée",
            genre: "Bikutsi Pop",
            bio: "Une artiste dynamique connue pour sa chorégraphie innovante et ses singles à succès qui ont conquis le cœur des fans à travers l'Afrique et la diaspora.",
          },
          mani: {
            name: "Mani Bella",
            genre: "Bikutsi Fusion",
            bio: "Mani Bella apporte une énergie unique à la scène Bikutsi, célèbre pour son style et le succès massif de 'Pala Pala' devenu un hymne mondial.",
          },
          ami: {
            name: "Ami Koïta",
            genre: "Bikutsi Traditionnel",
            bio: "Gardienne du son Beti authentique, Ami préserve l'essence acoustique du Bikutsi en utilisant des instruments traditionnels comme le Balafon et le Mvet.",
          },
        },
      },
      schedule: {
        title: "Programme du ",
        span: "Festival",
        subtitle: "3 Jours de Pure Énergie",
        reminder: "Programmer",
        days: {
          day1: "Jour 1",
          day2: "Jour 2",
          day3: "Jour 3",
        },
        noEvents: "Programme pour ce jour",
        comingSoon: "Programme à venir",
        events: {
          opening: {
            artist: "Cérémonie d'Ouverture",
            stage: "Scène Principale",
            type: "Rituel",
          },
          ladyponce: {
            artist: "Lady Ponce",
            stage: "Scène Principale",
            type: "Bikutsi Moderne",
          },
          mani: { artist: "Mani Bella", stage: "Scène Vibe", type: "Fusion" },
          ami: {
            artist: "Ami Koïta",
            stage: "Scène Acoustique",
            type: "Traditionnel",
          },
          coco: {
            artist: "Coco Argentée",
            stage: "Scène Principale",
            type: "Bikutsi Pop",
          },
          guest: {
            artist: "Invité Spécial",
            stage: "Scène Principale",
            type: "Surprise",
          },
          workshops: {
            artist: "Ateliers Traditionnels",
            stage: "Zone d'Ateliers",
            type: "Éducatif",
          },
          finale: {
            artist: "Grande Finale",
            stage: "Scène Principale",
            type: "All Stars",
          },
        },
      },
      gallery: {
        title: "Galerie du ",
        span: "Festival",
        subtitle: "Souvenirs en Rythme",
        moment: "Moment du Festival",
      },
      portal: {
        title: "Portail ",
        span: "Artiste",
        subtitle: "Rejoignez l'Édition 2026",
        labels: {
          name: "Nom Complet",
          stage: "Nom de Scène",
          genre: "Genre",
          email: "Adresse Email",
          epk: "Lien EPK / Réseaux",
          bio: "Courte Bio",
          profile: "Photo de profil",
          submit: "Soumettre Candidature",
          submitting: "Envoi en cours...",
        },
        placeholders: {
          name: "Jean Dupont",
          stage: "K-Rhythm",
          email: "artiste@exemple.com",
          link: "https://myspace.com/artiste",
          bio: "Parlez-nous de votre voyage rythmique...",
          profile: "Upload your profile photo...",
        },
        genres: {
          modern: "Bikutsi Moderne",
          trad: "Bikutsi Traditionnel",
          fusion: "Bikutsi Fusion",
          other: "Autre",
        },
        success: "Inscription réussie ! Nous allons examiner votre profil.",
        error: "Un problème est survenu. Veuillez réessayer.",
        networkError: "Erreur réseau. Le serveur est-il actif ?",
      },
      visitor: {
        title: "Infos ",
        span: "Visiteurs",
        subtitle: "Préparez votre voyage",
        faqTitle: "Questions Fréquentes",
        travel: {
          title: "Conseils de Voyage",
          desc: "L'aéroport Nsimalen de Yaoundé est le point d'entrée principal.",
        },
        lodging: {
          title: "Hébergement",
          desc: "Nous recommandons les hôtels des quartiers Bastos ou Omnisport.",
        },
        mapBtn: "Ouvrir dans Google Maps",
        faqs: {
          q1: {
            q: "Où se déroule le festival ?",
            a: "Le festival a lieu au 10eme arret Nkoabang precisement au Camp Artistique de Lada, au Cameroun.",
          },
          q2: {
            q: "L'événement est-il adapté aux familles ?",
            a: "Oui, nous avons des espaces dédiés aux enfants et des ateliers traditionnels à partir de 10h00.",
          },
          q3: {
            q: "Comment puis-je acheter des billets ?",
            a: "L'entree est <span>GRATUITE !!!</span>",
          },
        },
        mapLocation: "Camp Artistique de Lada",
        mapCity: "10eme arret Nkoabang, Yaoundé, Cameroun",
      },

      footer: {
        quote:
          "\"Célébrer le rythme cardiaque du Cameroun. Le Bikutsi n'est pas seulement de la musique ; c'est notre âme, notre résilience et notre avenir.\"",
        linksTitle: "Liens Rapides",
        contactTitle: "Contactez-nous",
        rights: "Tous droits réservés.",
        privacy: "Politique de confidentialité",
        links: {
          festival: "Le Festival",
          lineup: "Programmation 2026",
          schedule: "Programme & Scènes",
          registration: "Inscription Artiste",
          admin: "Portail Admin",
        },
        privacyModal: {
          title: "Politique de Confidentialité",
          content: [
            "Chez Festibikutsi, nous nous engageons à protéger votre vie privée. Cette politique de confidentialité explique comment vos informations personnelles sont collectées, utilisées et divulguées par Festibikutsi.",
            "Les informations que nous collectons incluent votre nom, votre adresse e-mail et votre adresse IP. Nous utilisons ces informations pour fournir et améliorer nos services, communiquer avec vous et personnaliser votre expérience.",
            "Nous ne vendons, ne louons ni n'échangeons vos informations personnelles à des tiers. Nous pouvons partager vos informations avec des partenaires de confiance qui nous aident à exploiter notre site Web et à fournir nos services.",
            "En utilisant notre site Web, vous consentez à notre politique de confidentialité. Si vous avez any questions ou des préoccupations concernant nos pratiques de confidentialité, veuillez nous contacter.",
          ],
          close: "Fermer",
        },
      },
      admin: {
        login: {
          title: "Accès au Portail CMS",
          subtitle: "Environnement Administratif Sécurisé",
          email: "Adresse Email",
          password: "Mot de passe",
          signIn: "Se connecter au Tableau de Bord",
          signingIn: "Connexion...",
          welcome: "Bon retour, Administrateur !",
          error: "Échec de la connexion. Vérifiez vos identifiants.",
          emailError: "Adresse email invalide",
          passwordError: "Le mot de passe doit contenir au moins 6 caractères",
        },
        dashboard: {
          title: "Aperçu du Tableau de Bord",
          subtitle: "Bon retour ! Voici ce qui se passe aujourd'hui.",
          stats: {
            totalArtists: "Total Artistes",
            pending: "En attente d'approbation",
            daysToFestival: "Jours avant le festival",
            schedule: "Événements au programme",
            gallery: "Galerie en direct",
            visible: "Visible",
          },
          actions: {
            title: "Actions Rapides",
            review: "Examiner les nouvelles candidatures",
            update: "Mettre à jour le programme",
          },
          viewSite: "Voir le site en direct",
          countdown: {
            title: "Compte à rebours",
            label: "Date de début du festival",
            save: "Mettre à jour",
            hint: "Ceci mettra à jour le compte à rebours global pour tous les visiteurs.",
            success: "Date du festival mise à jour !",
            error: "Échec de la mise à jour de la date",
          },
        },
        common: {
          dashboard: "Tableau de Bord",
          clear: "Effacer la sélection",
          logoutSuccess: "Déconnexion réussie",
          logoutError: "Échec de la déconnexion",
          logout: "Déconnexion",
        },
        artists: {
          title: "Gestion des Artistes",
          subtitle:
            "Examinez les candidatures et gérez la programmation officielle.",
          table: {
            name: "Artiste / Nom de scène",
            genre: "Genre",
            status: "Statut",
            visibility: "Visibilité",
            actions: "Actions",
          },
          status: {
            approved: "Approuvé",
            pending: "En attente",
          },
          visibility: {
            published: "Publié",
            draft: "Brouillon",
          },
          actions: {
            add: "Ajouter un artiste",
            approve: "Approuver l'artiste",
            approveBtn: "Approuver",
            setDraft: "Mettre en brouillon",
            publish: "Publier dans la programmation",
            delete: "Supprimer l'artiste",
            rejectBtn: "Rejeter & Supprimer",
            confirmDelete: "Êtes-vous sûr ? Cette action est irréversible.",
            confirmApprove: "Approuver cet artiste pour la programmation ?",
            confirmReject: "Rejeter et supprimer définitivement cet artiste ?",
            viewDetails: "Voir les détails",
          },
          success: {
            created: "Artiste créé avec succès",
            updated: "Artiste mis à jour avec succès",
            removed: "Artiste supprimé",
          },
        },
        schedule: {
          title: "Programme du Festival",
          subtitle:
            "Gérez la chronologie des événements sur les différentes scènes.",
          form: {
            day: "Jour (1, 2, 3)",
            time: "Heure (ex. 18:00)",
            artist: "Nom de l'artiste",
            stage: "Scène",
            type: "Catégorie / Type",
            selectArtist: "Sélectionner un artiste",
            special: "Spécial",
            activity: "Activité / Titre de l'événement",
            add: "Ajouter au programme",
          },
          table: {
            slot: "Créneau",
            artist: "Artiste",
            location: "Lieu",
            actions: "Actions",
          },
          success: {
            added: "Élément ajouté au programme",
            updated: "Statut mis à jour",
            deleted: "Supprimé",
          },
          actions: {
            confirmDelete: "Supprimer cet élément du programme ?",
          },
          list: {
            title: "Programme du Jour {{day}}",
            slots: "{{count}} créneaux",
            empty: "Aucun événement planifié pour ce jour.",
          },
        },
        gallery: {
          title: "Gestion de la Galerie",
          subtitle: "Gérez l'histoire visuelle du festival.",
          dragHint: "Glisser-déposer supporté",
          dropZone: "Déposer pour télécharger",
          dropSubtitle: "Relâchez pour ajouter à la galerie",
          empty:
            "Aucun média pour l'instant. Téléchargez vos premiers fichiers ci-dessus.",
          form: {
            url: "URL de l'image (Chemin public)",
            alt: "Texte alternatif",
            add: "Ajouter l'élément",
            select: "Sélectionner des fichiers",
            uploadAll: "Tout télécharger",
            uploading: "Téléchargement",
          },
          pending: {
            title: "Téléchargements en attente",
            count: "fichiers prêts",
          },
          actions: {
            toggleFeatured: "Mettre en avant",
            confirmDelete: "Supprimer cet élément média ?",
          },
          success: {
            added: "Élément ajouté à la galerie",
            allUploaded: "Tous les fichiers ont été téléchargés avec succès",
            deleted: "Supprimé",
          },
          error: {
            upload: "Échec du téléchargement. Veuillez réessayer.",
          },
        },
        history: {
          title: "Gestion de l'Histoire",
          subtitle: "Gérez la chronologie rythmique du festival.",
          form: {
            year: "Année / Époque",
            title: "Titre du jalon",
            description: "Description du jalon",
            order: "Ordre d'affichage",
            add: "Ajouter un jalon",
          },
          table: {
            year: "Année",
            title: "Titre",
            actions: "Actions",
          },
          success: {
            added: "Jalon ajouté",
            updated: "Jalon mis à jour",
            deleted: "Jalon supprimé",
          },
        },
        howItWorks: {
          title: "Comment ça marche",
          subtitle:
            "Votre guide complet pour gérer le panneau d'administration FestiBikutsi.",
          intro:
            "Ce guide vous aidera à comprendre chaque section du panneau d'administration et comment l'utiliser efficacement pour gérer le contenu du festival FestiBikutsi.",
          sections: {
            dashboard: {
              title: "Tableau de bord",
              desc: "Le tableau de bord est votre centre de commande. Vous avez ici une vue d'ensemble de l'ensemble des opérations du festival.",
              steps: [
                "Consultez les statistiques clés : nombre total d'artistes inscrits, approbations en attente et jours restants avant le festival.",
                "Utilisez la section Compte à rebours pour mettre à jour la date de début du festival — cela synchronise le minuteur visible par tous les visiteurs du site.",
                "Utilisez les actions rapides pour accéder directement aux gestionnaires d'artistes ou au programme.",
                'Cliquez sur "Voir le site en direct" pour prévisualiser le site public dans un nouvel onglet.',
              ],
            },
            artists: {
              title: "Gestion des Artistes",
              desc: "Le Gestionnaire d'Artistes vous permet de consulter toutes les candidatures déposées via le Portail Artiste public.",
              steps: [
                "Parcourez le tableau de tous les artistes soumis avec leur nom, genre, statut d'approbation et visibilité.",
                "Cliquez sur n'importe quelle ligne pour ouvrir un panneau latéral avec la biographie complète, les coordonnées, le lien EPK et la photo de profil de l'artiste.",
                "Utilisez la coche verte (\u2713) pour approuver un artiste — les artistes approuvés peuvent être ajoutés au programme.",
                "Utilisez l'icône \u0153il pour basculer la visibilité d'un artiste entre Publié (visible dans la programmation publique) et Brouillon (masqué).",
                "Utilisez l'icône corbeille pour supprimer définitivement un artiste de la base de données.",
                'Utilisez le bouton "Ajouter un artiste" pour ajouter manuellement un artiste avec une photo directement depuis le panneau d\'administration.',
              ],
            },
            schedule: {
              title: "Gestion du Programme",
              desc: "Le Gestionnaire de Programme vous permet de construire et gérer le calendrier des événements du festival sur plusieurs scènes et jours.",
              steps: [
                "Utilisez les onglets Jour 1 / Jour 2 / Jour 3 pour naviguer entre les jours.",
                "Remplissez le formulaire à gauche : choisissez une scène, sélectionnez le type d'événement (Performance, Atelier, Cérémonie, etc.), choisissez un artiste ou saisissez un nom d'activité, et définissez l'heure.",
                'Pour les événements de type "Performance", une liste déroulante des artistes approuvés s\'affiche automatiquement.',
                "Pour les autres types (Atelier, Cérémonie, Autre), une zone de texte libre apparaît pour saisir un titre d'événement personnalisé.",
                'Cliquez sur "Ajouter au programme" pour enregistrer le créneau.',
                "Dans la liste à droite, utilisez l'icône \u0153il pour basculer un événement entre En direct (visible au public) et Brouillon.",
                "Utilisez l'icône corbeille pour supprimer un slôt du programme.",
              ],
            },
            gallery: {
              title: "Gestion de la Galerie",
              desc: "Le Gestionnaire de Galerie contrôle toutes les photos et vidéos affichées dans la section galerie publique.",
              steps: [
                'Glissez-déposez des fichiers image ou vidéo directement n\'importe où sur la page, ou cliquez sur "Sélectionner des fichiers" pour parcourir.',
                "Une grille d'aperçu apparaît montrant les fichiers en attente de téléchargement.",
                'Cliquez sur "Tout télécharger" pour enregistrer les fichiers sur le serveur et les ajouter à la galerie.',
                "Dans la grille de la galerie, survolez n'importe quel élément pour faire apparaître les boutons d'action.",
                "Cliquez sur l'icône étoile pour marquer un élément comme En vedette (mis en avant dans la galerie publique).",
                "Cliquez sur l'icône \u0153il pour basculer la visibilité d'un élément entre publié et masqué.",
                "Cliquez sur l'icône corbeille rouge pour supprimer définitivement un média.",
              ],
            },
            history: {
              title: "Gestion de l'Histoire",
              desc: 'Le Gestionnaire d\'Histoire contrôle la chronologie des jalons affichés dans la section "Histoire du Bikutsi" sur le site public.',
              steps: [
                "La liste affiche tous les jalons existants triés par ordre d'affichage.",
                "Utilisez les flèches haut/bas sur chaque carte pour réordonner les jalons sur la page publique.",
                "Cliquez sur \"Ajouter un jalon\" pour ouvrir le formulaire où vous renseignez une Année/Époque, un Titre, une Description et un numéro d'ordre d'affichage.",
                "Cliquez sur l'icône corbeille sur un jalon pour le supprimer définitivement.",
              ],
            },
            language: {
              title: "Langue & Session",
              desc: "Le panneau d'administration prend en charge l'anglais et le français, en accord avec le site public.",
              steps: [
                "Cliquez sur l'icône globe en bas de la barre latérale pour basculer entre l'anglais (EN) et le français (FR).",
                "Le changement de langue s'applique instantanément à tous les libellés, boutons et messages du panneau d'administration et du site public.",
                "Pour vous déconnecter en toute sécurité, cliquez sur le bouton Déconnexion en bas de la barre latérale. Vous serez redirigé vers la page de connexion.",
              ],
            },
          },
          tip: {
            title: "Conseils Pro",
            items: [
              "Approuvez toujours un artiste avant de l'ajouter au programme — seuls les artistes approuvés apparaissent dans la liste déroulante du programme.",
              "Utilisez le mode Brouillon pour préparer du contenu à l'avance sans le rendre public.",
              "Le compte à rebours du festival se met à jour en temps réel pour tous les visiteurs dès que vous enregistrez une nouvelle date.",
              "Les images téléchargées sont stockées de manière permanente sur le serveur et servies instantanément.",
            ],
          },
        },
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "fr",
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
