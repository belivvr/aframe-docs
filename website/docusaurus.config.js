module.exports={
  "title": "크롱이의 도큐사우루스 마이그레이션",
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
        "src": "img/AFRAME_LOGO_TMP.webp"
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
      ]
    },
    // "image": "img/undraw_online.svg",
    // "footer": {
    //   "links": [],
    //   "copyright": "Copyright © 2021 Your Name or Your Company Name",
    //   "logo": {
    //     "src": "img/favicon.ico"
    //   }
    // }
  }
}