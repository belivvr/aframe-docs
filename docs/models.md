---
id: doc11
title: 3D 모델
examples:
 - title: Modifying Material of Model
   src: https://glitch.com/edit/#!/aframe-modify-model-material?path=index.html:1:0
---

[3loaders]: https://github.com/mrdoob/three.js/tree/dev/examples/js/loaders
[ecsfind]: ./entity-component-system.md#where-to-find-components
[glTF]: ../components/gltf-model.md
[OBJ]: ../components/obj-model.md
[recommend using glTF]: ../components/gltf-model.md#why-use-gltf

A-Frame은 [glTF] 및 [OBJ]를 로드하기 위한 구성 요소를 제공합니다. glTF가 웹을 통해 3D 
모델을 전송하는 표준으로 채택되기 때문에 가능하면 [glTF를 사용하는 것이 좋습니다]. 구성 
요소는 모든 파일 형식, 특히 [three.js 로더][3loaders]가 있는 모든 형식을 처리하도록 
작성할 수 있습니다. 다른 형식(예: PLY, FBX, JSON, three.js)을 처리하도록 이미 작성된 
[에코시스템에서 구성 요소 찾기][ecsfind]를 시도할 수도 있습니다.

모델은 정점, 면, UV, 텍스처, 재질 및 애니메이션이 포함된 일반 텍스트 파일 형식으로 제공됩니다. 일반적으로 모델 파일과 함께 텍스처 이미지도 함께 제공됩니다. three.js 로더는 이러한 파일을 구문 분석하여 three.js 장면 내에서 메시로 렌더링합니다. A-Frame 모델 구성 요소는 이러한 three.js 로더를 래핑합니다.

## 모델 애니메이션

[mixer]: https://github.com/donmccurdy/aframe-extras/tree/master/src/loaders#animation

[Don McCurdy's animation-mixer component][mixer]를 사용하여 모델의 내장 애니메이션을 재생할 수 있습니다. 애니메이션은 일반적으로 A-Frame 수준에서 제공되지 않고 애니메이션 도구나 프로그램을 통해 구축된 모델로 제공됩니다. 애니메이션 믹서 구성 요소는 향후 A-Frame의 코어에 병합될 수 있습니다.

애니메이션 제작에 대한 시작 자료는 다음을 참조하십시오.

- [블렌더 튜토리얼 - 애니메이션 및 게임에서 재사용할 액션 생성 및 편집](https://www.youtube.com/watch?v=Gb152Qncn2s)
- [Workflow: Arturo Paracuellos의 Blender에서 three.js로의 애니메이션](http://unboring.net/workflows/animation.html)

## 모델을 찾을 수 있는 곳

3D 모델을 찾을 수 있는 위치는 다음과 같습니다.

- [Sketchfab](https://sketchfab.com)
- [Clara.io](http://clara.io)
- [Archive3D](http://archive3d.net)
- [Sketchup's 3D Warehouse](https://3dwarehouse.sketchup.com)
- [TurboSquid](http://www.turbosquid.com/Search/3D-Models/free)

## 모델을 만드는 방법

모델을 만드는 프로그램은 다음과 같습니다.

- [Supercraft](https://supermedium.com/supercraft/) - 모델링 기술 없이 VR 내에서 직접 모델링하고 로드할 수 있는 **A-Frame으로** 제작
  [`aframe-supercraft-loader`](https://www.npmjs.com/package/aframe-supercraft-loader).
- [Blender](https://www.blender.org/)
- [MagicaVoxel](https://ephtracy.github.io/)
- [Autodesk Maya](https://www.autodesk.com/products/maya/overview) or [Maya LT](https://www.autodesk.com/products/maya-lt/overview)
- [Maxon Cinema4D](https://www.maxon.net/en-us/)

## 호스팅 모델

Refer to [호스팅 및 게시 &mdash; 호스팅 모델](./hosting-and-publishing.md#hosting-models).

## 재료 수정

[modify]: https://glitch.com/edit/#!/aframe-modify-model-material?path=index.html:1:0

모델의 재질을 수정하려면 모델이 로드될 때까지 기다렸다가 모델에서 생성된 three.js 메쉬를 수정해야 합니다. A-Frame 모델 구성 요소는 네트워크에서 모델을 요청하고, 모델을 구문 분석하고, three.js 메쉬 또는 객체를 생성하고, `.getObject3D('mesh') 아래의 `<a-entity>` 아래에 로드합니다. `. 우리는 그 메쉬에 접근하여 무엇이든 수정할 수 있습니다. 이 경우에는 three.js 재질을 수정할 수 있습니다.

[로드된 모델의 재료 수정]의 이 라이브 예를 참조하십시오.[modify].

```html
<script>
  AFRAME.registerComponent('modify-materials', {
    init: function () {
      // Wait for model to load.
      this.el.addEventListener('model-loaded', () => {
        // Grab the mesh / scene.
        const obj = this.el.getObject3D('mesh');
        // Go over the submeshes and modify materials we want.
        obj.traverse(node => {
          if (node.name.indexOf('ship') !== -1) {
            node.material.color.set('red');
          }
        });
      });
    }
  });
</script>

<a-scene background="color: #ECECEC">
  <a-assets>
    <a-asset-item id="cityModel" src="https://cdn.aframe.io/test-models/models/glTF-2.0/virtualcity/VC.gltf"></a-asset-item>
  </a-assets>
  <a-entity gltf-model="#cityModel" modify-materials></a-entity>
</a-scene>
```

## 문제 해결

[모델 호스팅]: ./hosting-and-publishing.md#hosting-models

먼저 콘솔에 오류가 있는지 확인하십시오. CORS와 관련된 일반적인 문제는 [모델 호스팅][모델 
호스팅]을 적절하게 수행하여 해결할 수 있으며 콘솔은 또한 모델에 누락된 추가 파일이 필요한지 
알려줍니다.

### 내 모델이 보이지 않아!

콘솔에 오류가 없으면 모델을 축소해 보십시오. 내보낼 때 배율이 일치하지 않는 경우가 종종
 있으며 이로 인해 카메라가 모델 내부에 있게 되어 모델을 볼 수 없게 됩니다.

```html
<a-entity gltf-model="#tree" scale="0.01 0.01 0.01"></a-entity>
```

그래도 작동하지 않으면 `ctrl + alt + i`를 눌러 Inspector를 열고 축소하여 모델이 실제로 있는지 확인합니다.

### I Don't See Textures

때로는 텍스처가 즉시 작동하지 않을 수 있습니다. 이는 일반적으로 내보내기가 웹에서 작동하지 
않는 텍스처에 대해 `C:\\Path\To\Model\texture.jpg` 또는 `/Path/To/Model/texture.
jpg`와 같은 절대 경로를 사용하기 때문입니다. 대신 모델 또는 `.mtl` 파일에 상대적인 
`texture.jpg` 또는 `images/texture.jpg`와 같은 상대 경로를 사용하세요.

1. 일반 텍스트 편집기에서 모델(또는 OBJ를 수행하는 경우 .mtl)을 엽니다.
2. 텍스처 이름 검색(예: `texture.jpg`)
3. 상대적으로 만들어 텍스처 경로를 수정합니다.

이것이 작동하지 않으면 MTL 파일을 확인해야 하며 TGA 또는 일반 이미지가 아닌 다른 종류의 
텍스처를 사용하려고 시도하고 있음을 알 수 있습니다. 이 경우 추가 three.js 로더를 포함해야 
합니다. 그러나 변환기를 사용하여 PNG와 같은 이미지만 사용하도록 모든 TGA를 변환하고 
'tga'의 모든 인스턴스를 'png'로 바꾸는 것이 더 쉬울 수 있습니다.

### 내 모델에 애니메이션이 적용되지 않습니다.

[aframe-extras]: https://github.com/donmccurdy/aframe-extras

Don McCurdy의 [aframe-extras]의 일부인 [animation-mixer component][mixer]는 three.js(.json) 및 glTF(.gltf) 모델에서 애니메이션을 재생하기 위한 컨트롤을 제공합니다.

### 내 모델이 왜곡되어 보입니다.

모델의 일반적인 문제는 법선의 잘못된 방향입니다. 당신은 당신을 알게 될 것입니다
지오메트리의 일부 면이 다음과 같은 경우 법선에 문제가 있습니다.
투명하거나 메쉬에 "구멍"이 있습니다.

1. 모델을 블렌더로 가져오기
2. 속성 패널의 음영 섹션에서 뒷면 컬링을 켭니다.
(`n`) 어떤 얼굴이 잘못되었는지 더 잘 알 수 있습니다.
3. 개체 선택
4. 편집 모드로 이동(`<tab>`)
5. a를 눌러 모든 얼굴을 선택합니다.
6. `<ctrl> + n`을 눌러 법선을 일관되게 만듭니다. 반대로 보인다면
원하는 것을 도구 모음(`t`)을 통해 뒤집으세요.

## 모델 성능

큰 파일이나 복잡한 모델을 가져올 때 브라우저가 느려지거나 로드되지 않는 것을 알 수 있습니다. 충실도가 높은 렌더링을 위해 설계된 복잡한 모델은 실시간 응용 프로그램에 적합하지 않습니다. 그러나 모양을 유지하면서 성능을 향상시키기 위해 할 수 있는 몇 가지 작업이 있습니다.

### 성능 테스트

[stats]: ../components/stats.md

장면의 성능을 파악하려면 [stats component][stats]:를 활성화하십시오.

```html
<a-scene stats>
```

그래프를 주시하면서 장면을 이동하고 다양한 시나리오를 테스트하고 다른 하드웨어에서 
테스트하십시오. 개발 PC는 스마트폰보다 장면을 더 쉽게 처리할 수 있습니다. 60fps에 도달하지 
못한다는 것을 알게 되면 범인을 찾을 때까지 장면에서 다른 요소를 제거해 보십시오. 성능을 
저하시키는 개체가 3D 모델인 경우 최적화를 시도할 수 있습니다.

### 복잡한 모델 최적화

장면 최적화의 가장 큰 요인 중 하나는 모델 복잡성과 얼굴 수입니다. geometry는 적을수록 좋습니다.

모델의 면 수를 줄이는 빠른 방법은 블렌더의 decimate modifier를 사용하는 것입니다. 
데시메이트 수정자는 모델의 UV 좌표를 유지하면서 기하학적 면의 양을 줄입니다. 적절한 모델링 
기술을 능가하는 것은 없지만 데시메이트 수정자는 제대로 최적화되지 않은 파일을 더 원활하게 
실행하기 위한 훌륭한 최후의 수단이 될 수 있습니다. 수정자에 대한 설정은 모델과 제거하려는 
세부 정보의 정도에 따라 크게 달라집니다.

![Blender's Decimate Modifier](https://cloud.githubusercontent.com/assets/674727/25730604/f5402d90-30f2-11e7-9571-96bcdef11a6a.jpg)

비율(강조 표시됨)을 조정하여 면 수를 줄입니다.

프로세스가 끝나면 일부 면을 수동으로 수정해야 할 수도 있습니다. 결과에 만족하면 *사본을 
저장*하고 원하는 파일 형식으로 내보냅니다. 테스트하고 필요에 따라 조정하십시오. 적용하기
전에 수정자를 적용해야 할 수도 있습니다.
