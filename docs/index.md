---
id: doc7
title: Introduction
examples: ""
# - title: Hello, World!
src: "https://glitch.com/edit/#!/aframe?path=index.html"
---

[three.js]: https://threejs.org

## 시작하기

[glitch]: http://glitch.com/~aframe

A-Frame은 아무것도 설치 할 필요 없이 일반 HTML 파일에서 개발할 수 있습니다.
A-Frame을 사용해 보는 가장 좋은 방법은 무료로 즉시 호스팅 및 배포하는 온라인
코드 편집기인 **[Glitch에서 시작 예제][glitch]**를 리믹스 하는 것입니다. 
또는 `.html` 파일을 생성하고 `<head>`에 A-Frame을 포함합니다:

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

[Installation]: ./installation.md
[school]: https://aframe.io/school/

[Installation] 페이지에서는 A-Frame을 시작하기 위한 추가 옵션을 제공합니다.
A-Frame 학습을 시작하려면 [A-Frame School][school]에서 문자를 보완하는 시각적
단계별 수업을 확인하십시오.

## A-Frame란?

[github]: https://github.com/aframevr/
[community]: https://aframe.io/community/

![A-Frame](https://cloud.githubusercontent.com/assets/674727/25392020/6f011d10-298c-11e7-845e-c3c5baebd14d.jpg)

:a:-Frame은 가상현실(VR) 환경을 구축하기 위한 웹 프레임워크입니다.
A-Frame은 HTML을 기반으로 하기 때문에 쉽게 시작할 수 있습니다. 그러나 A-Frame은
단순한 3D 장면 그래픽 에디터나 마크업 언어가 아닙니다. core는 [three.js]에 선언적이고 
확장 가능하며 구성 가능한 구조를 제공하는 강력한 엔티티 컴포넌트 프레임 워크입니다.

Mozilla에서 시작한 [오픈 소스 프로젝트][github]로서 [Supermedium](https://supermedium.com)
이 공동 제작자로 유지 관리하는 A-Frame은 VR 콘텐츠를 쉽고 강력한 기능으로
개발할 수 있으며,
[가장 큰 VR 커뮤니티][community] 중 하나로 성장했습니다.

Vive, Rift, Windows Mixed Reality,Daydream, GearVR, Cardboard, Oculus Go 와 같은 
대부분의 VR 헤드셋을 지원하며 증강 현실에서도 사용할 수 있습니다. 
A-Frame은 PC, 모바일을 포함한 모든 플랫폼을 지원하지만, 공간 이동 및 컨트롤러를 활용한 완전한 몰입형 인터랙티브 VR 경험을 목표로 합니다.

<div class="docs-introduction-examples">
  <a href="https://supermedium.com/supercraft">
    <img alt="Supercraft" target="_blank" src="https://user-images.githubusercontent.com/674727/41085457-f5429566-69eb-11e8-92e5-3210e4c6c4a0.gif" height="190" width="32%"></img>
  </a>
  <a href="https://aframe.io/a-painter/?url=https://ucarecdn.com/962b242b-87a9-422c-b730-febdc470f203/">
    <img alt="A-Painter" target="_blank" src="https://cloud.githubusercontent.com/assets/674727/24531388/acfc3dda-156d-11e7-8563-5bd75252f70f.gif" height="190" width="32%"></img>
  </a>
  <a href="https://supermedium.com">
    <img alt="Supermedium" target="_blank" src="https://user-images.githubusercontent.com/674727/37294616-7212cd20-25d3-11e8-9e7f-c0c61074f1e0.png" height="190" width="32%"></img>
  </a>
  <a href="https://aframe.io/a-blast/">
    <img alt="A-Blast" target="_blank" src="https://cloud.githubusercontent.com/assets/674727/24531440/0336e66e-156e-11e7-95c2-f2e6ebc0393d.gif" height="190" width="32%"></img>
  </a>
  <a href="https://aframe.io/a-saturday-night/">
    <img alt="A-Saturday-Night" target="_blank" src="https://cloud.githubusercontent.com/assets/674727/24531477/44272daa-156e-11e7-8ef9-d750ed430f3a.gif" height="190" width="32%"></img>
  </a>
  <a href="https://github.com/googlecreativelab/webvr-musicalforest">
    <img alt="Musical Forest by @googlecreativelab" target="_blank" src="https://cloud.githubusercontent.com/assets/674727/25109861/b8e9ec48-2394-11e7-8f2d-ea1cd9df69c8.gif" height="190" width="32%"></img>
  </a>
</div>

## 특징

:eyeglasses: **쉽고 간단한 VR 콘텐츠 제작**: `<script>` 태그와 `<a-scene>`만 입력하세요. 
A-Frame 3D 템플릿, VR 기본 컨트롤을 지원합니다. 설치와 빌드 단계 또한 없습니다.

:heart: **선언적 HTML**: HTML은 쉽게 이해할 수 있고, 복사 및 붙여넣기가 쉽습니다.
HTML을 기반으로 하는 A-Frame은 웹 개발자, 아티스트, 디자이너, 교육자,
기업, 어린이 등 모든 사용자가 쉽게 배울 수 있습니다.

:electric_plug: **Entity-Component Architecture**: A-Frame은 강력한
[three.js]프레임 워크를 기반으로 구조적이며 재사용 가능한
[entity-component structure][ecs]를 제공합니다. 
개발자는 JavaScript, DOM API, three.js, WebVR 및 WebGL에 자유롭게 접근할 수
있습니다.

:globe_with_meridians: **크로스-플랫폼 지원 VR**: Vive, Rift, Windows Mixed Reality, Daydream, GearVR, 
및 Cardboard용 VR 애플리케이션과 각각의 모든 컨트롤러를 지원하여 빌드합니다. 
혹시 헤드셋이나 컨트롤러가 없으신가요? 걱정마세요! 
A-Frame은 데스크탑 및 스마트폰에서도 작동이 가능합니다.

[ecs]: ./entity-component-system.md

[A-Painter]: https://github.com/aframevr/a-painter
[Tilt Brush]: https://www.tiltbrush.com/

:zap: **성능**: 처음부터 A-Frame은 WebVR에 최적화 되어 있습니다. A-Frame이
DOM을 사용할 때 브라우저 레이아웃 엔진을 이용하지  않습니다. 3D객체 업데이트는 메모리에서 가비지와 오버헤드로 수행됩니다. 대규모의 인터랙티브한 
 WebVR 애플리케이션도 90fps에서 원활하게 실행되었습니다.

[inspector]: ./visual-inspector-and-dev-tools.md

:mag: **Visual Inspector**: A-Frame은 편리한 내장[visual 3D inspector][inspector]를 제공합니다. 
A-Frame 장면을 열고 `<ctrl> + <alt> + i`를 누른 후 확인 해보십시오!

![Inspector](https://cloud.githubusercontent.com/assets/674727/25377018/27be9cce-295b-11e7-9098-3e85ac1fe172.gif)

[augmented reality]: https://github.com/jeromeetienne/AR.js#augmented-reality-for-the-web-in-less-than-10-lines-of-html
[environment]: https://github.com/supermedium/aframe-environment-component
[multiuser]: https://github.com/haydenjameslee/networked-aframe
[oceans]: https://github.com/donmccurdy/aframe-extras/tree/master/src/primitives
[particle systems]: https://github.com/IdeaSpaceVR/aframe-particle-system-component
[physics]: https://github.com/donmccurdy/aframe-physics-system
[state]: https://npmjs.com/package/aframe-state-component
[super hands]: https://github.com/wmurphyrd/aframe-super-hands-component
[teleportation]: https://github.com/fernandojsg/aframe-teleport-controls

:runner: **컴포넌트**: 대부분의 주요 헤드셋을 지원하는 geometries, materials, lights, 
animations, models, raycasters, shadows, positional audio, text 및 controls 같은
핵심 컴포넌트가 있습니다.

[environment], [state], 
[particle systems], [physics], [multiuser], [oceans], [teleportation], [super hands] 및
[augmented reality]과 같은 수백 가지 컴포넌트를 커뮤니티에서 얻을 수 있습니다.

:earth_americas: **강력한 확장성**: Google, Disney, Samsung, Toyota, Ford, 
Chevrolet, Amnesty International, CERN, NPR, Al Jazeera, The Washington Post, NASA와 
같은 회사에서 사용되었습니다. Google, Microsoft, Oculus 및 Samsung과 같은 회사가 개발에 참여했습니다.

## 실전으로 가봅시다! 

[Discord]: https://supermedium.com/discord
[slack]: https://aframe.io/slack-invite/

처음  A-Frame을 학습하기 위한 팁을 알려드리겠습니다.

1. [ 웹 XR 코리아](https://www.facebook.com/groups/webxrkorea)에 가입해서 한국 개발자들과 최신 정보를 공유하고 함께 학습해보세요.


2. A-Frame에 대한 업데이트 및 팁과 주요 커뮤니티 프로젝트를 보려면 
[영문 뉴스레터를 구독](https://aframe.io/subscribe/)하세요. 


3. 문서를 한번 훑어보세요. 예제는
[Glitch](https://glitch.com/~aframe)에 있습니다.

4. 질문이 있을 경우 [Discord][Discord] 및 [Slack][slack],
[StackOverflow](http://stackoverflow.com/questions/ask/?tags=aframe)를 이용하세요.
여기에 질문을 하면 도움을 받을 수 있습니다.

5. 새로운 소식은 [newsletter](https://aframe.io/subscribe/)와
[blog](https://aframe.io/blog/)에 게시됩니다.

그리고 JavaScript와 three.js에 대한 기초를 공부하는 것이 A-Frame을 사용할때 정말 많은 
도움이 됩니다.
