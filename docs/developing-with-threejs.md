---
id: doc2
title: three.js로 개발하기
---

[three.js]: http://threejs.org

[three.js]를 기반으로 하는 프레임워크 인 A-Frame은 three.js API에 대한 전체 엑세를
제공합니다. A-Frame 아래에 있는 기본 three.js장면, 개체 및 API에 엑세스하는 방법을 살펴보겠습니다.
<!-- toc -->

## A-Frame 과 three.js 장면 그래프의 관계

- A-Frame의 `<a-scene>`은 one-to-one으로 매핑합니다.
- A-Frame'의 `<a-entity>`는 하나 이상의 three.js 객체에 매핑됩니다.
- three.js의 객체는 A-Frame에서 설정한 `.el` 통해 해당 A-Frame 엔티티에 대한 참조를 갖습니다.


### 상위-하위 관계 

A-Frame 엔티티가 부모-자식 관계에 중첩되면 three.js 개체도 중첩됩니다. 이 A-Frame 장면을 예시로 들어 보겠습니다:

```html
<a-scene>
  <a-box>
    <a-sphere></a-sphere>
    <a-light></a-light>
  </a-box>
</a-scene>
```

three.js 장면 그래프는 다음과 같이 표시됩니다.

```
THREE.Scene
  THREE.Mesh
    THREE.Mesh
    THREE.Light
```

## three.js API에 엑세스

three.js는 창에서 글로벌 개체로 사용할 수 있습니다.

```js
console.log(THREE);
```

## three.js 객체로 작업

A-Frame은 three.js 위에 있는 추상화이지만 여전히 three.js를 사용하여 작동합니다. 
A-Frame의 요소에는 three.js의 장면 그래프로 연결되는 door이  있습니다.

### three.js 장명네 액세스

[scene]: https://threejs.org/docs/#api/scenes/Scene

[three.js 장면][scene]은 `<a-scene>` 요소에서 `.object3D`으로 액세스 할 수 있습니다:

```js
document.querySelector('a-scene').object3D;  // THREE.Scene
```

또한 모든 A-Frame 컴포넌트는 `.sceneEl`을 통해 `<a-scene>`에
대한 참조도 있습니다:
```js
document.querySelector('a-entity').sceneEl.object3D;  // THREE.Scene
```

[component]: ../core/component.md

[컴포넌트][component]에서 해당 엔티티를 통해 장면에 액세스 합니다:

```js
AFRAME.registerComponent('foo', {
  init: function () {
    var scene = this.el.sceneEl.object3D;  // THREE.Scene
  }
});
```

### 엔티티의 three.js 객체에 접근하기

[group]: https://threejs.org/docs/#api/objects/Group
[object3d]: https://threejs.org/docs/#api/core/Object3D

모든 A-Frame 엔티티(e.g., `<a-entity>`)는 자체적인
[`THREE.Object3D`][object3d]가지고 있다. 
더 정확히 말하면 [`THREE.Group`][group]는 다른 유형의 `Object3D`를 포함하는 그룹입니다. 
`THREE.Group`의 루트는 `.object3D`를 통해 액세스됩니다:

```js
document.querySelector('a-entity').object3D;  // THREE.Group
```

[entity]: ../core/entity.md

엔티티는 여러 유형의 `Object3D`로 구성될 수 있습니다. 
예를 들어 엔티티는 geometry 컴포넌트와 light 컴포넌트가 모두 있는 경우에 `THREE.Mesh` 및`THREE.Light` 둘다 될 수 있다:

```html
<a-entity geometry light></a-entity>
```

컴포넌트는 엔티티의 `THREE.Group` root 아래에 mesh 그리고 light를 추가합니다.
엔티티의 `.object3DMap`에  mesh와 light가 참조 되고 서로 다른 유형의 three.js 개체로 저장됩니다.

```js
console.log(entityEl.object3DMap);
// {mesh: THREE.Mesh, light: THREE.Light}
```

그러나 엔티티의 `.getObject3D(이름)`메소드를 통해 액세스할 수 있습니다:

```js
entityEl.getObject3D('mesh');  // THREE.Mesh
entityEl.getObject3D('light');  // THREE.Light
```

이제 이 three.js 객체가 처음에 어떻게 설정되었는지 봅시다.

### `Object3D` 엔티티 설정

엔티티에 `Object3D`를 설정하면 엔티티의 `Group`에 `Object3D`가 추가되어 새로 설정된 `Object3D`가 three.js 장면의 일부가 됩니다.
`Object3D`는 엔티티의 `.setObject3D(이름)` 메서드로 설정하며
여기서 이름은 `Object3D`의 용도를 나타냅니다.

예를 들어 컴포넌트 내에서 point light를 설정하려면 다음을 수행합니다.

```js
AFRAME.registerComponent('pointlight', {
  init: function () {
    this.el.setObject3D('light', new THREE.PointLight());
  }
});
// <a-entity light></a-entity>
```

우리는 `light`란 이름으로 조명을 설정합니다.
나중에 액세스하려면 앞에서 설명한 대로 엔티티의 
`.getObject3D(name)` 메서드를 사용할 수 있습니다:

```js
entityEl.getObject3D('light');
```

그리고 A-Frame 엔티티에 three.js 객체를 설정하면 , A-Frame은 `.el`을 통해 three.js  
객체에서 A-Frame 엔티티에 대한 참조를 설정합니다:

```js
entityEl.getObject3D('light').el;  // entityEl
```

또한 Object3D를 만들고 설정할 수 있는 .getOrCreateObject3D(이름, 생성자) 메서드가 있습니다. 
geometry 및 material 컴포넌트가 모두 메쉬를 가져오거나 작성해야 할 때 THREE.Mesh의 경우 일반적으로 사용됩니다.

### 엔티티에서 `Object3D` 제거 

엔티티에서 `Object3D`를 제거하고 결과적으로 three.js를 제거하려면 엔티티의 
`.removeObject3D(이름)`메소드를 사용할 수 있습니다. 
point light가 있는 예제로 돌아가서 컴포넌트를 분리할 때 light를 제거합니다.

```js
AFRAME.registerComponent('pointlight', {
  init: function () {
    this.el.setObject3D('light', new THREE.PointLight());
  },

  remove: function () {
    // Remove Object3D.
    this.el.removeObject3D('light');
  }
});
```

## 좌표 공간 간 변환

일반적으로 모든 개체와 장면(세계)에는 고유한 좌표 공간이 있습니다. 
상위 개체의 위치, 회전 및 크기 조정 변형은 하위 개체의 위치, 회전 및 크기 조정 변형에 적용됩니다. 
다음 장면을 고려하십시오:

```html
<a-entity id="foo" position="1 2 3">
  <a-entity id="bar" position="2 3 4"></a-entity>
</a-entity>
```

세계의 기준점에서 foo의 변환이 bar에 적용되기 때문에 foo는 위치(1,2,3)를 갖고 bar는 위치(3, 5, 7)를 갖습니다. 
foo의 기준점에서 foo는 위치(0, 0, 0)를 갖고 bar는 위치(2, 3, 4)를 갖습니다.

우리는 종종 기준점과 좌표 공간 사이에서 변환하려고 합니다. A위의 예는 간단한 예이지만 
bar의 위치에 대한 world-space 좌표를 구하거나 임의의 좌표를 foo의 좌표 공간으로 변환하는 
등의 작업을 수행할 수 있습니다. 3D 프로그래밍에서는  작업은 matrices로 수행되지만 three.js는 이를 더 쉽게 만드는 가이드를 제공합니다.

### local에서 world로 변환

일반적으로 상위 `Object3D`에서 `.updateMatrixWorld ()`를 호출해야 하지만 기본적으로 `Object3D.matrixAutoUpdate`는 `true`이다. 
three.js의 `.getWorldPosition (vector)` 및 `.getWorldQuaternion (quaternion)`을 사용할 수 있습니다.

`Object3D`의 world position을 가져오려면:

```js
var worldPosition = new THREE.Vector3();
entityEl.object3D.getWorldPosition(worldPosition);
```

`Object3D`의 world rotation을 가져오려면:

```js
var worldQuaternion = new THREE.Quaternion();
entityEl.object3D.getWorldQuaternion(worldQuaternion);
```

three.js `Object3D`에는 [local-to-world 변환에 사용할 수 있는 더 많은 기능이 있습니다][object3d]:

- `.localToWorld (vector)`
- `.getWorldDirection (vector)`
- `.getWorldQuaternion (quaternion)`
- `.getWorldScale (vector)`

### World 에서 Local 변환

world에서 객체의 local 공간으로 변환하는 행렬을 얻으려면 객체의 world 행렬의 역행렬을 가져옵니다.

```js
var worldToLocal = new THREE.Matrix4().getInverse(object3D.matrixWorld)
```

그런 다음 변환하려는 모든 항목에 `worldToLocal` 해당 행렬을 적용할 수 있습니다.

```js
anotherObject3D.applyMatrix(worldToLocal);
```