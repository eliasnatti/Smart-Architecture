// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/Smart-Architecture/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/Smart-Architecture/blog/";
          },
        },{id: "nav-research",
          title: "research",
          description: "Active research programs, papers, and experimental results.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/Smart-Architecture/research/";
          },
        },{id: "post-the-first-pass-is-a-subspace-estimator",
        
          title: "The First Pass Is a Subspace Estimator",
        
        description: "Y-by-X, trees, and L1+L2 regression are all subspace estimators with different priors. L1+L2&#39;s coefficient vector reads as the Plücker basis the engineer needs to act on — and the basis hands back the 2D views worth plotting next.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/Smart-Architecture/blog/2026/the-first-pass-is-a-subspace-estimator/";
          
        },
      },{id: "post-what-y-by-x-cannot-see",
        
          title: "What Y-by-X Cannot See",
        
        description: "Plücker coordinates as a second-tier tool for the structure Y-by-X is built to miss.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/Smart-Architecture/blog/2026/what-y-by-x-cannot-see/";
          
        },
      },{id: "post-flag-manifolds-in-the-fab",
        
          title: "Flag Manifolds in the Fab",
        
        description: "The nested constraint structure of semiconductor manufacturing is a flag manifold. Almost no ML model deployed in this industry knows that.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/Smart-Architecture/blog/2026/flag-manifolds-in-the-fab/";
          
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%65%6E%61%74%74%69@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/elias-natti-ba70a397", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
