---
id: doc6
title: "HTML 및 Primitives"
---

[component]: ../core/component.md
[entity]: ../core/entity.md

[dom]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model
[html]: https://developer.mozilla.org/docs/Learn/HTML/Introduction_to_HTML/Getting_started

이 섹션에서는 A-Frame의 기본 요소에 대한 개념과 개체-컴포넌트 프레임워크와의 관계에 대해 설명합니다.
[HTML 및 primitives 사용에 대한 가이드를 찾고 있다면*기본 장면 만들기* 가이드를 확인하세요.](../guides/building-a-basic-scene.md).

<!--toc-->

## HTML

A-Frame은 사용자 정의 요소에 polyfill을 사용하는[HTML][html] 및 [the DOM][dom]을 기반으로 합니다. 
HTML은 웹의 컴포넌트이며, 가장 접근하기 쉬운 컴퓨팅 언어 중 하나를 제공합니다. HTML을 사용하여 작성하면 텍스트만 HTML 파일에 포함되고 브라우저에서 HTML 파일을 열 수 있으므로 설치 또는 빌드 단계가 필요하지 않습니다. 대부분의 웹이 HTML을 기반으로 구축되었기 때문에 React, Vue.js, Angular, d3.js 및 jQuery를 포함한 대부분의 기존 도구 및 라이브러리는 A-Frame과 함께 작동합니다.

![HTML Scene](https://user-images.githubusercontent.com/674727/52090525-79b04d80-2566-11e9-993f-7a8b19ca25b1.png)

HTML에 대한 경험이 많지 않아도 문제 없습니다! 2D HTML보다 이해하기 훨씬 쉽습니다. HTML의 일반적인 구조나 구문(여는 태그, 속성, 닫는 태그)을 선택했다면 이제 시작할 수 있습니다!
[MDN에서 HTML에 대한 소개를 읽어 보세요.][html].

![HTML](https://user-images.githubusercontent.com/6694476/27047689-94689672-4fc6-11e7-9cf5-828a508c6522.jpg)

## Primitives

HTML 레이어는 기본적으로 보이지만 HTML과 DOM은 A-Frame의 가장 바깥쪽 추상화 레이어일 뿐입니다. 그 아래에 A-Frame은 선언적으로 노출되는 three.js에 대한 엔티티-컴포넌트 프레임워크 입니다.

A-Frame provides a handful of elements such as `<a-box>` or `<a-sky>` called
*primitives* that wrap the entity-component pattern to make it appealing for
beginners. 문서 탐색 사이드바 하단에는 A-Frame이 제공하는 모든 기본 요소를 볼 수 있습니다. 개발자는 자신만의 primitives도 만들 수 있습니다.

## 예시

다음은 몇 가지 기본 primitives를 사용하는 *Hello, WebVR* 예제입니다. A-Frame은 메쉬 생성, 360&deg; 콘텐츠 렌더링, 환경 사용자 정의, 카메라 배치등을 위한 primitives를 제공합니다.

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"></a-box>
      <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere>
      <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"></a-cylinder>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

### 확인해보기

기본 요소는 주로 신규 사용자를 위한 편의 계층 (즉, 통사당) 역할을 합니다. 
primitives는 다음과 같은 특성을 가진 `<a-entity>`에 속합니다:

- 의미론적 이름을 가짐(예: `<a-box>`)
- 기본값으로 컴포넌트에 미리 설정된 번들 보유
- [컴포넌트][component] 데이터를 HTML 속성에 매핑 또는 프록시
[assemblage]: http://vasir.net/blog/game-development/how-to-build-entity-component-system-in-javascript
[prefab]: http://docs.unity3d.com/Manual/Prefabs.html

primitives는 [Unity의 프리팹][prefab]과 유사합니다. 엔티티-컴포넌트-시스템 패턴에 대한 일부 문헌에서는 
이를[어셈블리][assemblage]라고 합니다. 핵심 엔티티 컴포넌트 API를 다음과 같이 추상화합니다:

- 지정된 기본값과 함께 유용한 컴포넌트를 미리 구성합니다.
- 복잡하지만 일반적인 유형의 엔티티(예: `<a-sky>`)에 대한 약칭 역할을 합니다.
- A-Frame은 HTML을 새로운 방향으로 전환하므로 초보자에게 친숙한 인터페이스를 제공합니다.

후드 아래에서 `<a-box>` 기본 요소는 다음과 같습니다:

```html
<a-box color="red" width="3"></a-box>
```

아래에 코드는 엔티티 컴포넌트 형식을 나타냅니다:

```html
<a-entity geometry="primitive: box; width: 3" material="color: red"></a-entity>
```

`<a-box>`는 기본적으로 `geometry.primitive` 속성을 `box`로 지정합니다. 
그리고 primitive에서는 HTML `너비` 속성을 기본 `geometry.넓이`에 매핑합니다.
기본 `material.color` 속성은 HTML 색상 속성뿐만 아니라 너비 특성도 지정합니다.

## primitive에 컴포넌트 연결

[animations]: ../core/animations.md
[mixins]: ../core/mixins.md

primitives는 `<a-entity>` 후드 아래에 있습니다. 
즉, primitive는 위치 지정, 회전, 크기 조정 및 컴포넌트 연결과 같은 엔티티와 동일한 API를 갖습니다.

### 예시

커뮤니티 물리 컴포넌트를 기본 요소에 연결해 보겠습니다.
[Don McCurdy의 `aframe-물리-시스템`](https://github.com/donmccurdy/aframe-physics-system) 소스를 포함하고 
HTML 속성을 통해 물리 컴포넌트를 첨부합니다.

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-physics-system@1.4.0/dist/aframe-physics-system.min.js"></script>
  </head>
  <body>
    <a-scene physics>
      <a-box position="-1 4 -3" rotation="0 45 0" color="#4CC3D9" dynamic-body></a-box>
      <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" static-body></a-plane>
      <a-sky color="#ECECEC"></a-sky>
    </a-scene>
  </body>
</html>
```

## Primitive 등록

AFRAME을 사용하여 우리 고유의 primitives(즉, 요소 등록)를 등록할 수 있습니다.
`AFRAME.registerPrimitive(이름, 정의)`. `name`은 문자열이며 대시(예: `'a-foo'`)를 포함해야 합니다. `definition`는 다음 속성을 정의하는 JavaScript 객체입니다:

| 속성          |   설명                                                                                                                                                                                                                                                                          | 예시                        |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|
| 기본 컴포넌트 | 기본 컴포넌트를 지정하는 객체입니다. 키는 컴포넌트의 이름이고 값은 컴포넌트의 기본  데이터입니다.    컴포넌트                                              | `{geometry: {primitive: 'box'}}`
| 매핑          | HTML 속성 이름과 컴포넌트 속성 이름 간의 매핑을 지정하는 개체입니다. HTML 속성 이름이 업데이트 될 때마다 기본 요소는 해당 컴포넌트 속성을 업데이트합니다. 컴포넌트 속성은 점 구문을 사용하여 정의됩니다. `${componentName}.${propertyName}`. | `{depth: 'geometry.depth', height: 'geometry.height', width: 'geometry.width'}`

### 예시

예를 들어, 아래는 `<a-box>` primitive에 대한 A-Frame의 등록입니다:

```js
var extendDeep = AFRAME.utils.extendDeep;

// The mesh mixin provides common material properties for creating mesh-based primitives.
// This makes the material component a default component and maps all the base material properties.
var meshMixin = AFRAME.primitives.getMeshMixin();

AFRAME.registerPrimitive('a-box', extendDeep({}, meshMixin, {
  // Preset default components. These components and component properties will be attached to the entity out-of-the-box.
  defaultComponents: {
    geometry: {primitive: 'box'}
  },

  // Defined mappings from HTML attributes to component properties (using dots as delimiters).
  // If we set `depth="5"` in HTML, then the primitive will automatically set `geometry="depth: 5"`.
  mappings: {
    depth: 'geometry.depth',
    height: 'geometry.height',
    width: 'geometry.width'
  }
}));
```

[aframe-extras]: https://github.com/donmccurdy/aframe-extras

예를 들어, Don McCurdy의 [`aframe-extras`][aframe-extras] 패키지는 
`ocean` 컴포넌트를 감싸는 `<a-ocean>` 기본 요소를 포함합니다. `<a-ocean>`에 대한 정의는 다음과 같습니다.

```js
AFRAME.registerPrimitive('a-ocean', {
  // Attaches the `ocean` component by default.
  // Defaults the ocean to be parallel to the ground.
  defaultComponents: {
    ocean: {},
    rotation: {x: -90, y: 0, z: 0}
  },

  // Maps HTML attributes to the `ocean` component's properties.
  mappings: {
    width: 'ocean.width',
    depth: 'ocean.depth',
    density: 'ocean.density',
    color: 'ocean.color',
    opacity: 'ocean.opacity'
  }
});
```

`<a-ocean>` 기본요소가 등록되면 우리는 기존의 HTML을 사용하여 바다를 만들 수 있습니다.

```html
<a-ocean color="aqua" depth="100" width="100"></a-ocean>
```
