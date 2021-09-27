---
id: doc4
title: "자주 묻는 질문"
---

[ecs]: ./entity-component-system.md
[github]: http://github.com/aframevr/aframe/
[three]: http://threejs.org
[slack]: https://aframe.io/slack-invite/
[twitter]: https://twitter.com/aframevr/
[stackoverflow]: http://stackoverflow.com/questions/tagged/aframe/

<!--toc-->

## 에이프레임의 퍼포먼스는?

[a-painter]: https://blog.mozvr.com/a-painter
[tiltbrush]: https://www.tiltbrush.com/
A-Frame은 적절한 브라우저로 네이티브와 같은 지연 및 프레임 속도를 달성할 수 있습니다.
(예: WebVR이 있는 Firefox). 예를 들어 [A-Painter][a-painter]는 [기울기
브라우저에서 초당 90프레임을 원활하게 실행할 수 있는 브러시][tiltbrush]
네이티브와 구별할 수 없습니다.

HTML을 기반으로 하는 A-Frame은 문제가 되지 않습니다. 브라우저의 2D 레이아웃은
A-Frame은 일반 웹 애플리케이션의 주요 성능 문제였습니다.
사용자 정의 요소는 데이터 컨테이너 역할만 하고 트리거하지 않습니다.
레이아웃 엔진은 3D 작업을 최소한의 오버헤드로 메모리에서 수행되며
OpenGL 또는 Direct3D에 바인딩되는 WebGL로 렌더링됩니다

오버헤드를 최소화하기 위해 A-Frame이 취하는 몇 가지 조치는 다음과 같습니다.

- `setAttribute`를 축소된 코드 경로와 동기화합니다. 수정
  거의 `setAttribute('position', {x: 1, y: 2, z: 3})`를 통한 entity의 위치
  기본 three.js 객체를 직접 터치합니다. 간접비에는 다음이 포함됩니다.
  변경을 트리거해야 하는지 여부를 결정하기 위해 새 데이터를 이전 데이터와 비교
  및 수명 주기 처리기를 호출합니다.
- 데이터를 DOM으로 다시 직렬화하지 않습니다. entity의 속성을 변경할 때 실제
  브라우저의 DOM 검사기에 표시되는 HTML은 문자열화를 줄이기 위해 업데이트되지 않습니다.
  작업. 이것은 대부분의 작업이 메모리에서 수행되도록 합니다.
  가상 DOM.
- 모든 것을 단일 `requestAnimationFrame` 아래에 유지하고
  구성 요소는 `tick` 핸들러를 통해 단일 전역 렌더 루프에 연결됩니다.
- HTML 속성 값 캐싱.
- 자산, 재료, 텍스처, 형상을 캐싱합니다.
- 공연에서 사용되는 공연 기법을 구현하는 커뮤니티 구성 요소 제공
  3D 및 게임 산업(예: 지오메트리 인스턴싱, 세부 수준, 개체 풀링).

[bestpractices]: ../introduction/best-practices.md

A-Frame은 대부분의 경우 우수한 성능을 제공하는 합리적인 기본값을 제공합니다.
일반적인 사용 사례. 그러나 성능은 궁극적으로
각 개별 응용 프로그램의 복잡성과 특성. 최고를 얻으려면
리소스를 사용하려면 3D 그래픽에 대한 더 깊은 이해가 필요합니다. 보다
시작하려면 [최상의 성능 사례 및 지침][bestpractices] 를 참조하세요.

## 경험이 VR 또는 AR 모드에 들어가지 않는 이유는 무엇입니까?

[release]: https://github.com/aframevr/aframe/releases
[webxr]: https://immersive-web.github.io/webxr/

A-Frame 1.2.0 또는 이전 버전을 사용하는 경우 [최신 릴리스][release]로 업데이트해야 할 수 있습니다. 브라우저가 [WebXR 표준][webxr]으로 마이그레이션 중이며 이전 버전이 더 이상 작동하지 않을 수 있습니다.

또한 HTTPS를 통해 콘텐츠를 제공해야 합니다. WebXR API는 HTTP를 통해 사용할 수 없습니다.


## 내 자산(예: 이미지, 동영상, 모델)이 로드되지 않는 이유는 무엇인가요?

[cors]: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
[localserver]: ./installation.md#local-development
[startplayback]: https://aframe.io/aframe/examples/test/video/
[videotestcode]: https://github.com/aframevr/aframe/blob/master/examples/test/video/index.html
[videoplaycomponent]: https://github.com/aframevr/aframe/blob/master/examples/js/play-on-click.js

먼저 로컬 개발을 수행하는 경우 [로컬 서버][localserver] 자산 요청이 제대로 작동하도록 합니다.

다른 도메인에서 자산을 로드하는 경우 자산이 [CORS(교차 출처 리소스 공유) 헤더][cors]와 함께 제공됩니다. CORS 헤더가 있는 자산을 제공할 호스트를 찾거나 자산을
애플리케이션과 동일한 도메인(디렉토리)입니다.

비디오를 로드하려는 경우 브라우저가 비디오를 지원하는지 확인하세요.
(즉, 인코딩, 프레임 속도, 크기).

비디오 자동 재생 정책은 점점 더 엄격해지고 규칙은 브라우저마다 다를 수 있습니다. 필수 사용자 제스처가 이제 일반적으로 시행됩니다. 최대의 호환성을 위해 사용자가 [동영상 재생][startplayback]을 시작하기 위해 클릭할 수 있는 버튼을 제공할 수 있습니다. [간단한 샘플 코드][videotestcode]는 문서에서 찾을 수 있습니다. [play-on-click component][videoplaycomponent]에 특히 주의하세요.


## 브라우저 검사기를 확인할 때 HTML이 업데이트되지 않는 이유는 무엇입니까?

[debug]: ../components/debug.md
[flushtodom]: ../core/entity.md#flushtodom-recursive

브라우저의 개발자 도구를 열면 HTML 속성 값이 비어 있습니다.

![HTML](https://cloud.githubusercontent.com/assets/674727/25720562/2b243bda-30c2-11e7-98d5-479157d20046.jpg)

성능 향상을 위해 A-Frame은 저장할 HTML을 업데이트하지 않습니다.
문자열화 작업. 이것은 또한 돌연변이 관찰이
불. [디버그 구성 요소][debug] 또는 [`.flushToDOM` 메서드][flushtodom] 사용
DOM에 동기화해야 하는 경우.

## 내 동영상이 재생되지 않는 이유는 무엇인가요?

[iosvideo]: https://developer.apple.com/library/iad/documentation/UserExperience/Conceptual/iAdJSProgGuide/PlayingVideosinAds/PlayingVideosinAds.html

모바일 및 이제 데스크톱 브라우저는 인라인 비디오 재생에 제한이 있습니다.

인라인 비디오를 얻기 위해 [iOS 플랫폼 제한][iosvideo] 때문에
(자동재생 여부에 관계없이) 다음을 수행해야 합니다.

- `<meta name="apple-mobile-web-app-capable" content="yes">` 메타 태그를 설정합니다(누락된 경우 삽입됨).
- 'playsinline' 속성을 동영상 요소로 설정합니다(모든 동영상에 자동으로 추가됨).
- 이전 iOS 버전의 경우 웹 페이지를 홈 화면에 고정할 수 있습니다.

모바일 및 데스크톱 브라우저는 배터리를 절약하고 방해가 되는 광고를 피하기 위해 비디오 자동 재생 정책을 강화하고 있습니다. 이제 대부분의 브라우저에서 비디오 재생을 시작하려면 사용자 작업(예: 클릭 또는 탭 이벤트)이 필요합니다.


-[안드로이드용 크롬](https://bugs.chromium.org/p/chromium/issues/detail?id=178297)

-[크롬 데스크톱](https://www.chromium.org/audio-video/autoplay)

-[사파리](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/)

-[파이어폭스](https://hacks.mozilla.org/2019/02/firefox-66-to-block-automatically-playing-audible-video-and-audio/)

[동영상 재생 예시]: https://aframe.io/aframe/examples/test/video/
[동영상 재생 코드]: https://github.com/mayognaise/aframe-html-shader/

사용자가 클릭하거나 탭하여 비디오 재생을 시작하도록 요청하는 [필요한 논리를 포함하는 A-Frame 예제][동영상 재생 예시]가 있습니다. [소스 코드도 사용 가능][동영상 재생 코드]

우리는 비디오에 너무 집중하지 않지만 커뮤니티에서 유용한 정보를 포함할 수 있는 GitHub 문제는 다음과 같습니다.

- [*동영상 및 videospheres는 모바일에서 작동하지 않습니다*](https://github.com/aframevr/aframe/issues/316)
- [*iOS 비디오 인코딩 제한 문서*](https://github.com/aframevr/aframe/issues/1846)
- [*공식 videosphere 데모는 모바일에서 작동하지 않습니다*](https://github.com/aframevr/aframe/issues/2152)

## 어떻게 `<iframe>`을 표시하거나 A-Frame에서 HTML을 렌더링합니까?

브라우저가 WebGL 내에서 `<iframe>`을 표시할 방법이 없습니다. 동안
캔버스 위에 `<iframe>`을 오버레이할 수 있는 경우 `<iframe>`은
VR에 표시되지 않으며 장면과 통합할 수 없습니다.

[html-shader]: https://github.com/mayognaise/aframe-html-shader/

하지만 기본 HTML과 CSS를 상호 작용 없이 텍스처로 렌더링할 수 있습니다.
`<canvas>`에 페인팅하고 캔버스를 텍스처의 소스로 사용할 수 있습니다. 거기
이를 가능하게 하는 생태계의 구성 요소:

- [HTML 셰이더][html-shader]

## 어떤 3D 모델 형식이 작동합니까?

[gltf]: https://en.wikipedia.org/wiki/GlTF
[whygltf]: ../components/gltf-model.md#why-use-gltf

이상적인 형식은 GL 전송 형식 [glTF (`.gltf`)][gltf]입니다.
glTF는 기능이 풍부하고 컴팩트하며 효율적입니다. glTF는
*전송 형식*은 편집기 형식보다 더 상호 운용 가능합니다.
웹 기술로. [glTF 및 A-Frame의 glTF에 대해 자세히 알아보기
구성 요소][whygltf].


[obj]: https://en.wikipedia.org/wiki/Wavefront_.obj_file

[Wavefront(`.obj`)][obj]도 잘 알려진 형식이지만 몇 가지 제한 사항이 있습니다.
애니메이션 및 정점 색상 지원이 부족합니다.

생태계에는 다른 형식을 로드하기 위한 구성 요소도 있습니다.

- [`.PLY` 모델](https://github.com/donmccurdy/aframe-extras/blob/master/src/loaders/ply-model.js)
- [three.js `.JSON` 객체](https://github.com/donmccurdy/aframe-extras/blob/master/src/loaders/json-model.js)
- [three.js `.JSON` 장면](https://github.com/donmccurdy/aframe-extras/blob/master/src/loaders/object-model.js)

다음은 모델 사용에 대한 몇 가지 기본 예입니다.

- [모델 예시 1](https://aframe.io/aframe/examples/test/model/)
- [모델 예시 2](https://aframe.io/aframe/examples/primitives/models/)

## 자산은 어디에서 찾을 수 있나요?

[awesomestock]: https://github.com/neutraltone/awesome-stock-resources

일반적으로 [awesome-stock-resources][awesomestock]은
무료 자산입니다.

[textures]: https://www.textures.com/

이미지는 [textures.com][textures]에서 확인하세요.

[flickr]: https://www.flickr.com/groups/equirectangular/

360°용 이미지, [Flickr에서 정방형 이미지][flickr]를 검색합니다.

3D 모델의 경우 다음을 확인하십시오.

- [구글 블록](https://vr.google.com/objects)
- [스케치팹](https://sketchfab.com)
- [클라라.io](http://clara.io)
- [Archive3D](http://archive3d.net)
- [스케쳐스 3D 웨어하우스](https://3dwarehouse.sketchup.com)
- [터보오징어](http://www.turbosquid.com/Search/3D-Models/free)

소리의 경우 다음을 확인하세요:

- [Freesound.org](http://www.freesound.org/)
- [Sonniss의 연간 GDC 게임 오디오 번들](http://www.sonniss.com/gameaudiogdc2016/)

## Vimeo 동영상을 텍스처로 렌더링할 수 있나요?

[Vimeo에는 A-Frame 플러그인이 있습니다.](https://github.com/vimeo/vimeo-webvr-demo) 렌더링은 개인 Vimeo 계정의 비디오로만 제한됩니다.

## YouTube 동영상을 텍스처로 렌더링할 수 있나요?

[proxy]: https://github.com/cvan/webvr360

[YouTube 동영상을 프록시][proxy]하거나 텍스처로 다운로드할 수 있습니다.
서비스를 제공하지만 이는 서비스 약관에 위배됩니다.

## 내 장면에 링크를 추가할 수 있습니까?

브라우저는 다음을 통해 WebVR 페이지에서 WebVR 페이지로 이동할 수 있는 기능을 제공합니다.
WebVR 사양에 설명된 'vrdisplayactivate' 이벤트. 현재,
모든 브라우저는 이것을 구현합니다. WebVR이 있는 Firefox는 이것을 구현합니다. 링크
링크 탐색을 위한 구성 요소는 A-Frame 0.6.0과 함께 출시되었습니다.

```html
<a-entity link="on: click; href: https://aframe-aincraft.glitch.me"></a-entity>
```

## 카메라가 장애물을 통과하지 못하게 할 수 있나요?

이는 지원하려는 기기와 사용자가
장면을 탐색합니다. 대부분의 VR 경험의 경우 모범 사례를 따르세요.
사용자의 움직임에 비례하여 카메라를 이동합니다.

[teleport]: https://github.com/fernandojsg/aframe-teleport-controls

사용자가 방 규모의 VR 공간에서 앞으로 나아가는 경우 카메라를 차단하지 마십시오. 을위한
대부분의 VR 응용 프로그램은 다음과 같은 방법으로 이동하는 것이 좋습니다.
[텔레포트 컨트롤][telport], 장애물을 피하기 위한 장면 디자인
많은 움직임이 필요하지 않거나 더 창의적인 방법을 탐색하십시오.
사용자를 전 세계로 이동시킵니다.

[physics]: https://github.com/donmccurdy/aframe-physics-system

게임패드나 키보드 컨트롤이 있는 비 VR 데스크탑 환경 또는 VR용
카메라가 차량 내부에 있는 장면에서는 [물리
엔진][physics] 장애물을 통한 움직임을 방지합니다.

## 에이프레임은 어떤 유닛을 사용하나요?

WebVR API도 미터를 사용하기 때문에 A-Frame은 1:1 비율의 미터를 사용합니다.
A-Frame의 단위는 실제 생활에서 5미터와 같습니다. 또한 사용 시
영국식 또는 미터법 모드로 구성된 블렌더와 같은 프로그램에서 측정은
1:1 번역도 합니다. 블렌더에서 10피트는 실생활에서 10피트와 같습니다.


## A-Frame은 VRML과 어떻게 다른가요?

[extensible]: https://extensiblewebmanifesto.org/

A-Frame은 자바스크립트 프레임워크입니다. VRML과 달리 A-Frame은 3D 파일이 아닙니다.
형식, 마크업 언어 또는 표준이 아닙니다. A-Frame은 [Extensible Web
선언문][extensible]을 읽어보세요.

기술적으로 A-Frame은 [entity-component-system][ecs] 게임 엔진입니다.
three.js는 JavaScript 프레임워크이기 때문에 코딩이 더 많이 필요합니다.
복잡한 응용 프로그램. 3D 파일 형식과 달리 A-Frame은 강력한
JavaScript, three.js 및 Web API에 대한 전체 액세스를 통한 상호 작용을 합니다.


## A-Frame은 'X' 기능을 지원하나요?

[aframecomponents]: https://github.com/aframevr/aframe/tree/master/src/components
[writingcomponent]: ./writing-a-component.md

A-Frame은 여러 구성 요소와 기본 요소와 함께 제공됩니다. 를 기반으로 하여
[entity-component-system architecture][ecs], 기능이 없으면
[구성 요소를 쓰거나 찾기][writingcomponent]하여 활성화할 수 있습니다. 또는 다음 중 하나인 경우
표준 구성 요소가 사용 사례에 맞지 않으면 [복사 및 수정 it][aframecomponents]를 합니다.

[finding]: ./entity-component-system.md#where-to-find-components

자세한 내용은 [*구성 요소를 찾을 수 있는 위치*][finding]를 참조하세요.

## A-Frame은 `X` 라이브러리 또는 프레임워크를 지원합니까?

A-Frame은 DOM 위에 구축되어 대부분의 라이브러리와 프레임워크가 작동합니다.

- [Vue.js](https://github.com/frederic-schwarz/aframe-vuejs-3dio)
- [Preact](https://github.com/aframevr/aframe-react#using-with-preact)
- [D3.js](http://blockbuilder.org/search#text=aframe)
- [React](https://github.com/aframevr/aframe-react)
- [Angular](https://stackoverflow.com/questions/46464103/various-errors-when-attempting-to-integrate-aframe-into-angular2-project-esp-wi)
- jQuery
- Ember.js
- Meteor

## A-Frame은 어떤 헤드셋, 브라우저, 장치 및 플랫폼을 지원합니까?

[deviceplatform]: ./vr-headsets-and-webvr-browsers.md

그들 중 대부분. 자세한 내용은 *[VR 헤드셋 및 WebVR 브라우저][deviceplatform]*를 참조하세요.

## 성능을 향상시키려면 어떻게 해야 하나요??

[bestpractices-perf]: ./best-practices.md#performance

[모범 사례 &mdash; 자세한 내용은 성능][bestpractices-perf]을 참조하세요.

## A-Frame 팀과 어떻게 연락할 수 있나요?

우리는 질문, 피드백, 버그 보고서, 풀 리퀘스트등 응답하고 도움이 되도록 노력합니다! 


- 질문이 있다면 [A-Frame StackOverflow 태그][stackoverflow]를 사용하여 문의하세요.
- 채팅을 하시고 싶으시면 [A-Frame Slack 채널][slack] 커뮤니티에서 함께 하세요.
- 공유하고 싶으신가요? [@framevr][twitter]에서 트윗해 주세요.
- 문제를 찾으셨나요? [A-Frame GitHub repo][github]에 문제를 제출하세요.

## 로드맵은 어디에 있을까?

[roadmap]: https://github.com/aframevr/aframe/blob/master/ROADMAP.md

[로드맵은 GitHub][roadmap]에 있습니다!

## "A-Frame" 또는 "aframe" 또는 "aframevr" 또는 "aFrame"이라고 부를까요?

A-Frame!

## 내 텍스처가 검은색으로 렌더링되는 이유는 뭔가요?

[precision]: ../components/renderer.md#precision

Adreno 300 시리즈 GPU가 탑재된 휴대폰은 문제가 많은 것으로 유명합니다. 해결 방법으로 [렌더러 정밀도][precision]를 '중간'으로 설정합니다. 실제 수정은 드라이버/장치 수준에서 이루어져야 합니다.


## 자이로스코프/마법창 모드가 작동하지 않는 이유는 무엇인가요?

[새 브라우저 정책](https://www.w3.org/TR/orientation-event/#dom-deviceorientationevent-requestpermission)에 따라 사이트는 DeviceMotionEvents에 액세스하기 전에 사용자에게 권한을 요청해야 합니다. [iOS 13부터](https://webkit.org/blog/9674/new-webkit-features-in-safari-13/) DeviceMotionEvents는 'https'를 통해 제공되는 페이지에서만 사용할 수 있습니다. 다른 브라우저에도 동일한 정책 및 제한이 적용됩니다. A-Frame은 이제 [맞춤형 UI 통합](https://aframe.io/docs/1.0.0/components/device-orientation-permission-ui.html#sidebar)을 통해 사용자에게 필요한 권한을 요청합니다. 반드시 [A-Frame 최신 버전](https://github.com/aframevr/aframe/releases)으로 업데이트하세요.
