---
id: doc1
title: Best Practices
---

<!-- md 에러 -->

## A-Frame

[ecs]: ./entity-component-system.md
[mixins]: ../core/mixins.md
[template]: https://github.com/supermedium/superframe/tree/master/components/template/

A-Frame의 핵심 구조는 [entity-component(ECS)][ecs]입니다. 재사용성, 모듈성, 구성성, 분리, 캡슐화, 선언성 및 테스트 가능성을 위해 순수한 A-Frame 구성 요소 내에 애플리케이션
코드를 배치하고 구성합니다.

**올바르지 않은 예시**:

```
<a-scene>
  <a-box></a-box>
  <!-- ... -->
</a-scene>

<script>
  // My JavaScript code here!
  // ... NO!
</script>
```

재사용 가능한 코드를 캡슐화하고 A-Frame을 사용하는 목적인 프레임워크를 활용하기 위해 올바른 시간에 실행되도록 A-Frame 구성 요소 내에 코드를 배치합니다.

**올바른 예시**:

```
<script>
  AFRAME.registerComponent('code-that-does-this', {
    init: function () {
      // Code here.
      console.log(this.el);
    }
  });

  AFRAME.registerComponent('code-to-attach-to-box', {
    init: function () {
      // Code here.
      console.log(this.el);
    }
  });
</script>

<a-scene code-that-does-this>
  <a-box code-to-attach-to-box></a-box>
  <!-- ... -->
</a-scene>
```

## 성능

[animation]: ../components/animation.md#direct-values-through-object3d-and-components
[asm]: ../core/asset-management-system.md
[hardware]: ./vr-headsets-and-webvr-browsers.md
[stats]: ../components/stats.md
[pool]: ../components/pool.md
[background]: ../components/background.md
[geometrymerger]: https://www.npmjs.com/package/aframe-geometry-merger-component


성능은 VR에서 매우 중요합니다. 사람들이 편안함을 느끼려면 높은 프레임 속도를 유지해야 합니다. 다음은 A-Frame 장면의 성능을 향상시키는 데 도움이 되는 몇 가지 방법입니다.

- [권장 하드웨어 사양][hardware] 사용.
- **[stats component][stats]** 를 사용하여 다양한 메트릭(FPS, vertex and face count, geometry 및 draw calls, number, entities)을 주시하세요. 우리는 FPS를 최대화하고 다른 모든 것을 최소화하고 싶습니다.
- `draw calls`을 최대한 줄이세요. 최적화가 없는 각 geometry, 객체, 모델은 일반적으로 그리는 방식입니다. 경험상 최대 300 미만으로 유지하고, 가능하면 모든 정적 메쉬를 [Marge][geometrymerger]합니다. [geometry-merger][geometrymerger]를 사용한 다음 정점 색상이 활성화된 three.js 재질을 사용할 수 있습니다. three.js 도형은 병합 후 도형을 유지 관리하고 조작하는 데 사용할 수 있는 꼭짓점당 색상, uvs와 같은 데이터를 유지합니다.
- **[자산 관리 시스템][asm]** 을 사용하여 브라우저 캐시에 자산을 미리 로드합니다.
- 모델을 사용하는 경우 실시간 조명과 그림자에 의존하기보다 조명을 텍스처로 굽는 방법을 찾으세요.
- 일반적으로 장면에 있는 `entity`와 라이트의 수가 적을수록 좋습니다.
- 텍스처의 해상도가 2의 제곱수(예: 256x256, 512x1024) 렌더러가 런타임 중에 텍스처의 크기를 조정해야 하는 것을 피하기.
- 모델의 면과 정점 수를 제한합니다.
- 일부 추가 기술에는 지오메트리 인스턴싱, [지오메트리 병합][geometrymerger], 세부 수준(LOD)이 포함됩니다.
- 레이캐스터 또는 콜라이더를 사용할 때 장면의 모든 객체에 대해 레이캐스팅하는 대신 레이캐스팅할 `entity`를 선택합니다.
- 지속적으로 실행되는 동작을 추가할 때 A-Frame 구성 요소 'tick' 핸들러를 사용하여 전역 렌더 루프에 연결합니다. 다음과 같은 유틸리티를 사용하세요
  적절한 경우 `tick` 핸들러가 실행되는 횟수를 제한하는 `AFRAME.utils.throttleTick`.
- 'a-sky' 대신 **[background component][background]**를 사용하여 장면 배경으로 단색을 정의합니다. 이렇게 하면 불필요한 지오메트리가 생성되는 것을 방지할 수 있습니다.
- three.js에서 'position', 'rotation', 'scale', 'visible' 업데이트
  레벨(`el.object3D.position`, `el.object3D.rotation`, `el.object3D.scale`,
  `.setAttribute`에 대한 오버헤드를 피하기 위해 `el.object3D.visible`)를 사용합니다.
- 동일한 유형의 많은 entity를 생성, 제거 및 다시 생성해야 하는 경우 **[pool component][pool]**을 사용하여 entity를 사전 생성 및 재사용합니다. 이렇게 하면 즉석에서 entity를 만드는 비용을 방지하고 가비지 수집을 줄일 수 있습니다.
- 애니메이션 구성 요소를 사용할 때 [값을 직접 애니메이션][animation]하면 `.setAttribute`를 건너뛰고 JS 값에 직접 애니메이션을 적용합니다.
  예를 들어 `material.opacity` 대신 `components.material.material.opacity`에 애니메이션을 적용합니다.

### GPU 텍스처 사전 로딩

GPU에 대한 비차단 텍스처 업로드를 사용할 수 있을 때까지 모든 재료와 텍스처를 미리 그려보세요. 머티리얼과 텍스처를 처음 그리면 GPU에 업로드하는 동안 브라우저가 멈추고 차단됩니다. 다음을 호출하여 텍스처를 수동으로 미리 로드할 수 있습니다.

```js
document.querySelector('a-scene').renderer.setTexture2D(ourTexture, 0);
```

자동으로 수행할 수 있도록 A-Frame에 편리한 API를 제공하도록 노력할 것입니다.

[360]: https://aframe-360-gallery.glitch.me

예를 들어, [360&deg; 이미지 갤러리][360]처럼 브라우저 성능 도구를 살펴보면 처음으로 새 이미지로 전환할 때 프레임 드랍이 있지만 두 번째로 다시 이미지로 전환할 때 부드럽게 전환됩니다.

소재와 질감을 최대한 재사용하여 소수의 고유한 소재를 지향합니다. 텍스처 아틀라스는 더 다양한 느낌을 주는 동시에 재료를 재사용하는 효율적인 방법을 제공합니다. 'MeshLambertMaterial' 또는 'MeshBasicMaterial'과 같은 더 단순한 three.js 재질은 성능이 더 우수하며 종종 로우 폴리곤 장면에 충분합니다.

특히, 라이팅되지 않은(기본) 머티리얼에 pre-baked된 라이팅은
성능을 크게 향상시킵니다. A-Frame의 기본 PBR 기반(표준) 재료는 물리적으로 더 사실적이지만 단순한 장면에서는 더 비싸고 종종 불필요합니다.

### JavaScript에서 가비지 컬렉션 최소화

[firefox-alloc]: https://developer.mozilla.org/en-US/docs/Tools/Performance/Allocations
[chrome-alloc]: https://developers.google.com/web/tools/chrome-devtools/memory-problems/#spot_frequent_garbage_collections

가비지를 만들고 새로운 JavaScript 객체, 배열, 가능한 한 많은 문자열과 기능을 사용합니다. 2D 웹에서는 가비지 컬렉터가 실행되는 유휴 시간이 많기 때문에 많은 JavaScript 객체를 생성하는 것은 그다지 큰 문제가 아닙니다. VR의 경우 가비지 수집으로 인해 메모리 정리를 위해 일시 중지될 때 프레임이 떨어질 수 있습니다. 이를 피하기 위해 메모리 할당을 최소화하고 개체가 가비지 수집되지 않도록 개체를 유지하려고 합니다.

할당 및 가비지 수집 감지에 대해 자세히 알아보기.
[Firefox][firefox-alloc] and [Chrome][chrome-alloc] 성능 도구.

`Object.keys(obj).forEach(function () { });`와 같은 패턴을 피하세요.
새로운 배열, 함수 및 콜백을 생성하는 것과 비교하여 `for (key in obj)`를 사용합니다. 또는 배열 반복의 경우 `.forEach`를 피하고 간단한 `for` 루프를 사용하십시오.
대신에. `utils.clone`이나 `.slice` 대신 `utils.extend(target, source)`와 같은 메소드를 사용하여 불필요한 객체 복사를 피하세요.

이벤트를 내보내는 경우 이벤트 세부정보에 대해 동일한 개체를 다시 사용하세요.

```js
AFRAME.registerComponent('foo', {
  init: function () {
    this.someData = [];
    this.evtDetail = {someData: this.someData};
  },

  tick: function (time) {
    this.someData.push(time);
    this.el.emit('bar', this.evtDetail);
  }
});
```

위의 모든 제안은 모든 프레임에서 실행되는 `tick()` 핸들러에서 _특히_ 중요합니다.

가비지 수집기 활동 감소에 대한 추가 기사:

- [JS에서 가비지 컬렉터 활동을 줄이기 위한 모범 사례](https://stackoverflow.com/questions/18364175/best-practices-for-reducing-garbage-collector-activity-in-javascript)
- [가비지가 적은 실시간 JavaScript를 작성하는 방법](https://www.construct.net/en/blogs/construct-official-blog-1/how-to-write-low-garbage-real-time-javascript-761)

### `tick` Handlers

[throttle]: ../core/utils.html#aframe-utils-throttletick-function-t-dt-minimuminterval-optionalcontext

구성 요소 tick 핸들러에서 새 개체를 만드는 데 검소합니다. 개체를 재사용하세요. 재사용 가능한 비공개 보조 변수를 만드는 패턴은 클로저를 사용하는 것입니다. 아래에서 도우미 벡터와 쿼터니언을 만들고 각 프레임에 새 벡터를 만드는 대신 프레임 간에 재사용합니다. 이러한 변수는 구성 요소의 모든 인스턴스 간에 공유되므로 상태를 유지하지 않도록 주의하십시오. 이렇게 하면 메모리 사용량과 가비지 수집이 줄어듭니다.

```js
AFRAME.registerComponent('foo', {
  tick: function () {
    this.doSomething();
  },

  doSomething: (function () {
    var helperVector = new THREE.Vector3();
    var helperQuaternion = new THREE.Quaternion();

    return function () {
      helperVector.copy(this.el.object3D.position);
      helperQuaternion.copy(this.el.object3D.quaternion);
    };
  })()
});
```

또한 tick에서 구성 요소를 지속적으로 수정하는 경우 속성 업데이트를 위해 동일한 개체를 전달해야 합니다. A-Frame은 가장 최근에 전달된 개체를 추적하고 추가 속도 향상을 위해 후속 호출에서 유형 검사를 비활성화합니다. 다음은 모든 눈금에서 회전을 수정하는 권장 눈금 함수의 예입니다.

```js
AFRAME.registerComponent('foo', {
  tick: function () {
    var el = this.el;
    var rotationTmp = this.rotationTmp = this.rotationTmp || {x: 0, y: 0, z: 0};
    var rotation = el.getAttribute('rotation');
    rotationTmp.x = rotation.x + 0.1;
    rotationTmp.y = rotation.y + 0.1;
    rotationTmp.z = rotation.z + 0.1;
    el.setAttribute('rotation', rotationTmp);
  }
});
```

tick 함수에서 수행하는 작업을 다시 처리하세요.
성능 코드는 초당 90번 실행되기 때문입니다. [`utils.throttleTick`][throttle]을 사용하여 코드를 덜 자주 실행하는 것을 고려하세요.

## VR 디자인

[oculus]: https://developer.oculus.com/design/latest/concepts/book-bp/

VR을 위한 디자인은 평면 경험을 위한 디자인과 다릅니다. 신제품으로
매체, 특히 사용자의 편안함과 존재감을 유지하기 위해 따라야 할 새로운 모범 사례가 있습니다. 철저하게 작성되었으므로 우리는 이 가이드를 따릅니다. VR 상호 작용 디자인은 상당히 새로운 것이며 절대적인 것은 없습니다.

- [오큘러스 모범 사례 (for VR)][oculus]

주의할 사항:

- 일반적인 황금률은 사용자로부터 예기치 않게 카메라를 제어하는 일이 없도록 하는 것입니다.

- 단위(예: 위치)는 미터로 간주해야 합니다. WebVR API가 대부분의 카메라 컨트롤에 제공되는 미터 단위의 포즈를 반환하기 때문입니다. 단위를 미터로 간주하여 예상 규모를 달성합니다.

손과 컨트롤러를 사용해 보세요. 최상의 경험을 위해 애플리케이션을 특정 폼 팩터로 대상으로 지정하고 모든 플랫폼에 대해 한 번에 축소하십시오.