---
id: doc14
title: "구성 요소 작성"
---

[component]: ../core/component.md
[ecs]: ../introduction/entity-component-system.md
[emit]: ./javascript-events-dom-apis.md#emitting-an-event-with-emit

A-Frame의 [entity-component framework][ecs] 의 구성요소는 자바스크립트 모듈로서, entity에
혼합,매치, 구성하여 외관, 행동, 기능성들을 만들수 있습니다. 자바스크립트에 컴포넌트를 등록하여
DOM에서 선언적으로 사용할 수 있습니다. A-Frame 애플리케이션의 대부분의 코드는 구성요소 내에 
있어야 합니다.

[vehicleimage]: https://cloud.githubusercontent.com/assets/674727/21803890/0d44f0c2-d6e1-11e6-8b4f-7fb14c05a492.jpg
![vehicleimage]
<small class="image-caption"><i>Image by Ruben Mueller from vrjump.de</i></small>

이 가이드는 느리게 진행 할 것이며, 보기전에 [Component API documentation][component] 를 
읽어보는게 좋고, 문서화는 간결해질 것 입니다. 구성요소를 정의하려면 먼저 `<a-scene>` 을
사용합니다:

```html
<html>
  <head>
    <script src="foo-component.js"></script>
  </head>
  <body>
    <script>
      // Or inline before the <a-scene>.
      AFRAME.registerComponent('bar', {
        // ...
      });
    </script>

    <a-scene>
    </a-scene>
  </body>
</html>
```

[learning]: #learning-through-components-in-ecosystem

우리는 구성요소를 쓰는 것에 대해 검토할 것 입니다. 이 예시는 사소한 일들을 할것이지만,
데이터 흐름,API,그리고 사용법을 보여줄 것입니다. 비독점 구성요소의 예를 보면
[Learning Through Coponents in Ecosystem section][learning]. 학습 부분을 참고하세요.

<!-- toc -->

## 예시: `hello-world` Component

[init]: ../core/component.md#init

가장 기본적인 구성 요소부터 시작해서 일반적인 아이디어를 얻도록 합시다.
구성요소의 도면요소가 사용중인 경우 간단한 메시지를 한번 기록합니다 
[`.init()` handler][init].

### 컴포넌트 등록 `AFRAME.registerComponent`

`AFRAME.registerComponent()` 구성요소가 등록이 됩니다. 구성요소의 일므을 전달하고,
이름은 구성요소의 HTML 속성 이름으로 사용됩니다. DOM의 표현입니다.
그런 다음 메서드와 속성의 자바스크립트 객체인 **component definition**를 통과 시킵니다.
정의 내에서 **lifecycle handler methods**을 정의할 수 있고, 구성요소가 처음 해당
도면요소에 연결될 때 한 번 호출됩니다. 그 중 하나는 [`.init()`][init] 입니다.

아래 예에서 우리는 단지 지정한 `.init()` 핸들러를 간단한 메시지를 기록합니다.

```js
AFRAME.registerComponent('hello-world', {
  init: function () {
    console.log('Hello, World!');
  }
});
```

### HTML에서 구성 요소 사용
HTML 속성으로 `hello-world`을 선언적으로 사용할 수 있다.

```html
<a-scene>
  <a-entity hello-world></a-entity>
</a-scene>
```
entity가 연결되고 초기화되면 우리는 초기화를 할 것입니다. entity가 준비된 후에만 호출됩니다.
**We don't have to worry about waiting for the scene or entity to set up** 바로 작동이 되서 콘솔을 확인하면 `Hello, World!` 씬(scene)이 시작되고 장면이 끝난 후 한 번 기록이 될것입니다.

### JS에서 구성 요소 사용
정적 HTML을 통해 구성요소를 설정하는 것이 아니라 구성요소를 설정하는 또 다른 방법인비낟.
장면 오소는 구성 요소를 취하는 것이 가능하며, `.setAttribute()` 씬(scene) 요소도 사용
할 수 있고, 우리가 만든 `hello-world` 구성요소를 프로그램적으로 장면에 설정할 수 있습니다.


```js
document.querySelector('a-scene').setAttribute('hello-world', '');
```

## 예시: `log` 구성요소
`hello-world` 컴포넌트와 비슷한 `log` 구성요소를 만들 수 있습니다.
 `console.log` 사용 하면 되며, 더 많은 `console.log`를 할 수 있게 됩니다.
`hello-world` 라는 것 보다 `log` 구성 요소는 어떤 문자열이든 기록할 것입니다.
우리는 정의를 통해 데이터를 구성요소에 전달하는 방법을 찾습니다. 스키마를 통해 구성
가능한 속성입니다.


### 스키마로 속성 정의
**스키마**는 구성 요소의 **속성**을 정의합니다. 비유하자면
구성 요소를 함수로 생각하면 구성 요소의 속성은 다음과 함수 인수 와 같습니다.
속성에는 이름이 있습니다(구성 요소에
하나의 속성), 기본값 및 **속성 유형**. 속성 유형 정의
데이터가 문자열로 전달된 경우(즉, DOM에서) 데이터가 구문 분석되는 방식입니다.

`log` 구성요소의 경우 다음을 통해 `message` 속성 유형을 정의합니다.
'스키마'. `message` 속성 유형은 `string` 속성 유형을 가지며 기본값은 
`Hello, World!`입니다.

```js
AFRAME.registerComponent('log', {
  schema: {
    message: {type: 'string', default: 'Hello, World!'}
  },
  // ...
});
```

### 라이프사이클 핸들러의 속성 데이터 사용

`string` 속성 유형은 들어오는 데이터에 대해 구문 분석을 수행하지 않으며,
라이프사이클 메소드 핸들러에 그대로 전달하십시오. 이제 `console.log`를 실행해 보겠습니다.
`message` 속성 유형입니다. `hello-world` 구성 요소와 마찬가지로 `.init()`를 작성합니다.
하지만 이번에는 하드코딩된 문자열을 기록하지 않습니다. 구성 요소의
속성 유형 값은 `this.data`를 통해 사용할 수 있습니다. 그럼 로그에 기록을 해봅시다.
`this.data.message`!

```js
AFRAME.registerComponent('log', {
  schema: {
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    console.log(this.data.message);
  }
});
```

[inlinecss]: http://webdesign.about.com/od/beginningcss/qt/tipcssinlinesty.htm

그런 다음 HTML에서 구성 요소를 entity에 연결할 수 있습니다. 다중 속성의 경우
구성 요소에서 구문은 [inline css styles][inlinecss](속성
`:` 및 `;`로 구분된 속성):

```html
<a-scene>
  <a-entity log="message: Hello, Metaverse!"></a-entity>
</a-scene>
```

### 속성 업데이트 처리

지금까지 한 번만 호출되는 `.init()` 초기 속성만 있는 구성 요소 수명 주기 시작 시 한번
호출 되는 핸들러만 사용했습니다. 그러나 구성 요소의 속성은 동적으로 업데이트되는 경우가
많습니다. 우리는 사용할 수 있습니다 속성 업데이트를 처리하는 `.update()` 핸들러를.


[methodsimage]: https://cloud.githubusercontent.com/assets/674727/21803913/2966ba7e-d6e1-11e6-9179-8acafc87540c.jpg
![methodsimage]
<small class="image-caption"><i>라이프사이클 메서드 핸들러. Image by Ruben Mueller from vrjump.de</i></small>


이를 보여주기 위해 `log` 구성요소가 entity [이벤트를 방출][emit]합니다.
먼저 'event' 속성 유형을 추가합니다. 구성 요소가 수신 대기해야 하는 이벤트를 지정합니다.


```js
// ...
schema: {
  event: {type: 'string', default: ''},
  message: {type: 'string', default: 'Hello, World!'},
},
// ...
```

[addeventlistener]: ./javascript-events-dom-apis.md#adding-an-event-listener-with-addeventlistener

그런 다음 실제로 모든 것을 `.init()` 핸들러에서
`.update()` 핸들러. `.update()` 핸들러도 호출 직후에 호출됩니다.
컴포넌트가 첨부될 때 `.init()`. 때때로 우리는 대부분의 논리를 가지고 있습니다.
`.update()` 핸들러에서 초기화할 수 있도록 *및* 모든 업데이트를 처리할 수 있습니다.

우리가 하고싶은 것은 [add an event listener][addeventlistener]입니다.
메시지를 기록하기 전에 이벤트를 수신합니다. 'event' 속성 유형이
지정하지 않으면 메시지만 기록합니다.

```js
AFRAME.registerComponent('log', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  update: function () {
    var data = this.data;  // Component property values.
    var el = this.el;  // Reference to the component's entity.

    if (data.event) {
      // This will log the `message` when the entity emits the `event`.
      el.addEventListener(data.event, function () {
        console.log(data.message);
      });
    } else {
      // `event` not specified, just log the message.
      console.log(data.message);
    }
  }
});
```

[remove an event listener]: ./javascript-events-dom-apis.md#removing-an-event-listener-with-removeeventlistener

이제 이벤트 리스너 속성을 추가했으므로 실제 속성 업데이트.
'event' 속성 유형이 변경되면(예:`.setAttribute()`), 이전
이벤트 리스너를 제거하고 추가해야 합니다.

그러나 [이벤트 리스너를 제거]하려면 함수에 대한 참조가 필요합니다. 그래서
첨부할 때마다 먼저 `this.eventHandlerFn`에 함수를 저장합시다.
이벤트 리스너. `this`를 통해 구성 요소에 속성을 첨부하면
다른 모든 수명 주기 처리기에서 사용할 수 있습니다.

```js
AFRAME.registerComponent('log', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    // Closure to access fresh `this.data` from event handler context.
    var self = this;

    // .init() is a good place to set up initial state and variables.
    // Store a reference to the handler so we can later remove it.
    this.eventHandlerFn = function () { console.log(self.data.message); };
  },

  update: function () {
    var data = this.data;
    var el = this.el;

    if (data.event) {
      el.addEventListener(data.event, this.eventHandlerFn);
    } else {
      console.log(data.message);
    }
  }
});
```
이제 이벤트 핸들러 함수가 저장되었습니다. 이벤트를 제거할 수 있습니다.
'event' 속성 유형이 변경될 때마다 리스너. 업데이트만 하고 싶습니다.
'event' 속성 유형이 변경될 때 이벤트 리스너. 이것을 확인하여
`.update()` 핸들러가 제공하는 `oldData` 인수에 대한 `this.data` 작성하세요:


```js
AFRAME.registerComponent('log', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    var self = this;
    this.eventHandlerFn = function () { console.log(self.data.message); };
  },

  update: function (oldData) {
    var data = this.data;
    var el = this.el;

    // `event` updated. Remove the previous event listener if it exists.
    if (oldData.event && data.event !== oldData.event) {
      el.removeEventListener(oldData.event, this.eventHandlerFn);
    }

    if (data.event) {
      el.addEventListener(data.event, this.eventHandlerFn);
    } else {
      console.log(data.message);
    }
  }
});
```

업데이트 이벤트 리스너로 구성 요소를 테스트해 보겠습니다. 다음의 장면입니다.

```html
<a-scene>
  <a-entity log="event: anEvent; message: Hello, Metaverse!"></a-entity>
</a-scene>
```

entity가 [emit the event][emit]하여 테스트해 보겠습니다.

```js
var el = document.querySelector('a-entity');
el.emit('anEvent');
// >> "Hello, Metaverse!"
```

이제 `.update()` 핸들러를 테스트하기 위해 이벤트를 업데이트하겠습니다.


```js
var el = document.querySelector('a-entity');
el.setAttribute('log', {event: 'anotherEvent', message: 'Hello, new event!'});
el.emit('anotherEvent');
// >> "Hello, new event!"
```

### 구성 요소 제거

[remove]: ./javascript-events-dom-apis.md#removing-a-component-with-removeattribute

[구성요소가 entity에서 분리][remove]인 경우를 처리해 보겠습니다.
(즉, `.removeAttribute('log')`). `.remove()` 핸들러를 구현할 수 있습니다.
구성 요소가 제거될 때 호출됩니다. 'log' 구성요소의 경우
entity에 연결된 구성 요소의 모든 이벤트 리스너를 제거합니다.

```js
AFRAME.registerComponent('log', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  init: function () {
    var self = this;
    this.eventHandlerFn = function () { console.log(self.data.message); };
  },

  update: function (oldData) {
    var data = this.data;
    var el = this.el;

    if (oldData.event && data.event !== oldData.event) {
      el.removeEventListener(oldData.event, this.eventHandlerFn);
    }

    if (data.event) {
      el.addEventListener(data.event, this.eventHandlerFn);
    } else {
      console.log(data.message);
    }
  },

  /**
   * Handle component removal.
   */
  remove: function () {
    var data = this.data;
    var el = this.el;

    // Remove event listener.
    if (data.event) {
      el.removeEventListener(data.event, this.eventHandlerFn);
    }
  }
});
```
이제 제거 핸들러를 테스트해 보겠습니다. 구성 요소를 제거하고 확인해보자
이벤트를 내보내는 것은 더 이상 아무것도 하지 않습니다:

```html
<a-scene>
  <a-entity log="event: anEvent; message: Hello, Metaverse!"></a-entity>
</a-scene>
```

```js
var el = document.querySelector('a-entity');
el.removeAttribute('log');
el.emit('anEvent');
// >> Nothing should be logged...
```

### 구성 요소의 다중 인스턴스 허용

[multiple]: ../core/component.md#multiple

동일한 entity에 여러 '로그' 구성 요소를 연결하도록 허용해 보겠습니다
따라서 [`.multiple` 플래그가 있는 다중 인스턴스][multiple]를 활성화합니다.
'true'로 작성하세요.


```js
AFRAME.registerComponent('log', {
  schema: {
    event: {type: 'string', default: ''},
    message: {type: 'string', default: 'Hello, World!'}
  },

  multiple: true,

  // ...
});
```


다중 인스턴스 구성 요소의 속성 이름 구문에는 ID 접미사가 있는 이중 밑줄인
`<COMPONENTNAME>__<ID>` 형식입니다. 아이디 우리가 무엇을 선택하든 될 수 있습니다.
예를 들어 HTML에서:

```html
<a-scene>
  <a-entity log__helloworld="message: Hello, World!"
            log__metaverse="message: Hello, Metaverse!"></a-entity>
</a-scene>
```

Or from JS:

```js
var el = document.querySelector('a-entity');
el.setAttribute('log__helloworld', {message: 'Hello, World!'});
el.setAttribute('log__metaverse', {message: 'Hello, Metaverse!'});
```

구성 요소 내에서 원하는 경우 서로 다른 인스턴스를 구분할 수 있습니다.
`this.id`와 `this.attrName`을 사용합니다. `log__helloworld`가 주어지면 `this.id`는
'helloworld'가 되고 'this.attrName'은 전체 'log__helloworld'가 됩니다.

그리고 기본 'log' 구성 요소가 있습니다!

## 예시: `box` 구성요소

[usingthree]: ./developing-with-threejs.md

예를 들어 3D 개체를 추가하고 [use three.js][usingthree] 구성 요소를
작성하여 장면 그래프를 만듭니다. 아이디어를 얻기 위해, 기본 '상자' 구성 
요소를 만들 것입니다. geometry과 material.

[geometry]: ../components/geometry.md
[material]: ../components/material.md

[boximage]: https://cloud.githubusercontent.com/assets/674727/20326452/b7f94966-ab3d-11e6-95e1-47cabf425278.jpg
![boximage]
<small class="image-caption"><i>Image by Ruben Mueller from vrjump.de</i></small>


**참고:** 이것은 `Hello, World!` 구성요소를 작성하는 것과 동일한 3D에 불과합니다.
A-Frame은 다음과 같은 경우 [geometry][geometry] 및 [material][material] 구성 요소를 제공합니다.


### 스키마 및 API

스키마부터 시작하겠습니다. 스키마는 구성 요소의 API를 정의합니다.
'width', 'height', 'depth', 'color'를 속성을 통해 구성할 수 있습니다.
'width', 'height' 및 'depth'는 숫자 유형입니다(즉, float) 기본값은 1미터입니다.
'색상' 유형에는 색상 유형이 있습니다.

```js
AFRAME.registerComponent('box', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    color: {type: 'color', default: '#AAA'}
  }
});
```
나중에 HTML을 통해 이 구성 요소를 사용할 때 구문은 다음과 같습니다.

```html
<a-scene>
  <a-entity box="width: 0.5; height: 0.25; depth: 1; color: orange"
            position="0 0 -5"></a-entity>
</a-scene>
```

### Box Mesh 작성

[mesh]: https://threejs.org/docs/index.html#Reference/Objects/Mesh
[threegeometry]: https://threejs.org/docs/index.html#Reference/Geometries/BoxBufferGeometry
[threematerial]: https://threejs.org/docs/index.html#Reference/Materials/MeshStandardMaterial
[setobject3d]: ./developing-with-threejs.md#setting-an-object3d-on-an-entity

`.init()`에서 three.js 상자 메쉬를 만들고 나중에
`.update()` 핸들러는 모든 속성 업데이트를 처리합니다. 상자를 만들려면
three.js에서 [`THREE.BoxBufferGeometry`][threegeometry]를 생성합니다.
[`THREE.MeshStandardMaterial`][threematerial], 그리고 마지막으로
[`THREE.Mesh`][mesh]. entity에 메쉬를 설정하여 메쉬를 추가합니다.
three.js 장면 그래프 [`.setObject3D(name, object)` 사용함][setobject3d]:

```js
AFRAME.registerComponent('box', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    color: {type: 'color', default: '#AAA'}
  },

  /**
   * Initial creation and setting of the mesh.
   */
  init: function () {
    var data = this.data;
    var el = this.el;

    // Create geometry.
    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);

    // Create material.
    this.material = new THREE.MeshStandardMaterial({color: data.color});

    // Create mesh.
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Set mesh on entity.
    el.setObject3D('mesh', this.mesh);
  }
});
```


이제 업데이트를 처리해 보겠습니다. 지오메트리 관련 속성(예: 'width',
`높이`, `깊이`) 업데이트를 수행하면 지오메트리를 다시 생성합니다. 만약
재질 관련 속성(예: '색상')이 업데이트되면 메쉬에 액세스하여 업데이트하려면
다음을 사용합니다. `.getObject3D('메시')`.


```js
AFRAME.registerComponent('box', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    color: {type: 'color', default: '#AAA'}
  },

  init: function () {
    var data = this.data;
    var el = this.el;
    this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
    this.material = new THREE.MeshStandardMaterial({color: data.color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    el.setObject3D('mesh', this.mesh);
  },

  /**
   * Update the mesh in response to property updates.
   */
  update: function (oldData) {
    var data = this.data;
    var el = this.el;

    // If `oldData` is empty, then this means we're in the initialization process.
    // No need to update.
    if (Object.keys(oldData).length === 0) { return; }

    // Geometry-related properties changed. Update the geometry.
    if (data.width !== oldData.width ||
        data.height !== oldData.height ||
        data.depth !== oldData.depth) {
      el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
                                                                    data.depth);
    }

    // Material-related properties changed. Update the material.
    if (data.color !== oldData.color) {
      el.getObject3D('mesh').material.color = new THREE.Color(data.color);
    }
  }
});
```

### Box Mesh 제거


마지막으로 구성 요소 또는 entity가 제거되는 경우를 처리합니다. 이 경우 장면에선 메시를 제거하려고 합니다. `.remove()` 핸들러와 `.removeObject3D(name)`로 그렇게 할 수 있습니다.


```js
AFRAME.registerComponent('box', {
  // ...

  remove: function () {
    this.el.removeObject3D('mesh');
  }
});
```

기본적인 three.js `box` 구성요소를 마무리했습니다! 실제로 three.js 구성 요소는 더 유용한 작업을 수행합니다. three.js에서 수행할 수 있는 모든 것은 선언적으로 만들기 위해 A-Frame 구성 요소로 래핑될 수 있습니다. 따라서 three.js 기능과 생태계를 확인하고 어떤 구성 요소를 작성할 수 있는지 확인하십시오!


## 예시: `follow` 구성 요소

한 entity가 다른 entity를 따르도록 지시하는 'follow' 구성 요소를 작성해 보겠습니다. 
이것은 렌더 루프의 모든 프레임에서 실행되는 지속적으로 실행되는 동작을 장면에 추가하는 `.tick()` 핸들러의 사용을 보여줍니다. 이것은 또한 entity 간의 관계를 보여줍니다.


### 스키마 및 API

먼저 어떤 entity를 지정할지 지정하는 'target' 속성이 필요합니다.
A-Frame에는 트릭을 수행하는 'selector' 속성 유형이 있습니다.
쿼리 선택기를 전달하고 entity 요소를 다시 가져옵니다. 
또한 entity가 따라야 하는 속도를 지정하기 위해 `speed` 속성(m/s)을 추가합니다.

```js
AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  }
});
```

나중에 HTML을 통해 이 구성 요소를 사용할 때 구문은 다음과 같습니다.

```html
<a-scene>
  <a-box id="target-box" color="#5E82C5" position="-3 0 -5"></a-box>
  <a-box follow="target: #target-box; speed: 1" color="#FF6B6B" position="3 0 -5"></a-box>
</a-scene>
```

### 도우미 벡터 만들기

`.tick()` 핸들러는 모든 프레임에서 호출되므로(예:둘째), 우리는 그 성능을 확인하고 싶습니다. 
우리가 하고 싶지 않은 한 가지는 `THREE.Vector3` 객체와 같은 각 틱에 불필요한 객체를 생성하는 것입니다. 그러면 가비지 수집이 일시 중지되는 데 
도움이 됩니다. `THREE.Vector3`을 사용하여 벡터 작업을 수행해야 하므로 `.init()` 핸들러에서 한 번 생성하여 나중에 다시 사용할 수 있습니다.

```js
AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  },

  init: function () {
    this.directionVec3 = new THREE.Vector3();
  }
});
```

### `.tick()` 핸들러로 동작 정의하기

이제 컴포넌트가 원하는 속도로 대상을 향해 entity를 계속 이동하도록 `.tick()` 핸들러를
작성합니다. A-Frame은 전역 장면 가동 시간을 `time`으로, 마지막 프레임 이후의 시간을 
`timeDelta`로 `tick()` 핸들러에 밀리초 단위로 전달합니다. 'timeDelta'를 사용하여 주어진
속도에서 이 프레임에서 entity가 대상을 향해 얼마나 멀리 이동해야 하는지 계산할 수 있습니다.

entity가 향해야 하는 방향을 계산하기 위해 대상 entity의 방향 벡터에서 entity의 위치 벡터를 뺍니다. 
우리는 `.object3D`를 통해 entity의 three.js 객체에 액세스할 수 있으며, 여기에서 위치 벡터 `.position`이 있습니다. 우리는 이전에 `init()` 핸들러에서 할당한 `this.directionVec3`에 방향 벡터를 저장합니다.

그런 다음 이동 거리, 원하는 속도, 마지막 프레임 이후로 entity의 위치에 추가할 적절한 벡터를 찾는 데 경과한
시간을 고려합니다. entity를 `.setAttribute`로 번역하고 다음 프레임에서 `.tick()` 핸들러가 다시 실행됩니다.

전체 `.tick()` 핸들러는 다음과 같습니다. `.tick()`은 실제로 렌더 루프에 대한 참조 없이 렌더 루프에 연결하는
쉬운 방법입니다. 메서드를 정의하기만 하면 됩니다. 코드 주석과 함께 아래를 따르세요.

```js
AFRAME.registerComponent('follow', {
  schema: {
    target: {type: 'selector'},
    speed: {type: 'number'}
  },

  init: function () {
    this.directionVec3 = new THREE.Vector3();
  },

  tick: function (time, timeDelta) {
    var directionVec3 = this.directionVec3;

    // Grab position vectors (THREE.Vector3) from the entities' three.js objects.
    var targetPosition = this.data.target.object3D.position;
    var currentPosition = this.el.object3D.position;

    // Subtract the vectors to get the direction the entity should head in.
    directionVec3.copy(targetPosition).sub(currentPosition);

    // Calculate the distance.
    var distance = directionVec3.length();

    // Don't go any closer if a close proximity has been reached.
    if (distance < 1) { return; }

    // Scale the direction vector's magnitude down to match the speed.
    var factor = this.data.speed / distance;
    ['x', 'y', 'z'].forEach(function (axis) {
      directionVec3[axis] *= factor * (timeDelta / 1000);
    });

    // Translate the entity in the direction towards the target.
    this.el.setAttribute('position', {
      x: currentPosition.x + directionVec3.x,
      y: currentPosition.y + directionVec3.y,
      z: currentPosition.z + directionVec3.z
    });
  }
});
```

## 생태계의 구성 요소를 통한 학습

생태계에는 수많은 구성 요소가 있으며 대부분은 GitHub의 오픈 소스입니다. 학습하는 한 가지 방법은 다른 구성 요소의 소스 코드를 탐색하여 구성 요소가 제공하는 사용 사례를 확인하는 것입니다. 볼 수 있는
몇 가지 장소는 다음과 같습니다.

[corecomponents]: https://github.com/aframevr/aframe/tree/master/src/components
[paintercomponents]: https://github.com/aframevr/a-painter/tree/master/src/components

[weekofaframe]: https://aframe.io/blog/
[officialsite]: https://aframe.io/
[community]: https://aframe.io/community/
[npmcomponents]: https://www.npmjs.com/search?q=keywords:aframe&page=1&ranking=optimal
[aframetwitter]: https://twitter.com/aframevr/

- [A-Frame core components][corecomponents] - A-Frame의 표준 구성 요소의 소스 코드.
- [A-Painter components][paintercomponents] - A-Painter용 응용 프로그램별 구성 요소.
- [**A Week of A-Frame** Weekly Series][weekofaframe]
- [Official Site][officialsite]
- [Community][community]
- [Components on npm][npmcomponents]
- [Twitter][aframetwitter]

## 구성 요소 게시

[angle]: https://www.npmjs.com/package/angle

실제로 많은 구성 요소는 응용 프로그램별 또는 일회성 구성 요소입니다. 그러나 커뮤니티에 유용할 수 있고 다른 
응용 프로그램에서 작동할 수 있을 정도로 일반화된 구성 요소를 작성했다면 게시해야 합니다!

구성요소 템플릿의 경우 [`angle`][angle]를 사용하는 것이 좋습니다. 'angle'은 A-Frame용 명령줄 인터페이스입니다. 
기능 중 하나는 GitHub 및 npm에 게시하기 위한 구성 요소 템플릿을 설정하고 생태계의 다른 모든 구성 요소와 
일관성을 유지하는 것입니다. 템플릿을 설치하려면:

```sh
npm install -g angle && angle initcomponent
```

`initcomponent`는 템플릿 설정을 위해 구성 요소 이름과 같은 정보를 요청합니다. 
일부 코드, 예제 및 문서를 작성하고 GitHub 및 npm에 게시하십시오!
