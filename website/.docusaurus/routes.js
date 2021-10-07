
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/aframe-docs/',
    component: ComponentCreator('/docs/aframe-docs/','9c1'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/__docusaurus/debug',
    component: ComponentCreator('/docs/aframe-docs/__docusaurus/debug','394'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/aframe-docs/__docusaurus/debug/config','4fb'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/aframe-docs/__docusaurus/debug/content','6e2'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/aframe-docs/__docusaurus/debug/globalData','ce5'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/aframe-docs/__docusaurus/debug/metadata','3c1'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/aframe-docs/__docusaurus/debug/registry','095'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/aframe-docs/__docusaurus/debug/routes','dbc'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/blog',
    component: ComponentCreator('/docs/aframe-docs/blog','719'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/blog/2016/03/11/blog-post',
    component: ComponentCreator('/docs/aframe-docs/blog/2016/03/11/blog-post','a37'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/blog/2017/04/10/blog-post-two',
    component: ComponentCreator('/docs/aframe-docs/blog/2017/04/10/blog-post-two','4a3'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/blog/2017/09/25/testing-rss',
    component: ComponentCreator('/docs/aframe-docs/blog/2017/09/25/testing-rss','6d1'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/blog/2017/09/26/adding-rss',
    component: ComponentCreator('/docs/aframe-docs/blog/2017/09/26/adding-rss','647'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/blog/2017/10/24/new-version-1.0.0',
    component: ComponentCreator('/docs/aframe-docs/blog/2017/10/24/new-version-1.0.0','254'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/blog/archive',
    component: ComponentCreator('/docs/aframe-docs/blog/archive','70b'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/docs/tags',
    component: ComponentCreator('/docs/aframe-docs/docs/tags','b2e'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/helloReact',
    component: ComponentCreator('/docs/aframe-docs/helloReact','9ed'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/help',
    component: ComponentCreator('/docs/aframe-docs/help','547'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/users',
    component: ComponentCreator('/docs/aframe-docs/users','97a'),
    exact: true
  },
  {
    path: '/docs/aframe-docs/docs',
    component: ComponentCreator('/docs/aframe-docs/docs','8dd'),
    routes: [
      {
        path: '/docs/aframe-docs/docs/',
        component: ComponentCreator('/docs/aframe-docs/docs/','20d'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc10',
        component: ComponentCreator('/docs/aframe-docs/docs/doc10','64c'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc11',
        component: ComponentCreator('/docs/aframe-docs/docs/doc11','505'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc12',
        component: ComponentCreator('/docs/aframe-docs/docs/doc12','c70'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc13',
        component: ComponentCreator('/docs/aframe-docs/docs/doc13','e8e'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc14',
        component: ComponentCreator('/docs/aframe-docs/docs/doc14','301'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc2',
        component: ComponentCreator('/docs/aframe-docs/docs/doc2','97f'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc3',
        component: ComponentCreator('/docs/aframe-docs/docs/doc3','cdf'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc4',
        component: ComponentCreator('/docs/aframe-docs/docs/doc4','3fd'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc5',
        component: ComponentCreator('/docs/aframe-docs/docs/doc5','873'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc6',
        component: ComponentCreator('/docs/aframe-docs/docs/doc6','ce4'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc7',
        component: ComponentCreator('/docs/aframe-docs/docs/doc7','100'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc8',
        component: ComponentCreator('/docs/aframe-docs/docs/doc8','044'),
        exact: true,
        'sidebar': "docs"
      },
      {
        path: '/docs/aframe-docs/docs/doc9',
        component: ComponentCreator('/docs/aframe-docs/docs/doc9','214'),
        exact: true,
        'sidebar': "docs"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
