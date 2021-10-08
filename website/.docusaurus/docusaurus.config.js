export default {
  "title": "Aframe undefined",
  "tagline": "A Aframe Korea site for koreans",
  "url": "https://aframe.belivvr.com",
  "baseUrl": "/docs/aframe-docs/",
  "organizationName": "facebook",
  "projectName": "aframe-docs",
  "scripts": [
    "https://buttons.github.io/buttons.js"
  ],
  "favicon": "img/AFRAME_LOGO_TMP.webp",
  "customFields": {
    "users": [
      {
        "caption": "User1",
        "image": "img/undraw_open_source.svg",
        "infoLink": "https://www.facebook.com",
        "pinned": true
      }
    ]
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "homePageId": "doc1",
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "editUrl": "https://github.com/belivvr/aframe-docs/blob/master/docs/",
          "path": "..\\docs",
          "sidebarPath": "..\\website\\sidebars.json"
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": "..\\src\\css\\customTheme.css"
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    "navbar": {
      "logo": {
        "src": "img/AFRAME_LOGO_TMP.webp",
        "href": "https://developers.belivvr.com/"
      },
      "items": [
        {
          "to": "docs/",
          "label": "Docs",
          "position": "right"
        },
        {
          "href": "https://github.com/belivvr/aframe-docs",
          "label": "Github",
          "position": "right"
        },
        {
          "to": "docs/doc4",
          "label": "API",
          "position": "right"
        },
        {
          "to": "/help",
          "label": "Help",
          "position": "right"
        },
        {
          "to": "/blog",
          "label": "Blog",
          "position": "right"
        }
      ],
      "hideOnScroll": false
    },
    "colorMode": {
      "defaultMode": "light",
      "disableSwitch": false,
      "respectPrefersColorScheme": false,
      "switchConfig": {
        "darkIcon": "🌜",
        "darkIconStyle": {},
        "lightIcon": "🌞",
        "lightIconStyle": {}
      }
    },
    "docs": {
      "versionPersistence": "localStorage"
    },
    "metadatas": [],
    "prism": {
      "additionalLanguages": []
    },
    "hideableSidebar": false
  },
  "baseUrlIssueBanner": true,
  "i18n": {
    "defaultLocale": "en",
    "locales": [
      "en"
    ],
    "localeConfigs": {}
  },
  "onDuplicateRoutes": "warn",
  "themes": [],
  "titleDelimiter": "|",
  "noIndex": false
};