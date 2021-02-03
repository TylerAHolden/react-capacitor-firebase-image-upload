module.exports = {
  title: 'React Firebase Image Upload',
  tagline: 'React image upload component for firebase storage',
  url: 'https://react-capacitor-firebase-image-upload.netlify.app/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'TylerAHolden', // Usually your GitHub org/user name.
  projectName: 'react-capacitor-firebase-image-upload', // Usually your repo name.
  themeConfig: {
    announcementBar: {
      id: 'supportus',
      backgroundColor: '#222',
      textColor: '#fff',
      content:
        '⭐️ If you like React Firebase Image Upload, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/TylerAHolden/react-capacitor-firebase-image-upload">GitHub</a>! ⭐️',
    },
    colorMode: {
      // "light" | "dark"
      defaultMode: 'light',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },

    navbar: {
      title: 'React Firebase Image Upload',
      logo: {
        alt: 'React Firebase Image Upload Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        {
          href:
            'https://github.com/TylerAHolden/react-capacitor-firebase-image-upload',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'React Firebase Image Upload Logo',
        src: 'img/logo.svg',
        href: 'https://react-capacitor-firebase-image-upload.netlify.app/',
      },
      links: [
        {
          title: 'Getting Started',
          items: [
            {
              label: 'Installation',
              to: 'docs/installation',
            },
            {
              label: 'Usage',
              to: 'docs/usage',
            },
          ],
        },
        {
          title: 'Overview',
          items: [
            {
              label: 'Introduction',
              to: 'docs/',
            },
            {
              label: 'Contributing',
              to: 'docs/contributing',
            },
          ],
        },
        {
          title: 'Creators',
          items: [
            {
              label: 'Tyler Holden',
              to: 'https://github.com/TylerAHolden',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Firebase Image Upload`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/TylerAHolden/react-capacitor-firebase-image-upload/edit/master/docs/',
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   editUrl:
        //     'https://github.com/TylerAHolden/react-capacitor-firebase-image-upload/edit/master/website/blog/',
        // },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
