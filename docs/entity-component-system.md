---
id: doc3
title: 엔티티 컴포넌트 시스템
examples:
  - title: Community Components in Action
    src: https://glitch.com/edit/#!/aframe-registry?path=index.html
  - title: Animated Lights
    src: https://glitch.com/edit/#!/aframe-animated-lights?path=index.html
---

[ecs]: https://wikipedia.org/wiki/Entity_component_system

A-Frame은 [엔티티-컴포넌트-시스템][ecs] (ECS) 아키텍처를 가진 three.js 프레임워크입니다.
ECS 아키텍처는 3D와 게임 개발에서 공통적이고 바람직한 패턴으로
**상속 및 계층 원리에 대한 구성**을 따릅니다.

ESC의 이점은 다음과 같습니다:

1. 재사용 가능한 부품을 혼합하고 일치시켜 개체를 정의할 때 유연성이 향상됩니다.
2. 복잡하게 짜여진 기능으로 긴 상속 체인의 문제를 제거합니다.
3. 디커플링, 캡슐화, 모듈화, 재사용을 통해 깔끔한 디자인을 촉진합니다.
4. 복잡성 측면에서 VR 애플리케이션을 구축하는 가장 확장성이 뛰어난 방법입니다.
5. 3D 및 VR 개발을 위한 검증된 아키텍처입니다.
6. 새로운 기능을 확장 할 수 있습니다(커뮤니티 컴포넌트로 공유 가능).

2D 웹에서는 계층 구조에서 고정된 동작이 있는 요소를 배치합니다. 3D와 VR은 다릅니다; 
무한한 동작을 가지고 있는 무하한 유형의 가능한 객체가 있습니다. 
ECS는 객체 유형을 구성할 수 있는 관리 가능한 패턴을 제공합니다.

다음은 ECS 아키텍처에 대한 훌륭한 소개 자료입니다. 이점을 더 잘 이해하기 위해
아래 항목들을 한번씩 보는 것이 좋습니다. ECS는 VR 개발에 적합하며, A-Frame은 전적으로
이러한 패러다임을 기반으로 합니다.

- [Wikipedia의 *엔티티 컴포넌트 시스템*](https://en.wikipedia.org/wiki/Entity%E2%80%93component%E2%80%93system)
- [Adam Martin의 *엔티티 시스템이란 무엇입니까?*](http://t-machine.org/index.php/2007/11/11/entity-systems-are-the-future-of-mmog-development-part-2/)
- [*디커플링 패턴 &mdash;* 게임 프로그래밍 패턴의 *컴포넌트*](http://gameprogrammingpatterns.com/component.html)
- [Mick West의 *계층 구조를 발전시키십시오.*](http://cowboyprogramming.com/2007/01/05/evolve-your-heirachy/)

ESC를 구현하는 잘 알려진 게임 엔진은 Unity입니다. 비록 엔티티 간 통신에 문제가 있기는 하지만
A-Frame, DOM 및 선언적 HTML이 실제로 ECS를 빛나게 만드는지 알아보겠습니다.

<!--toc-->

## 개념

[entity]: ../core/entity.md
[component]: ../core/component.md
[system]: ../core/systems.md

![ECS Minecraft](https://cloud.githubusercontent.com/assets/674727/20289898/71f7fea0-aa91-11e6-8307-d8dc68dff285.png)

ESC의 기본 정의는 다음과 같습니다.

- **[엔티티][entity]**는 컴포넌트를 연결할 수 있는 컨테ㅔ이너 객체입니다.
  엔티티는 장면에 있는 모든 오브젝트의 기반입니다. 컴포넌트가 없으면 도면요소는
  빈 `<div>`와 유사하게 아무것도 렌더링하지 않습니다.
- **[컴포넌트][component]**는 엔티티에 연결하여 모양, 동작 및 기능을 제공할 수 있는
  재사용 가능한 모듈 또는 데이터 컨테이너입니다. 컴포넌트는 객체의 플러그 앤 
  플레이와 같습니다. 모든 로직은 컴포넌트를 통해 구현되며 컴포넌트를 혼합, 매칭 구성하여 
  다양한 유형의 객체를 정의합니다. 마치 연금술처럼!
- **[시스템][system]**은 컴포넌트 클래스에 대한 글로벌 범위, 관리 및 서비스를 
  제공합니다. 시스템은 종종 선택 사항이지만 로직과 데이터를 분리하는 데 사용할 수
  있습니다; 시스템은 로직을 처리하고 컴포넌트는 컨테이너 역할을 합니다.

### 예시

서로 다른 컴포넌트를 함께 구성하여 구축된 다양한 유형의 엔티티에 대한 몇가지 추상적인
예시는 다음과 같습니다:

- `Box = Position + Geometry + Material`
- `Light Bulb = Position + Light + Geometry + Material + Shadow`
- `Sign = Position + Geometry + Material + Text`
- `VR Controller = Position + Rotation + Input + Model + Grab + Gestures`
- `Ball = Position + Velocity + Physics + Geometry + Material`
- `Player = Position + Camera + Input + Avatar + Identity`

또 다른 추상적인 예시로서, 컴포넌트를 조립하여 자동차 엔티티를 구축하고 싶다고 상상해보십시오.

- `material` 자동차의 외관에 영향을 미치는 "색상" 또는 "광택"과 같은 속성을 가진 
  컴포넌트를 부착할 수 있습니다.
- `engine` 자동차의 기능에 영향을 미치는 "마력"이나 "중량"과 같은 속성을 가진 컴포넌트를 연결할 수 있습니다.
- `tire` 자동차의 동작에 영향을 미치는 "타이어 수" 또는 "스티어링(조향)각도"와 같은 
  속성이 있는 컴포넌트를 연결할 수 있습니다.

그래서 우리는 `material`, `engine`그리고 `tire` 컴포넌트의 특성을 변화시킴으로써
다양한 종류의 자동차를 만들 수 있습니다. `material`, `engine`그리고 `tire` 컴포넌트가
서로에 대해 알(파악) 필요가 없으며 다른 경우에 분리하여 사용할 수 있습니다. 
우리는 위에 요소들을 혼합시켜서 다양한 유형의 차량을 만들 수 있습니다.

- *보트* 엔티티를 만들려면 `tire` 컴포넌트를 제거합니다.
- *오토바이* 엔티티를 만들려면 `tire` 컴포넌트의 타이어 수를 2로 변경하고 `engine`컴포넌트를 더 작게 구성합니다.
- *비행기* 엔티티를 만들려면 `wing`및 `jet` 컴포넌트를 연결합니다.

이것을 기존의 상속과 대조하여 객체를 확창하려면 모든 항목 또는 상속 체인을 처리하는 대규모 클래스를 생성해야 합니다.

## A-Frame의 ECS

A-Frame은 ECS의 각 부분을 나타내는 API가 있습니다:

- **엔티티**는 `<a-entity>` 요소와 프로토타입으로 표시됩니다.
- **컴포넌트**는 `<a-entity>`의 HTML 속성으로 표시됩니다. 컴포넌트 아래에는
  스키마, 수명 주기 처리기 및 메서드를 포함하는 개체가 있습니다.
  이 컴포넌트는 `AFRAME.registerComponent (이름, 정의)` API를 통해 등록됩니다.
- **시스템**은 `<a-scene>`의 HTML 속성으로 표시됩니다. 시스템은 정의상
  컴포넌트와 일치합니다. 시스템은 `AFRAME.registerSystem (이름, 정의)`
  API를 통해 등록됩니다.

### 구문(문법)

[style]: https://developer.mozilla.org/docs/Web/API/HTMLElement/style

`<a-entity>` 컴포넌트를 생성 하고 HTML 속성으로 첨부합니다. 대부분의 컴포넌트에는
[`HTMLElement.style` CSS][style]와 유사한 구문으로 표시되는 여러 속성이 있습니다. 
이 구문은 속성 값과 속성 이름을 구분하는 콜론(`:`)과 서로 다른 속성 선언을 구분하는
세미콜론(`;`)이 있는 형식을 취합니다:

`<a-entity ${componentName}="${propertyName1}: ${propertyValue1}; ${propertyName2}: ${propertyValue2}">`

[geometry]: ../components/geometry.md
[material]: ../components/material.md
[light]: ../components/light.md
[position]: ../components/position.md

예를 들어, 우리는 `<a-entity>`를 가지고 다양한 속성 및 속성 값으로 [geometry], [material],
[light] 및 [position] 컴포넌트를 추가합니다:

```html
<a-entity geometry="primitive: sphere; radius: 1.5"
          light="type: point; color: white; intensity: 2"
          material="color: white; shader: flat; src: glow.jpg"
          position="0 0 -5"></a-entity>
```

### 구성

여기서 더 많은 컴포넌트를 추가하여 외관, 동작 또는 기능(예: 물리학)을 추가할 수 있습니다. 
또는 컴포넌트를 업데이트 하여 엔티티를 구성할 수 있습니다(선언적 또는 `.setAttribute`를 통해).

[composegif]: https://cloud.githubusercontent.com/assets/674727/25463804/896c04c2-2aad-11e7-8015-2fc84118a01c.gif

![Composing an Entity][composegif]

여러 컴포넌트로 구성된 일반적인 유형의 엔티티는 VR에서 플레이어의 손과 같습니다. 
플레이어의 손에는 모양, 제스처, 동작, 다른 개체와의 상호작용 등 많은 컴포넌트를
가질 수 있습니다.

VR용 초능력이나 증강 장치를 부착한 것처럼 동작을 제공하기 위해 컴포넌트를 손
개체에 연겨합니다! 아래의 각 컴포넌트는 서로에 대한 지식이 없지만 결합하여
복잡한 엔티티를 정의할 수 있습니다.

```html
<a-entity
  tracked-controls  <!-- Hook into the Gamepad API for pose. -->
  vive-controls  <!-- Vive button mappings. -->
  oculus-touch-controls  <!-- Oculus button mappings. -->
  hand-controls  <!-- Appearance (model), gestures, and events. -->
  laser-controls <!-- Laser to interact with menus and UI. -->
  sphere-collider  <!-- Listen when hand is in contact with an object. -->
  grab  <!-- Provide ability to grab objects. -->
  throw <!-- Provide ability to throw objects. -->
  event-set="_event: grabstart; visible: false"  <!-- Hide hand when grabbing object. -->
  event-set="_event: grabend; visible: true"  <!-- Show hand when no longer grabbing object. -->
>
```

### 선언적 DOM 기반 ECS

A-Frame은 ECS를 DOM에 기반하여 선언적으로 만들고 한 단계 더 발전시킵니다. 
전통적으로 ECS 기반 엔진은 모두 코드를 통해 엔티티를 생성하고, 컴포넌트를 연결하고,
컴포넌트를 업데이트하고, 컴포넌트를 제거했습니다. 하지만 A-Frame은 HTML과 DOM을 
가지고 있어 ECS를 인체공학적으로 만들고 많은 약점을 해결합니다.
다음은 DOM이 ECS에 제공하는 기능입니다.

1. **쿼리 선택기로 다른 엔티티 참조**: DOM은 장면 그래프를 쿼리하고 조건과 일치하는
엔티티를 선택할 수 있는 강력한 쿼리 선택기 시스템을 제공합니다. 
ID, 클래스 또는 데이터 속성으로 엔티티에 대한 참조를 얻을 수 있습니다.
A-Frame은 HTML을 기반으로 하기 때문에 쿼리 선택기를 즉시 사용할 수 있습니다. 
`document.querySelector('#player')`.
2. **이벤트와 분리된 엔티티 간 통신**: DOM은 이벤트를 수신하고 내보내는 기능을 제공합니다. 
이렇게 하면 엔티티 사이에 발행-구독 커뮤니케이션 시스템을 제공합니다.
컴포넌트는 서로에 대해 알 필요가 없으며 (bubbling도 가능한)이벤트를 내보낼 수 있으며
다른 컴포넌트는 서로 호출하지 않고 해당 이벤트를 수신 할 수 있습니다.
`ball.emit('collided')`.
3. **DOM API를 사용한 수명주기 관리를 위한 API**: DOM은`.setAttribute`,
`.removeAttribute`, `.createElement` 및 `.removeChild`를 포함한 트리와 HTML요소를
업데이트 하는 API를 제공합니다. 이는 일반 웹 개발에서처럼 그대로 사용 할 수 있습니다.
4. **속성 선택기를 사용한 개체 필터링**: DOM은 특정 HTML 속성이 있거나 없는 엔티티에
대해 쿼리 할 수 있는 속성 선택기를 제공합니다. 즉, 특정 컴포넌트 집합이 있거나 없는 
엔티티를 요청할 수 있습니다.`document.querySelector('[enemy]:not([alive])')`.
5. **선언성**: 마지막으로 DOM은 HTML을 제공합니다. A-Frame은 ECS와 HTML을 연결하여 
이미 깔끔한 패턴을 선언적이고 읽기 가능하며 복사 및 붙여넣기가 가능합니다.

### 확장성

A-Frame 컴포넌트는 무엇이든 할 수 있습니다. 개발자는 모든 기능을 확장하는 컴포넌트 
만들 수 있는 권한이 없는 혁신이 주어집니다. 컴포넌트는 JavaScript, three.js 및 Web API
(예: WebRTC, 음성인식)에 대한 전체 엑세스 권한을 가집니다.

[writecomponent]: ./writing-a-component.md

[A-Frame 컴포넌트를 작성하는][writecomponent] 방법은 나중에 자세히 살펴보겠습니다. 
미리 보기로 기본 컴포넌트 구조는 다음과 같습니다.

```js
AFRAME.registerComponent('foo', {
  schema: {
    bar: {type: 'number'},
    baz: {type: 'string'}
  },

  init: function () {
    // Do something when component first attached.
  },

  update: function () {
    // Do something when component's data is updated.
  },

  remove: function () {
    // Do something the component or its entity is detached.
  },

  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  }
});
```

선언적 ECS는 JavaScript 모듈을 작성하고 HTML을 통해 추상화 할 수 있는 기능을 부여합니다. 
컴포넌트가 등록되면 HTML 속성을 통해 이 코드 모듈을 엔티티에 선언적으로 연결 할 수 있습니다.
이러한 HTML 코드 추상화는 ECS를 강력하고 추론하기 쉽게 만듭니다. `footer`은 방금 등록한 
컴포넌트의 이름이고 데이터에는 `bar`및 `baz` 속성이 포함 됩니다.

```html
<a-entity foo="bar: 5; baz: bazValue"></a-entity>
```

### 컴포넌트 기반 개발

**VR 애플리케이션을 빌드하려면 모든 애플리케이션 코드를 컴포넌트(및 시스템)에 배치하는것이 좋습니다.** 
이상적인 A-Frame 코드베이스는 모듈식, 캡슐식 및 분리된 컴포넌트만으로 구성이 됩니다.
이러한 컴포넌트는 별도로 다른 컴포넌트와 함께 유닛 테스트를 수행 할 수 있습니다.

응용 프로그램이 컴포넌트로만 생성하는 경우, 해당 코드 베이스의 모든 부분을 재사용 할 수 있습니다! 
컴포넌트는 다른 개발자가 사용하도록 공유하거나 다른 프로젝트에서 재사용할 수 있습니다.
또는 컴포넌트를 분기하여 다른 사용 사례에 맞게 수정할 수 있습니다.

간단한 ECS 코드 베이스는 다음과 같이 구성될 수 있습니다:

```
index.html
components/
  ball.js
  collidable.js
  grabbable.js
  enemy.js
  scoreboard.js
  throwable.js
```

### 고차 컴포넌트

[cursor]: ../components/cursor.md
[hand-controls]: ../components/hand-controls.md
[oculus-touch-controls]: ../components/oculus-touch-controls.md
[raycaster]: ../components/raycaster.md
[tracked-controls]: ../components/tracked-controls.md
[vive-controls]: ../components/vive-controls.md

컴포넌트는 엔티티에 다른 컴포넌트를 설정하여 추상화에서 상위 또는 상위 수준 컴포넌트로
만들 수 있습니다.

For example, the [cursor component][cursor] sets and builds on top of the
[raycaster component][raycaster]. Or the [hand-controls
component][hand-controls] sets and builds on top of the [vive-controls
component][vive-controls] and [oculus-touch-controls
component][oculus-touch-controls] which in turn build on top of the
[tracked-controls component][tracked-controls].

## 커뮤니티 컴포넌트 생태계

커뮤니티에서 사용할 수 있도록 컴포넌트를 A-Frame 생태계에서 공유할 수 있습니다.
A-Frame의 놀라운 점은 확장성입니다. 숙련된 개발자는 물리 시스템이나 그래픽 셰이더 
컴포넌트를 개발 할 수 있으며, 초보 개발자는 `<script>`태그를 삽입하기만 하면
HTML에서 해당 컴포넌트를 장면에서 사용할 수 있습니다. JavaScript를 건드릴 필요 
없이 강력한 게시된 컴포넌트를 사용 할 수 있습니다.

### 컴포넌트를 찾을 수 있는 위치 (컴포넌트를 찾을 위치)

수백개의 컴포넌트가 있습니다. 우리는 그들을 발견할 수 있도록 최선을 다하고 있습니다.
컴포넌트를 개발하는 경우 이 채널을 통해 제출하여 공유하십시오!

#### npm

[search]: https://www.npmjs.com/search?q=aframe-component

대부분의 A-Frame 컴포넌트는 GitHub뿐만 아니라 npm에도 게시됩니다.
[npm으로 `aframe 컴포넌트`][search]를 검색할 수 있습니다. npm을 사용하면
품질, 인기도 및 유지 관리별로 정렬할 수 있습니다. 보다 완전한 컴포넌트 목록을 
찾을 수 있는 좋은 장소입니다.

#### GitHub 프로젝트

[github]: https://github.com

많은 A-Frame 응용 프로그램은 순전히 컴포넌트에서 개발되며 이러한 A-Frame은
응용 프로그램 중 다수는 `[GitHub]`의 오픈 소스입니다. 코드 베이스에는 우리가
직접 사용하거나 참조하거나 복사할 수 있는 컴포넌트가 포함됩니다.
살펴볼 프로젝트는 다음과 같습니다:

- [BeatSaver Viewer](https://github.com/supermedium/beatsaver-viewer/)
- [Super Says](https://github.com/supermedium/supersays/)
- [A-Painter](https://github.com/aframevr/a-painter/)
- [A-Blast](https://github.com/aframevr/a-blast/)

#### *A-Frame의 일주일*

[blog]: https://aframe.io/blog/
[homepage]: https://aframe.io/

[매주 블로그][blog]에서 A-Frame 커뮤니티 및 생태계의 모든 활동을 정리합니다. 
이 블로그에는 새로 출시되거나 업데이트 된 컴포넌트가 포함됩니다. 
[A-Frame의 홈페이지에는][homepage] 일반적으로 가장 최근의 *A-Frame* 항목에 대한 링크가 있습니다.

### 커뮤니티 컴포넌트 사용

[particlesystem]: https://www.npmjs.com/package/aframe-particle-system-component

사용하려는 컴포넌트를 찾으면 해당 컴포넌트를 `<script>`태그로 포함시키고 HTML에서
사용할 수 있습니다.

[unpkg.com]: http://unpkg.com/

예를 들어, IdeaSpaceVR의 [파티클 시스템 컴포넌트][particlesystem]를 사용해 보겠습니다:

#### unpkg 사용

먼저 컴포넌트 JS 파일에 대한 CDN 링크를 가져와야 합니다. 컴포넌트의 문서에는 
일반적으로 CDN 링크 또는 사용 정보가 있습니다. 그러나 최신 CDN을 
얻는 방법은 [unpkg.com]을 사용하는 것 입니다..

unkg는 npm에 게시된 모든 내용을 자동으로 호스트하는 CDN입니다.
그리고 시맨틱 버전을 해결하고 원하는 컴포넌트의 버전을 제공할 수 있습니다. 
URL의 형식은 다음과 같습니다:

```
https://unpkg.com/<npm package name>@<version>/<path to file>
```

최신 버전을 원한다면 `version`을 제외할 수 있습니다:

```
https://unpkg.com/<npm package name>/<path to file>
```

빌드된 컴포넌트 JS 파일의 경로를 입력하는 대신 `path to file`를 제외하여 컴포넌트
패키지의 디렉터리를 찾아볼 수 있습니다.
JS 파일은 일반적으로 `dist/` 또는 `build/` 폴더에 있으며 `.min.js`로 끝납니다.

파티클 시스템 컴포넌트의 경우 다음으로 이동합니다.

```
https://unpkg.com/aframe-particle-system-component/
```

끝 슬래시(`/`)에 유의하십시오. 필요한 파일을 찾아서 마우스 오른쪽 버튼을 클릭한 다음 
*주소로 링크 복사*를 눌러 CDN 링크를 클립보드에 복사합니다.

![unpkg](https://cloud.githubusercontent.com/assets/674727/25502028/cbfd7b3a-2b49-11e7-914d-a8280aa47ace.jpg)

#### 컴포넌트 JS 파일 포함

그런 다음 HTML로 이동합니다. `<head>`아래에 `<script>`태그는 A-Frame *뒤*에 나와야하고 `<a-scene>`*앞*에 와야 합니다. JS파일에 `<script>`태그가
포함되어있습니다.

파티클 시스템 컴포넌트의 경우 이전(작성 시점)에 찾은 CDN 링크는 다음과 같습니다:

```
https://unpkg.com/aframe-particle-system-component@1.0.9/dist/aframe-particle-system-component.min.js
```

이제 HTML에 포함할 수 있습니다:

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-particle-system-component@1.0.9/dist/aframe-particle-system-component.min.js"></script>
  </head>
  <body>
    <a-scene>
    </a-scene>
  </body>
</html>
```

#### 컴포넌트 사용

구현 시 컴포넌트를 사용하는 방법에 대한 설명서를 따르십시오.
그러나 일반적인 사용에는 컴포넌트를 엔티티에 연결하고 구성하는 작업이 포함됩니다. 
입자 시스템 컴포넌트의 경우:

이제 HTML에 포함할 수 있습니다.

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-particle-system-component@1.0.9/dist/aframe-particle-system-component.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-entity particle-system="preset: snow" position="0 0 -10"></a-entity>
    </a-scene>
  </body>
</html>
```

### Example

[glitch]: http://glitch.com/~aframe-registry

![Registry Example](https://cloud.githubusercontent.com/assets/674727/25502318/0f76ceec-2b4b-11e7-9829-cb3784b20dc1.gif)

다음은 레지스트리의 다양한 커뮤니티 컴포넌트를 사용하고 unpkg CDN을 사용하는 예입니다.
[Glitch에서 이 예제를 리믹스하거나 확인할 수 있습니다.][glitch]

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
    <script src="https://unpkg.com/aframe-animation-component@3.2.1/dist/aframe-animation-component.min.js"></script>
    <script src="https://unpkg.com/aframe-particle-system-component@1.0.x/dist/aframe-particle-system-component.min.js"></script>
    <script src="https://unpkg.com/aframe-extras.ocean@%5E3.5.x/dist/aframe-extras.ocean.min.js"></script>
    <script src="https://unpkg.com/aframe-gradient-sky@1.2.0/dist/gradientsky.min.js"></script>
  </head>
  <body>
    <a-scene>
      <a-entity id="rain" particle-system="preset: rain; color: #24CAFF; particleCount: 5000"></a-entity>

      <a-entity id="sphere" geometry="primitive: sphere"
                material="color: #EFEFEF; shader: flat"
                position="0 0.15 -5"
                light="type: point; intensity: 5"
                animation="property: position; easing: easeInOutQuad; dir: alternate; dur: 1000; to: 0 -0.10 -5; loop: true"></a-entity>

      <a-entity id="ocean" ocean="density: 20; width: 50; depth: 50; speed: 4"
                material="color: #9CE3F9; opacity: 0.75; metalness: 0; roughness: 1"
                rotation="-90 0 0"></a-entity>

      <a-entity id="sky" geometry="primitive: sphere; radius: 5000"
                material="shader: gradient; topColor: 235 235 245; bottomColor: 185 185 210"
                scale="-1 1 1"></a-entity>

      <a-entity id="light" light="type: ambient; color: #888"></a-entity>
    </a-scene>
  </body>
</html>
```
