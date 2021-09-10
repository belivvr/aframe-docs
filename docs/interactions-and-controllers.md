---
id: doc9
title: 상호 작용 및 컨트롤러
examples:
  - title: Basic Interaction
    src: https://glitch.com/edit/#!/aframe-basic-interaction?path=index.html:1:0
  - title: Escape the Room
    src: https://glitch.com/edit/#!/wide-cream?path=index.html:1:0
---

A-Frame이 지원할 수 있는 다양한 플랫폼, 장치, 입력 방법으로 인해 상호 작용을 추가하는 진정한 방법은 없습니다. 
게다가 VR 인터랙션은 개방형입니다. 마우스와 터치 입력만 신경 쓰면 되는 2D 웹과 버튼 하나만 신경 쓰면 되는 
Cardboard와 달리 VR에서는 잡기, 던지기, 문지르기, 뒤집기, 찌르기, 늘리기, 누르기, 등. 더 나아가 혼합 현실, 
추적기 및 사용자 지정 컨트롤러는 상호 작용에서 훨씬 더 창의성을 제공합니다!

이 섹션에서 우리가 할 수 있는 것은 일반적인 상호 작용을 위해 기존 구성 요소를 살펴보는 것입니다. 그리고 우리는 
우리 자신의 상호작용을 구축하기 위한 지식을 제공하기 위해 이러한 입력 기반 및 상호 작용 기반 구성 요소가 
구축되는 *방법*을 보여줄 수 있습니다. 어떤 의미에서는 물고기를 주기보다 물고기 잡는 법을 배우세요.


<!--toc-->

## 이벤트

[events]: ./javascript-events-dom-apis.md#events-and-event-listeners
[addeventlistener]: https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener

2D 웹에서 입력과 상호작용은 [browser
event][events]](예: `click`, `mouseenter`, `mouseleave`, `touchstart`,
'touchend') 등이 있습니다. 입력 기반 이벤트가 발생할 때마다 브라우저는 [`Element.addEventListener`][addeventlistener]로 수신하고 처리할 수 있는 이벤트를 생성합니다.


```js
// `click` event emitted by browser on mouse click.
document.querySelector('p').addEventListener('click', function (evt) {
  console.log('This 2D element was clicked!');
});
```

[synthetic]: https://developer.mozilla.org/docs/Web/Guide/Events/Creating_and_triggering_events

2D 웹과 마찬가지로 A-Frame은 이벤트 및 이벤트 리스너에 의존합니다. 그러나 A-Frame은 자바스크립트 프레임워크이고 모든 것이 WebGL에서 수행되기 때문에 **A-Frame의 이벤트는 이벤트를 설명하는
모든 구성 요소에서 내보낼 수 있는 [synthetic custom events][synthetic]**입니다.

```js
// `collide` event emitted by a component such as some collider or physics component.
document.querySelector('a-entity').addEventListener('collide', function (evt) {
  console.log('This A-Frame entity collided with another entity!');
});
```

[mousecursor]: https://github.com/mayognaise/aframe-mouse-cursor-component

일반적인 잘못된 점은 'click' 이벤트 리스너를 A-Frame entity에 추가하고 마우스로 entity를 직접 클릭하여 작동할
것으로 예상한다는 것입니다. WebGL에서는 이러한 '클릭' 이벤트를 제공하는 입력 및 상호 작용을 제공해야 합니다.
예를 들어 A-Frame의 '커서' 컴포넌트는 레이캐스터를 사용하여 시선에 합성 '클릭' 이벤트를 생성합니다. 또는 다른
예로, Mayo Tobita의 [마우스 커서 구성 요소][mousecursor]는 레이캐스터를 사용하여 엔티티를 직접 클릭할 때 
'클릭' 이벤트를 생성합니다.

## 커서 구성 요소와의 시선 기반 상호 작용

[Remix this cursor example on Glitch](https://glitch.com/~aframe-school-cursor-handler/).

먼저 시선 기반 상호 작용을 살펴보겠습니다. 시선 기반 상호 작용은 머리를 회전하고 상호 작용할 대상을 보는 것에 
의존합니다. 이러한 유형의 상호 작용은 컨트롤러가 없는 헤드셋을 위한 것입니다. 회전 전용 컨트롤러(Daydream, 
GearVR, Oculus Go)를 사용하더라도 상호 작용은 여전히 유사합니다. A-Frame은 기본적으로 마우스 드래그 컨트롤을 
제공하기 때문에 시선 기반은 데스크톱에서 일종의 카메라 회전을 드래그하여 상호 작용을 미리 보는 데 사용할 수 
있습니다.

[configureraycaster]: ../components/cursor.md#configuring-the-cursor-through-the-raycaster-component
[cursor]: ../components/cursor.md


시선 기반 상호 작용을 추가하려면 구성 요소를 추가하거나 구현해야 합니다. A-Frame은 카메라에 부착된 경우 시선 기반 상호 작용을 제공하는 [커서 구성 요소][cursor]와 함께 제공됩니다.

1. [`<a-camera>`](../components/camera.md) 엔티티를 명시적으로 정의합니다. 이전에는 A-Frame이 기본 카메라를 제공했습니다.
2. 카메라 엔티티 아래에 [`<a-cursor>`][cursor] 엔티티를 자식 요소로 추가합니다.
3. 선택적으로 [커서가 사용하는 레이캐스터를 구성합니다. [configureraycaster].

```html
<a-scene>
  <a-camera>
    <a-cursor></a-cursor>
    <!-- Or <a-entity cursor></a-entity> -->
  </a-camera>
</a-scene>
```

### 이벤트 세트 구성 요소로 이벤트 처리

[Remix this event set component example on Glitch](https://glitch.com/~aframe-event-set-component).

[event-set]: https://github.com/supermedium/superframe/tree/master/components/event-set

이제 커서 구성 요소가 제공하는 이벤트를 처리해 보겠습니다. 커서 구성 요소는 `click`, `mouseenter`, 
`mouseleave`, `mousedown`, `mouseup` 및 `fusing`과 같은 합성 이벤트를 방출합니다. 초보자에게 친숙하도록 
브라우저의 기본 이벤트와 유사하게 이름을 지정했지만 합성 이벤트임을 다시 한 번 확인하세요.


이벤트를 수신하고 속성을 설정하는 기본 이벤트 핸들러의 경우 응답으로 [event-set component][event-set]를
사용할 수 있습니다. 이벤트 세트 구성 요소는 기본 이벤트 핸들러를 선언적으로 만듭니다.
이벤트 세트 구성 요소의 API는 다음과 같습니다.


```html
<a-entity event-set__${id}="_event: ${eventName}; ${someProperty}: ${toValue}">
```


`__${id}`를 사용하면 동일한 entity에 여러 이벤트 집합 구성 요소를 연결할 수 있습니다. 인스턴스가 처리할 
이벤트에 대해 `${eventName}`을 제공합니다. 그런 다음 entity에서 또는 entity에서 이벤트가 발생할 때 설정하려는 속성 이름과 값을 전달합니다.


예를 들어 entity를 가리키거나 볼 때 entity를 볼 수 있도록 합니다. 커서 구성 요소는 `mouseenter` 이벤트를 제공합니다.

```html
<a-entity event-set__makevisible="_event: mouseenter; visible: true">
```

호버링 시 상자의 색상을 변경하고 더 이상 호버링하지 않을 때 복원하려면:

```html
<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
<script src="https://unpkg.com/aframe-event-set-component@3.0.3/dist/aframe-event-set-component.min.js"></script>
<body>
  <a-scene>
    <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9"
           event-set__enter="_event: mouseenter; color: #8FF7FF"
           event-set__leave="_event: mouseleave; color: #4CC3D9"></a-box>

    <a-camera>
      <a-cursor></a-cursor>
    </a-camera>
  </a-scene>
</body>
```

이벤트 세트 구성 요소는 `_target: ${선택자}`. entity를 가리킬 때 텍스트 레이블을 표시하려면:

```html
<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
<script src="https://unpkg.com/aframe-event-set-component@3.0.3/dist/aframe-event-set-component.min.js"></script>
<body>
  <a-scene>
    <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D"
                event-set__enter="_event: mouseenter; _target: #cylinderText; visible: true"
                event-set__leave="_event: mouseleave; _target: #cylinderText; visible: false">
      <a-text id="cylinderText" value="This is a cylinder" align="center" color="#FFF" visible="false" position="0 -0.55 0.55"
              geometry="primitive: plane; width: 1.75" material="color: #333"></a-text>
    </a-cylinder>

    <a-camera>
      <a-cursor></a-cursor>
    </a-camera>
  </a-scene>
</body>
```


이벤트 세트 구성 요소는 여러 A-Frame 구성요소 점 구문을 사용하는 속성
(예: `${componentName}.${propertyName}`):


```html
<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
<script src="https://unpkg.com/aframe-event-set-component@3.0.3/dist/aframe-event-set-component.min.js"></script>
<body>
  <a-scene>
    <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4"
             event-set__down="_event: mousedown; material.wireframe: true"
             event-set__up="_event: mouseup; material.wireframe: false"
             event-set__leave="_event: mouseleave; material.wireframe: false"></a-plane>

    <a-camera>
      <a-cursor></a-cursor>
    </a-camera>
  </a-scene>
</body>
```

### JavaScript로 이벤트 처리

[Remix this cursor handler example on Glitch](https://glitch.com/~aframe-school-cursor-handler/)

[writingcomponent]: ./writing-a-component.md

이벤트 집합 구성 요소는 기본 설정 작업에 적합하지만 JavaScript에서 이벤트를 처리하는 방법을 아는 것이
중요합니다. 이벤트에 대한 응답으로 더 복잡한 작업(예: API 호출, 데이터 저장, 애플리케이션 상태에 영향)
을 수행하고자 할 수 있습니다. 이러한 경우 자바스크립트를 사용해야
하며 A-Frame의 경우 [A-Frame 구성 요소][writingcomponent] 내에 코드를 배치하도록 규정합니다.


이벤트 세트 구성 요소가 내부에서 수행하는 작업을 보여주기 위해 JavaScript로 마우스를 가져갈 때와 호버를
떠날 때 상자 색상이 변경되도록 합시다.

```html
<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
<script>
  AFRAME.registerComponent('change-color-on-hover', {
    schema: {
      color: {default: 'red'}
    },

    init: function () {
      var data = this.data;
      var el = this.el;  // <a-box>
      var defaultColor = el.getAttribute('material').color;

      el.addEventListener('mouseenter', function () {
        el.setAttribute('color', data.color);
      });

      el.addEventListener('mouseleave', function () {
        el.setAttribute('color', defaultColor);
      });
    }
  });
</script>
<body>
  <a-scene>
    <a-box color="#EF2D5E" position="0 1 -4" change-color-on-hover="color: blue"></a-box>

    <a-camera><a-cursor></a-cursor></a-camera>
  </a-scene>
</body>
```

간단한 `.setAttribute`를 수행하는 동안 JavaScript, three.js 및 Web API에 대한 전체 액세스 권한이 
있으므로 이벤트에 대한 응답으로 구성 요소 내에서 기술적으로 모든 작업을 수행할 수 있습니다.

VR 컨트롤러에 대한 상호 작용을 설명하고 구현하는 단계로 넘어갈 것이지만 이벤트 및 이벤트 리스너의 
개념은 여전히 적용됩니다.

## VR Controllers

컨트롤러는 사람들을 VR 애플리케이션에 몰입시키는 데 매우 중요합니다. VR의 잠재력은 6자유도(6DoF)를 
제공하는 컨트롤러 없이는 충족되지 않습니다. 컨트롤러를 사용하면 사람들이 손을 뻗어 장면 주변을 둘러보고 
손으로 물체와 상호 작용할 수 있습니다.

[gamepad]: https://developer.mozilla.org/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

A-Frame은 [Gamepad Web API][gamepad]를 통해 해당 WebVR 브라우저에서 지원하는 스펙트럼 전반에 걸쳐 
컨트롤러용 구성 요소를 제공합니다. Vive, Oculus Touch, Daydream, GearVR 및 Oculus Go 컨트롤러용 구성 
요소가 있습니다.

게임패드 객체를 조사하거나 게임패드 ID를 얻기 위해 브라우저 콘솔에서 `navigator.getGamepads()`를 
호출할 수 있습니다. 그러면 연결된 모든 컨트롤러가 포함된 'GamepadList' 배열이 반환됩니다.

고급 애플리케이션을 위해 컨트롤러가 제작되고 맞춤화됩니다. 애플리케이션(즉, 맞춤형 3D 모델, 애니메이션,
매핑, 제스처). 예를 들어 중세 기사는 금속 건틀릿을 가지고 있거나 로봇은 레이저를 쏘거나 손목에 정보를 
표시할 수 있는 로봇 손을 가지고 있을 수 있습니다.

A-Frame이 제공하는 컨트롤러 구성 요소는 주로 기본값으로 작동하며,
스타터 구성 요소 또는 더 많은 사용자 정의 컨트롤러 구성 요소를 파생시키는 기반입니다.

### 추적 제어 구성 요소

[trackedcontrols]: ../components/tracked-controls.md
[vivecontrols]: ../components/vive-controls.md

[tracked-controls component][trackedcontrols]는 A-Frame의 모든 컨트롤러 구성 요소의 기반을 제공하는 
A-Frame의 기본 컨트롤러 구성 요소입니다.

- ID 또는 접두사가 지정된 Gamepad API에서 Gamepad 객체를 가져옵니다.
- 컨트롤러 모션을 읽기 위해 Gamepad API에서 포즈(위치 및 방향)를 적용합니다.
- 이벤트를 제공하기 위해 게임패드 개체의 버튼 값에서 변경 사항을 찾습니다.
  버튼을 누르거나 터치할 때와 축과 터치패드가 변경될 때(`axischanged`, `buttonchanged`, `buttondown`, `buttonup`, `touchstart`, `touchend`).

A-Frame의 모든 컨트롤러 구성 요소는 다음을 통해 추적 제어 구성 요소 위에 구축됩니다.

 - 적절한 게임패드 ID(예: 'Oculus Touch(오른쪽)')를 사용하여 entity에서 추적 제어 구성 요소를 
   설정합니다. 예를 들어, [vive-controls component][vivecontrols]는 `el.setAttribute
   ('tracked-controls', {idPrefix: 'OpenVR'})`를 수행합니다. 그러면 tracked-controls가 적절한
   게임패드 개체에 연결하여 entity에 대한 포즈와 이벤트를 제공합니다.

- 추적 제어가 제공하는 이벤트를 추상화합니다. 추적 제어 이벤트는 낮은 수준입니다. 버튼 매핑을 미리 
  알아야 하기 때문에 이러한 이벤트만으로는 어떤 버튼이 눌렸는지 알기 어렵습니다. 컨트롤러 구성 요소는 
  각각의 컨트롤러에 대한 매핑을 미리 알 수 있고 `triggerdown` 또는 `xbuttonup`과 같은 더 많은 
  의미론적 이벤트를 제공할 수 있습니다.

- 모델을 제공합니다. 추적 제어만으로는 어떤 모양도 제공하지 않습니다. 컨트롤러 구성 요소는 버튼을 
  누르거나 터치할 때 시각적 피드백, 제스처 및 애니메이션을 표시하는 모델을 제공할 수 있습니다.

- 모델을 제공합니다. 추적 제어만으로는 어떤 모양도 제공하지 않습니다. 컨트롤러 구성 요소는
  버튼을 누르거나 터치할 때 시각적 피드백, 제스처 및 애니메이션을 표시하는 모델을 제공할 수
  있습니다.

다음 컨트롤러 구성 요소는 다음을 감지한 경우에만 활성화됩니다. 
컨트롤러가 게임패드 API에 연결되어 있는 것으로 확인됩니다.

### 3DoF 컨트롤러 추가(daydream-controls, gearvr-controls, oculus-go-controls)

[dof]: http://www.roadtovr.com/introduction-positional-tracking-degrees-freedom-dof/

*3자유도*(3DoF)가 있는 컨트롤러는 회전으로 제한됩니다.
3DoF 컨트롤러에는 위치 추적 기능이 없으므로 손을 앞뒤로 또는 위아래로 뻗거나 움직일
수 없습니다. 3DoF만 있는 컨트롤러를 사용하는 것은 팔이 없는 손과 손목이 있는 것과
같습니다. [VR의 자유도에 대해 자세히 알아보기][dof].


3DoF 컨트롤러 구성 요소는 회전 추적과, 실제 하드웨어와 일치하는 기본 모델 및 버튼 매핑을
추상화하는 이벤트를 제공합니다. Google Daydream, Samsung GearVR 및 Oculus Go용 
컨트롤러에는 3DoF가 있으며 둘 다 한 손에 하나의 컨트롤러만 지원합니다.

[daydreamcomponent]: ../components/daydream-controls.md

Google Daydream용 컨트롤러를 추가하려면 [daydream-controls
component][daydreamcomponent] 사용하세요. Daydream 스마트폰의 Android용 
Chrome에서 사용해 보세요.

```html
<a-entity daydream-controls></a-entity>
```

[gearvrcomponent]: ../components/gearvr-controls.md

Samsung GearVR용 컨트롤러를 추가하려면 [gearvr-controls
component][gearvrcomponent] 사용해보세요. GearVR이 설치된 스마트폰의 Oculus Carmel 
또는 Samsung Internet에서 사용해 보세요.

```html
<a-entity gearvr-controls></a-entity>
```

[oculusgocomponent]: ../components/oculus-go-controls.md

Oculus Go용 컨트롤러를 추가하려면 [oculus-go-controls component][oculusgocomponent] 
사용해보세요. 그런 다음 Oculus Go 헤드셋의 Oculus 브라우저 또는 Samsung 
Internet에서 사용해 보세요.

```html
<a-entity oculus-go-controls></a-entity>
```

### 6DoF 컨트롤러 추가 (vive-controls, oculus-touch-controls)

*6자유도*(6DoF)가 있는 컨트롤러는 회전 및 위치 추적. 제한되는 3DoF가 있는 컨트롤러와 달리
방향에 따라 6DoF가 있는 컨트롤러는 3D 공간에서 자유롭게 이동할 수 있습니다. 6DoF를 
사용하면 등 뒤에서 앞으로 손을 뻗을 수 있고 손을 몸 전체로 움직이거나 얼굴 가까이로 이동할 
수 있습니다. 6DoF가 있다는 것은 손과 팔이 모두 있는 현실과 같습니다. 6DoF는 헤드셋 및 
추가 트래커(예: 발, 소품)에도 적용됩니다. 6DoF는 진정한 몰입형 VR 경험을 제공하기 위한 
최소한의 것입니다.

6DoF 컨트롤러 구성 요소는 전체 추적, 실제 하드웨어와 일치하는 기본 모델 및 버튼 매핑을 
추상화하는 이벤트를 제공합니다. HTC Vive 및 Oculus Rift with Touch는 양손에 6DoF 및 
컨트롤러를 제공합니다. HTC Vive는 또한 현실 세계의 추가 개체를 VR로 추적하기 위한 추적기를 
제공합니다.

[rocks]: https://webvr.rocks
[vivecomponent]: ../components/vive-controls.md

HTC Vive용 컨트롤러를 추가하려면 양손에 [vive-controls component][vivecomponent]를 
사용합니다. [WebVR 지원 데스크톱 브라우저][rocks]에서 사용해 보세요.

```html
<a-entity vive-controls="hand: left"></a-entity>
<a-entity vive-controls="hand: right"></a-entity>
```

[riftcomponent]: ../components/oculus-touch-controls.md


Oculus Touch용 컨트롤러를 추가하려면 [oculus-touch-controls component][riftcomponent]
양손용. 그런 다음 [WebVR 지원 데스크톱 브라우저][rocks]에서 사용해 보세요.

```html
<a-entity oculus-touch-controls="hand: left"></a-entity>
<a-entity oculus-touch-controls="hand: right"></a-entity>
```

## 여러 유형의 컨트롤러 지원

웹은 여러 플랫폼을 지원할 수 있다는 이점이 있습니다. VR에서는 3DoF 플랫폼과 6DoF 플랫폼이 
서로 다른 상호 작용을 제공하고 다른 사용자 경험 처리가 필요하기 때문에 여러 플랫폼을 
지원하는 것이 무엇을 수반하는지 명확하지 않습니다. 웹상의 VR에서 "반응형"이 의미하는 바는 
애플리케이션에 달려 있습니다. 우리가 보여줄 수 있는 것은 몇 가지 다른 방법이지만, 만능은 아닙니다.

### 핸드 컨트롤 구성 요소

[handcontrols]: ../components/hand-controls.md
[lasercontrols]: ../components/laser-controls.md

A-Frame은 [hand-control component][handcontrols]를 통해 여러 유형의 6DoF 컨트롤러(Vive, Oculus Touch)를 지원하기 위한 구현을 제공합니다. 핸드 컨트롤 구성 요소는
물체를 잡는 것과 같은 실내 규모 상호 작용에 맞춰져 있기 때문에 주로 6DoF 컨트롤러용입니다.
핸드 컨트롤 구성 요소는 다음을 통해  Vive 및 Oculus Touch 컨트롤러 위에서 작동합니다.

- vive-controls 및 oculus-touch-controls 구성 요소 모두 설정
- 간단한 손 모델로 컨트롤러 모델 재정의
- Vive 관련 이벤트 및 Oculus Touch 관련 이벤트를 손 이벤트 및 제스처에 매 (예:'gripdown' 및 'triggerdown'을 'thumbup'으로)

핸드 컨트롤 구성 요소를 추가하려면:

```html
<a-entity hand-controls="left"></a-entity>
<a-entity hand-controls="right"></a-entity>
```

모든 유형의 3DoF 컨트롤러(예: Daydream, GearVR)를 잘 추상화하는 3DoF 컨트롤러 구성
요소가 없습니다. 두 컨트롤러를 작동하는 사용자 지정 컨트롤러를 만들 수 있습니다. 
3DoF 컨트롤러는 상호 작용 가능성이 크지 않기 때문에(즉, 터치패드로 회전 추적만) 다루기가
상당히 쉬울 것입니다.

그러나 현재 A-Frame에서 지원하는 모든 6DoF 및 3DoF 컨트롤러를 포함하는 컨트롤러 
구성요소가 있습니다: [laser-controls][lasercontrols].

### 커스텀 컨트롤러 생성

[handcontrolssource]: https://github.com/aframevr/aframe/blob/master/src/components/hand-controls.js

이전에 언급했듯이 애플리케이션은 컨트롤러가 다음과 같을 때 가장 좋습니다.
경험에 맞춤. 대부분의 VR 애플리케이션에는 고유한 컨트롤러가 있습니다. 이는 다양한 모델, 
애니메이션, 제스처, 시각적 피드백 및 상태를 의미합니다.

[hand-controls source code][handcontrolssource]를 보면 처음부터 모든 것을 할 필요 없이
커스텀 컨트롤러를 수행하는 방법을 이해할 수 있습니다.

- 추적 제어 구성 요소는 포즈 및 이벤트를 제공합니다.
- vive-controls, oculus-touch-controls, daydream-controls 또는 gearvr-controls 구성
  요소는 버튼 매핑 컨트롤러별 이벤트를 제공합니다.
- 사용자 정의 컨트롤러 구성 요소는 위의 모든 것을 기반으로 하고 모델, 애니메이션, 시각적 
  피드백, 상태 등을 재정의합니다.

첫 번째 부분은 지원될 컨트롤러 구성 요소를 설정하는 것입니다. 컨트롤러 구성 요소는 추적
 제어 구성 요소가 주입합니다. 예를 들어 모든 컨트롤러를 지원하려면 손을 제공하고 모델을 
 재정의하면서 모든 컨트롤러 구성 요소를 설정합니다.

```js
AFRAME.registerComponent('custom-controls', {
  schema: {
    hand: {default: ''},
    model: {default: 'customControllerModel.gltf'}
  },

  update: function () {
    var hand = this.data.hand;
    var el = this.el;
    var controlConfiguration = {
      hand: hand,
      model: false,
      orientationOffset: {x: 0, y: 0, z: hand === 'left' ? 90 : -90}
    };

    // Build on top of controller components.
    el.setAttribute('vive-controls', controlConfiguration);
    el.setAttribute('oculus-touch-controls', controlConfiguration);
    el.setAttribute('daydream-controls', controlConfiguration);
    el.setAttribute('gearvr-controls', controlConfiguration);
    el.setAttribute('windows-motion-controls', controlConfiguration);

    // Set a model.
    el.setAttribute('gltf-model', this.data.model);
  }
});
```

[a-blast]: https://github.com/aframevr/a-blast/blob/master/src/components/shoot-controls.js
[a-painter]: https://github.com/aframevr/a-painter/blob/master/src/components/paint-controls.js

실제 응용 프로그램에 대한 고급 예제는 [A-Painter용 paint-controls 구성 요소][a-painter] 또는 [shoot-controls 구성 요소 a-blast][a-blast].


## 버튼 및 축 이벤트 수신 대기

컨트롤러에는 많은 버튼이 있고 많은 이벤트를 내보냅니다. 각 버튼에 대해 버튼을 눌렀다가 놓을
 때마다 또는 경우에 따라 터치할 때도 있습니다. 그리고 각 축(예: 트랙패드, 썸스틱)에 대해 
 터치할 때마다 이벤트가 발생합니다. 버튼을 처리하려면 이벤트 테이블의 각 컨트롤러 구성 요소
  문서 페이지에서 이벤트 이름을 찾은 다음 원하는 방식으로 이벤트 핸들러를 등록합니다.


- [daydream-controls events](../components/daydream-controls.md#events)
- [gearvr-controls events](../components/gearvr-controls.md#events)
- [hand-controls events](../components/hand-controls.md#events)
- [oculus-touch-controls events](../components/oculus-touch-controls.md#events)
- [vive-controls events](../components/vive-controls.md#events)
- [windows-motion-controls events](../components/windows-motion-controls.md#events)

예를 들어 Oculus Touch X 버튼 누르기를 듣고 entity의 가시성을 토글할 수 있습니다. 구성 
요소 형식:

```js
AFRAME.registerComponent('x-button-listener', {
  init: function () {
    var el = this.el;
    el.addEventListener('xbuttondown', function (evt) {
      el.setAttribute('visible', !el.getAttribute('visible'));
    });
  }
});
```

그런 다음 구성 요소를 연결합니다.

```html
<a-entity oculus-touch-controls x-button-listener></a-entity>
```

## 컨트롤러에 대한 레이저 상호 작용 추가

[laser-controls]: ../components/laser-controls.md

레이저 상호 작용은 가시 광선 캐스터(라인)를 놓는 것을 말합니다.
컨트롤러. entity가 선을 교차할 때 상호 작용이 발생합니다.
컨트롤러 버튼은 교차 중 및/또는 엔티티가 더 이상 선을 교차하지 않을 때 변경됩니다.
이 상호 작용은 레이캐스터가 이제 헤드셋이 아닌 컨트롤러에 고정된다는 점을 제외하면 응시 기반 상호 작용과
매우 유사합니다.

[레이저 제어 부품][laser-controls] 구성요소는 레이저를 제공합니다.
컨트롤러에 대한 상호 작용 사용법은 거의 비슷합니다.
커서 구성 요소이지만 카메라 아래가 아닌 컨트롤러에 구성 요소를 연결합니다.

```html
<a-entity laser-controls="hand: right"></a-entity>
```

[raycasterfar]: ../components/raycaster.html#properties_far

다음 [raycaster의 길이 조정][raycasterfar]을 통해 레이저의 기본 길이를 구성합니다. 레이저가 개체와 교차할 때 레이저의 길이가 잘립니

```html
<a-entity hand-controls laser-controls raycaster="far: 2"></a-entity>
```

[gaze]: #gaze-based-interactions-with-cursor-component

그런 다음 이벤트 및 상호 작용을 처리하는 것은 [시선 기반
커서 구성 요소][gaze]과의 상호 작용. 위 부분을 참고하세요!

## 컨트롤러에 대한 룸 스케일 상호 작용 추가

방 규모 상호 작용은 더 어렵습니다. 여기에는 3D 공간에서의 상호 작용과 잡기, 던지기, 늘리기, 때리기, 
돌리기, 당기기 또는 밀기와 같은 양손 상호 작용이 포함됩니다. 방 규모 상호 작용의 수 또는 복잡성은 
우리가 완전히 다룰 수 있는 것이 아닙니다. 마우스와 터치스크린만 있는 2D 웹이나 컨트롤러를 흔들기만 하는
3DoF VR과 다르다. 그러나 그대로 또는 참조로 사용할 수 있는 다양한 구현을 보여줄 수 있습니다.


물체와의 교차를 감지하기 위해 레이캐스터를 사용하는 대신 룸 스케일 및 3D 상호 작용에는 *충돌기*가 
포함됩니다. 레이캐스터는 2D 라인인 반면 콜라이더는 3D 볼륨입니다. 물체를 감싸는 다양한 모양의 충돌체
(AABB/box, sphere, mesh)가 있으며 이러한 모양이 교차할 때 충돌이 감지됩니다.

### super-hands Component

[superhands]: https://github.com/wmurphyrd/aframe-super-hands-component
[superhandsdocs]: https://github.com/wmurphyrd/aframe-super-hands-component#description
[superhandsex]: https://wmurphyrd.github.io/aframe-super-hands-component/examples/

[Super-hands component by William Murphy][superhands]는 일체형 자연스러운 손 컨트롤러 상호 작용을 
제공합니다. 구성 요소는 추적된 컨트롤러 및 충돌 감지 구성 요소의 입력을 상호 작용 제스처로 해석하고 
해당 제스처를 대상 entity에 전달하여 응답하도록 합니다.

현재 구현된 제스처는 다음과 같습니다.

- Hover: entity의 충돌 공간에서 컨트롤러 유지
- Grab: entity를 가리키고 있는 동안 버튼을 누르면 잠재적으로 이동할 수도 있습니다.
- Stretch: 두 손으로 개체를 잡고 크기 조정이 가능합니다.
- Drag-drop: entity를 다른 entity로 드래그

entity가 슈퍼 손 제스처에 응답하려면 entity에 제스처를 작업으로 변환하는 구성 요소가 연결되어 있어야 
합니다. super-hands에는 구현된 제스처에 대한 일반적인 반응을 위한 구성 요소가 포함되어 있습니다: 
hoverable, grabbable, stretchable 및 drag-droppable.

[documentation for super-hands][superhandsdocs] 및 [예시][superhandsex]는 시작하기에 탁월합니다.

### 다른 예

[aframe-extras]: https://github.com/donmccurdy/aframe-extras
[aframe-physics]: https://github.com/donmccurdy/aframe-physics-system

살펴볼 다른 예는 다음과 같습니다.

- [tracked-controls](https://github.com/aframevr/aframe/tree/master/examples/showcase/tracked-controls) -
sphere-collider 및 Grab 구성 요소를 통한 상호 작용.
- [ball-throw](https://github.com/bryik/aframe-ball-throw) - Grab and throw
  [aframe-extras] 및 [aframe-physics] 를 사용합니다.
- [vr-editor](https://github.com/caseyyee/aframe-vreditor-component) - 복제, 이동, 삭제, 배치 및 크기 조정을 위한 단일 vr-editor 구성 요소를 통한 상호 작용
