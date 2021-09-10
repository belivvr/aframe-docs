---
id: doc10
title: JavaScript, Events, DOM APIs
examples:
  - title: A-Frame School &mdash; Getting Entities
    src: https://glitch.com/edit/#!/aframe-school-js?path=solution.html
  - title: A-Frame School &mdash; Modifying Entities
    src: https://glitch.com/edit/#!/aframe-school-js?path=solution2.html
  - title: A-Frame School &mdash; Creating Entities
    src: https://glitch.com/edit/#!/aframe-school-js?path=solution3.html
  - title: A-Frame School &mdash; Handling Events
    src: https://glitch.com/edit/#!/aframe-school-js?path=solution4.html
  - title: Animated Lights
    src: https://glitch.com/edit/#!/aframe-animated-lights?path=index.html
---

[geometry]: ../components/geometry.md
[DOM]: https://developer.mozilla.org/docs/Web/API/Document_Object_Model/Introduction
[object3d]: https://threejs.org/docs/#api/core/Object3D

A-Frame은 HTML이므로 일반적인 웹 개발에서와 같이 JavaScript and [DOM] API를 사용하여 장면과 해당 엔티티를 제어 할 수 있습니다. 

[vrjump]: http://vrjump.de

[jsimage]: https://cloud.githubusercontent.com/assets/674727/20290105/e1573210-aa92-11e6-8f1a-8a31fb6dad52.jpg
![With JavaScript][jsimage]
<small class="image-caption"><i>Image by Ruben Mueller from [The VR Jump][vrjump].</i></small>

[entity]: ../core/entity.md
장면의 모든 요소, 심지어 `<a-box>` 또는 `<a-sky>`와 같은 요소도 엔티티입니다. (`<a-entity>`로 표시됨).
A-Frame은 HTML 요소 프로토타입을 수정하여 특정 DOM API를 A-Frame에 맞춤화하는 동작을 추가합니다. 
아래에서 설명하는 대부분의 API에 대한 참조는 [Entity API 설명서][entity]를 참조하십시오.

<!--toc-->

## A-Frame용 JavaScript 코드를 배치할 위치

[A-Frame components]: ../core/component.md

**중요:** JavaScript 및 DOM API를 사용하는 다양한 방법을 살펴보기 전에 [A-frame 컴포넌트]내에 JavaScript 코드를 
캡슐화하는 방법을 규정합니다. 컴포넌트 코드를 모듈화하고, 논리와 동작을 HTML에서 볼 수 있도록 하며, 
코드가 정확한 시간에 실행되도록 합니다(예: 장면 및 엔티티가 연결 및 초기화 된 후). 
가장 기본적인 예로, `<a-scene>` *앞*에  `console.log` 컴포넌트를 등록합니다:

```js
AFRAME.registerComponent('log', {
  schema: {type: 'string'},

  init: function () {
    var stringToLog = this.data;
    console.log(stringToLog);
  }
});
```

그리고 *등록 후* HTML의 컴포넌트를 사용합니다:

```html
<a-scene log="Hello, Scene!">
  <a-box log="Hello, Box!"></a-box>
</a-scene>
```

컴포넌트는 모든 코드를 캡슐화하여 재사용이 가능하고 선언 및 공유가 가능합니다.런타임에 탐색만 한다면 브라우저의 개발자 도구 콘솔을 사용하여 현장에서 JavaScript를 실행할 수 있습니다.

[contentscripts]: ../core/scene.md#running-content-scripts-on-the-scene

기존 2D 스크립팅과 마찬가지로 `<a-scene>` 뒤에 A-Frame 관련 JavaScript를  
`<a-scene>`태그에 넣으려고 하지 마십시오. 그렇게 하면, 우리는 적절한 시간에 코드가 실행되도록 특별한 조치를 취해야 합니다. ([장면에서 콘텐츠 스크립트 실행 참조][contentscripts]).

##  Querying 및 Traversing을 통해 엔티티 가져오기 

[queryselector]: https://developer.mozilla.org/docs/Web/API/Document/querySelector
[jqueryselector]: https://api.jquery.com/category/selectors/

장면 그래프로 DOM에 대한 놀라운 점은 표준 DOM이 `.querySelector()` and `.querySelectorAll()`을 통해 이동, 쿼리, 찾기 및 선택 할수 있는 유틸리티를 제공한다는 것입니다. 원래 [jQueryselectors][jqueryselector]에서 영감을 받은 것으로 [MDN에서 쿼리 선택기에 대해 배울 수 있습니다][queryselector].

몇 가지 예제 쿼리 선택기를 실행해 보겠습니다. 아래의 장면을 예로 들어 보겠습니다.

```html
<html>
  <a-scene>
    <a-box id="redBox" class="clickable" color="red"></a-box>
    <a-sphere class="clickable" color="blue"></a-sphere>
    <a-box color="green"></a-box>
    <a-entity light="type: ambient"></a-entity>
    <a-entity light="type: directional"></a-entity>
  </a-scene>
</html>
```

### `.querySelector()` 사용

하나의 요소만 가져오려면 `.querySelector()`를 사용하여 하나의 요소를 반환합니다. 
장면 요소를 살펴보겠습니다:

```js
var sceneEl = document.querySelector('a-scene');
```

컴포넌트 내에서 작업하는 경우 쿼리할 필요 없이 장면 요소에 대한 참조가 이미 있습니다. 
모든 엔티티는 해당 장면 요소에 대한 참조를 갖습니다:

```js
AFRAME.registerComponent('foo', {
  init: function () {
    console.log(this.el.sceneEl);  // Reference to the scene element.
  }
});
```

요소에 ID가 있는 경우 ID 선택기(예: `#<ID>`). 를 사용할 수 있습니다.  
ID가 있는 빨간 상자를 잡아봅시다. 전체 문서에 대한 쿼리 선택기를 수행하기 전에.
여기서는 장면의 범위 내에서 쿼리 선택기를 수행합니다. 
쿼리 선택기를 사용하면 다음 요소 내에서 쿼리 범위를 제한할 수 있습니다:

```js
var sceneEl = document.querySelector('a-scene');
console.log(sceneEl.querySelector('#redBox'));
// <a-box id="redBox" class="clickable" color="red"></a-box>
```

### `.querySelectorAll()` 사용

요소 그룹을 가져오려면 요소 배열을 반환하는`.querySelectorAll()`을 사용합니다. 요소 이름에 대해 쿼리할 수 있습니다:

```js
console.log(sceneEl.querySelectorAll('a-box'));
// [
//  <a-box id="redBox" class="clickable" color="red"></a-box>,
//  <a-box color="green"></a-box>
// ]
```

클래스 선택기를 사용하여 클래스가 있는 요소를 쿼리할 수 있습니다(예:`.<CLASS_NAME>`). 
`clickable`클래스가 있는 모든 엔티티를 살펴보겠습니다:

```js
console.log(sceneEl.querySelectorAll('.clickable'));
// [
//  <a-box id="redBox" class="clickable" color="red"></a-box>
//  <a-sphere class="clickable" color="blue"></a-sphere>
// ]
```

속성 선택기(예: `[<ATTRIBUTE_NAME>]`)를 사용하여 
속성(또는 컴포넌트)을 포함하는 요소를 쿼리할 수 있습니다. 
라이트가 있는 모든 엔티티를 살펴보겠습니다.


```js
console.log(sceneEl.querySelectorAll('[light]'));
// [
//  <a-entity light="type: ambient"></a-entity>
// <a-entity light="type: directional"></a-entity>
// ]
```

### `.querySelectorAll()`를 사용하여 엔티티를 반복하기
`.querySelectorAll()`을 사용하여 엔티티 그룹을 가져온 경우,
 `for`루프를 사용하여 엔티티를 반복할 수 있습니다. 
`*`로 장면의 모든 요소를 루핑합니다.

```js
var els = sceneEl.querySelectorAll('*');
for (var i = 0; i < els.length; i++) {
  console.log(els[i]);
}
```

#### 성능에 대한 참고 사항

`.querySelector` 및 `.querySelectorAll`은 엔티티를 검색하기 위해 DOM을 루핑하는 
데 시간이 걸리므로 모든 프레임에서 호출되는 `tick` 및 `talk`함수에 사용하지 마십시오. 
대신 캐시된 엔티티 목록을 유지하고 쿼리 선택기를 미리 호출한 다음 반복합니다.

```js
AFRAME.registerComponent('query-selector-example', {
  init: function () {
    this.entities = document.querySelectorAll('.box');
  },
  
  tick: function () {
    // Don't call query selector in here, query beforehand.
    for (let i = 0; i < this.entities.length; i++) {
      // Do something with entities.
    }
  }
});
```

## Retrieving Component Data with `.getAttribute()`

`.getAttribute`를 통해 엔티티 컴포넌트의 데이터를 가져올 수 있습니다. 
A-Frame `.getAttribute`은 문자열이 대신 값을 반환합니다.(예: 컴포넌트는
일반적으로 여러 속성으로 구성되기 때문에 대부분의 경우 객체를 반환하거나
`.getAttribute('visible')`에 대한 실제 부울을 반환합니다. 종종
`.getAttribute`는 컴포넌트의 내부 데이터 객체를 반환하므로 개체를 직접 수정하지 마십시오.

```js
// <a-entity geometry="primitive: sphere; radius: 2"></a-entity>
el.getAttribute('geometry');
// >> {"primitive": "sphere", "radius": 2, ...}
```

### `position` 및 `scale` 검색

[vector3]: https://threejs.org/docs/#api/math/Vector3
[updatepos]: #updating-position-rotation-scale-visible

`el.getAttribute('position')` 또는 `el.getAttribute('scale')`를 실행하면
[Vector3][vector3]s인 three.js [Object3D][object3d] 위치와 크기 속성이
반환됩니다.
이러한 개체를 수정하면 실제 엔티티 데이터가 수정된다는 점 유의하십시오.

그 이유는 A-Frame을 사용하면 [위치,회전, 크기를 수정할 수 있으며][updatepos] 
`.getAttribute`가 올바른 데이터를 반환하기 위해 A-Frame이 실제 three.js OBject3D 개체를 반환하기 때문입니다.

이것은 `.getAttribute('회전')`의 경우 해당되지 않습니다. A-Frame은 좋든 나쁘든 라이단 대신 도를
사용하기 때문입니다. 이러한 경우 x/y/z 속성이 있는 일반 JavaScript 개체가 반환됩니다.
더 낮은 수눚에서 작업해야 하는 경우 `el.object3D.회전`을 통해 Object3D 오일러를 통해 검색할 수 있습니다.

## A-Frame 장면 그래프 수정

JavaScript 및 DOM API를 사용하면 일반 HTML 요소와 마찬가지로 엔티티를 
동적으로 추가 및 제거할 수 있습니다.

### `.createElement()` 사용하여 엔티티 만들기

엔티티를 생성하기 위해 `document.createElement`를 사용할 수 있습니다. 이렇게 하면
빈 엔티티가 생성이 됩니다:

```js
var el = document.createElement('a-entity');
```

그러나 이 엔티티는 장면에 연결할 때까지 초기화 되지 않거나 장면에 
포함되지 않습니다.

### `.appendChild()`를 사용하여 엔티티 추가

DOM에 엔티티를 추가하려면 `.appendChild(element)`를 사용합니다. 구체적으로
장면에 추가를 하고 싶습니다. 장면을 캡쳐하고 엔티티를 만든 다음 해당 엔티티를
장면에 추가합니다.
```js
var sceneEl = document.querySelector('a-scene');
var entityEl = document.createElement('a-entity');
// Do `.setAttribute()`s to initialize the entity.
sceneEl.appendChild(entityEl);
```

`.appendChild()`는 브라우저의 *비동기* 작업입니다. Until
엔티티가 DOM에 추가되기 전까지 엔티티에 대해 많은 작업을 수행 할 수 없습니다. (예:`.getAttribute()`를 호출합니다). 
방금 추가된 엔티티에 대한 속성을 쿼리해야 하는 경우 엔티티에서 `로드된` 이벤트를 수신 하거나
A-Frame 컴포넌트에 로직을 배치하여 준비가 되면 실행하도록 할 수 있습니다.

```js
var sceneEl = document.querySelector('a-scene');

AFRAME.registerComponent('do-something-once-loaded', {
  init: function () {
    // This will be called after the entity has properly attached and loaded.
    console.log('I am ready!');
  }
});

var entityEl = document.createElement('a-entity');
entityEl.setAttribute('do-something-once-loaded', '');
sceneEl.appendChild(entityEl);
```

### `.removeChild()`을 사용하여 엔티티 제거

DOM과 장면에서 엔티티를 제거하기 위해 부모 요소에서`.removeChild(element)`를 호출합니다. 
엔티티가 있는 경우 상위(`부모 요소`)에게 엔티티를 제거 하도록 요청해야 합니다.

```js
entityEl.parentNode.removeChild(entityEl);
```

## 엔티티 수정

빈 엔티티는 아무 작동도 하지 않습니다. 컴포넌트를 추가하고 컴포넌트 속성을 구성하고 
컴포넌트를 제거하여 엔터티를 수정할 수 있습니다.

### `.setAttribute()`을 사용하여 컴포넌트 추가

컴포넌트를 추가할면 `.setAttribute(컴포넌트 이름, 데이터)`를 사용합니다. 엔티티에 
지오메트리 컴포넌트를 추가해 보겠습니다.

```js
entityEl.setAttribute('geometry', {
  primitive: 'box',
  height: 3,
  width: 1
});
```

[physics]: https://github.com/donmccurdy/aframe-physics-system

또는 [커뮤니티 물리 컴포넌트][physics]를 추가합니다:

```js
entityEl.setAttribute('dynamic-body', {
  shape: 'box',
  mass: 1.5,
  linearDamping: 0.005
});
```

[setattr]:  ../core/entity.md#setattribute-attr-value-componentattrvalue

일반 HTML `.setAttribute()`과 달리 `.setAttribute()`는 개체와 같은 다양한 유형의
인수를 취하거나 컴포넌트의 단일 속성을 업데이트 할 수 있도록 개선되었습니다. 
 [`Entity.setAttribute()`에 대해 자세히 읽어보세요][setattr].

### `.setAttribute()`로 컴포넌트 업데이트

컴포넌트를 업데이트 하기 위해서 `.setAttribute()`도 사용합니다. 컴포넌트
업데이트는 여러 형태를 취합니다.

#### 단일 속성 컴포넌트의  속성 업데이트

[position]: ../components/position.md

단일 속성 컴포넌트인 [위치 컴포넌트][position]의 속성을 업데이트 해보겠습니다.
객체나 문자열을 전달 할 수 있습니다. A-Frame이 문자열을 구문 분석할 필요가 없도록 
개체를 전달하는 것이 약간 선호됩니다.

```js
entityEl.setAttribute('position', {x: 1, y: 2, z: -3});
// Read on to see why `entityEl.object3D.position.set(1, 2, -3)` is preferred though.
```

#### 다중 속성의 컴포넌트의 단일 속성 업데이트

[material]: ../components/material.md

다중 속성 컴포넌트 인[material 컴포넌트][material]의 단일 속성을 업데이트 해보겠습니다. 
컴포넌트 이름, 속성 이름 및 속성 값을 `.setAttribute()`에 제공하여 이를 수행합니다:

```js
entityEl.setAttribute('material', 'color', 'red');
```

#### 다궁 속성 컴포넌트의 여러 속성 업데이트

[light]: ../components/light.md

다중 컴포넌트인 [light 컴포넌트][material]의 여러 속성을 한 번에 업데이트 하겠습니다. 
컴포넌트 이름과 속성 개체를 `.setAttribute()`에 제공하여 이 작업을 수행합니다. 
조명의 색상과 명암은 변경하되 타입은 동일하게 유지합니다.

```js
// <a-entity light="type: directional; color: #CAC; intensity: 0.5"></a-entity>
entityEl.setAttribute('light', {color: '#ACC', intensity: 0.75});
// <a-entity light="type: directional; color: #ACC; intensity: 0.75"></a-entity>
```

#### `position`, `rotation`, `scale`, 및 `visible` 업데이트.

유틸리티에 대한 더 나은 성능, 메모리 및 접근을 위한 특별한 경우로서 
`.setAttribute`를 경유하지 않고 엔티티의 [Object3D][object3d]를 통해
`position`, `rotation`, `scale`, 및 `visible` 표시 상태를 직접
수정하는 것을 권장합니다:

```js
// Examples for position.
entityEl.object3D.position.set(1, 2, 3);
entityEl.object3D.position.x += 5;
entityEl.object3D.position.multiplyScalar(5);

// Examples for rotation.
entityEl.object3D.rotation.y = THREE.Math.degToRad(45);
entityEl.object3D.rotation.divideScalar(2);

// Examples for scale.
entityEl.object3D.scale.set(2, 2, 2);
entityEl.object3D.scale.z += 1.5;

// Examples for visible.
entityEl.object3D.visible = false;
entityEl.object3D.visible = true;
```

이렇게 하면`.setAttribute` 오버헤드를 건너뛰고 대신 가장 일반적으로 업데이트 되는 컴포넌트의 속성을 
간단하게 설정 할 수 있습니다. 
`entityEl.getAttribute('position');`를 수정할 때 three.js 
수준의 업데이트는 계속 반영됩니다.

#### 다중 특성 컴포넌트의 속성 바꾸기

다중 특성 컴포넌트인 [geometry 컴포넌트][geometry]의 모든 속성을 
교체해 보겠습니다. 컴포넌트 이름, `.setAttribute()`에 속성 개체 및 기존 속성을 방해하도록 지정하는
플래그를 제공하여 이를 수행합니다. geometry의 모든 기존 속성을 새 속성으로 바꿉니다:


```js
// <a-entity geometry="primitive: cylinder; height: 4; radius: 2"></a-entity>
entityEl.setAttribute('geometry', {primitive: 'torusKnot', p: 1, q: 3, radiusTubular: 4}, true);
// <a-entity geometry="primitive: torusKnot; p: 1; q: 3; radiusTubular: 4"></a-entity>
```

### `.removeAttribute()`을 사용하여 컴포넌트 제거

엔티티에서 컴포넌트소를 제거하느라 분리하기 위해 
`.removeAttribute(컴포넌트이름)`를 사용할 수 있습니다. 
카메라 엔티티에서 `wasd-controls`을 제거해 보겠습니다.

```js
var cameraEl = document.querySelector('[camera]');
cameraEl.removeAttribute('wasd-controls');
```

## 이벤트 및 이벤트 리스너

[eventlistener]: http://javascript.info/tutorial/introduction-browser-events

JavaScript와 DOM을 사용하면 엔터티와 컴포넌트소가 서로 통신할 수 있는 쉬운 방법이 있습니다. 
바로 이벤트와 이벤트 리스너입니다. 이벤트는 다른 코드가 수신하여 응답할 수 있는
신호를 보내는 방법입니다. [브라우저 이벤트에 대해 자세히 알아보세요][eventlistener].

### `.emit()`로 이벤트 발생

A-Frame 요소는 `.emit(eventName, eventDetail, bubbles)`를 통해 사용자 지정 이벤트를
쉽게 내보낼 수 있습니다. 예를 들어, 물리 컴포넌트를 만들고 있는데 다른 컴포넌트와
충돌했을 때 엔티티가 신호를 보내길 원한다고 가정해 보겠습니다.

```js
entityEl.emit('physicscollided', {collidingEntity: anotherEntityEl}, false);
```

그러면 코드의 다른 부분이 이 이벤트를 기다리고 수신 대기하고 응답에 따라 
코드를 실행 할 수 있습니다. 두 번째 인수로 이벤트 세부 정보를 통해 
정보와 데이터를 전달 할 수 있습니다. 또한 이벤트 *bubbles*를 지정하여 상위 엔티티도
이벤트를 내보낼지 여부를 지정할 수 있습니다. 따라서 코드의 다른 부분은 
이벤트 리스너를 등록할 수 있습니다.

### `.addEventListener()`를 사용하여 이벤트 리스너 추가

일반 HTML 요소와 마찬가지로 이벤트 리스너를 `.addEventListener(eventName, function)`에
등록할 수 있습니다. 리스너가 등록된 이벤트가 발생하면 함수가 호출되어 이벤트를 처리합니다. 
예를 들어, 물리 충돌 이벤트로 이전 예제부터 계속하면 다음과 같습니다:

```js
entityEl.addEventListener('physicscollided', function (event) {
  console.log('Entity collided with', event.detail.collidingEntity);
});
```

엔티티가 `physicscollided` 이벤트를 내 보내면 이벤트 개체와 함께 함수가 호출됩니다. 
특히 이벤트 개체에는 이벤트를 통해 전달된 데이터와 정보가 포함된 이벤트 세부 정보가 있습니다.

### `.removeEventListener()`를 사용하여 이벤트 수신기 제거

일반 HTML 요소와 마찬가지로 이벤트 수신기를 제거 하려면
`.removeEventListener(eventName, function)`를 사용합니다. 
사용자가 등록한 것과 동일한 이벤트 이름과 함수를 전달해야 합니다.  
예를 들어, 물리 충돌 이벤트로 이전 예제부터 계속하면 다음과 같습니다:

```js
// We have to define this function with a name if we later remove it.
function collisionHandler (event) {
  console.log('Entity collided with', event.detail.collidingEntity);
}

entityEl.addEventListener('physicscollided', collisionHandler);
entityEl.removeEventListener('physicscollided', collisionHandler);
```

## 주의 사항

[faq]: ./faq.md#why-is-the-html-not-updating-when-i-check-the-browser-inspector
[mutation-observer]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
[attr-selectors]: https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors

A-Frame 엔티티 및 프리미티브는 일부 HTML API가 예상대로 작동하지 않을 수 있도록
[성능을 향상][faq] 시키는 방식으로 구현 됩니다.
예를 들어 [값을 포함하는 속성 선택기는][attr-selectors] 작동하지 않으며 개체의 컴포넌트가
변경될 때[mutation observer][mutation-observer]는 변경을 트리거 하지 않습니다.
