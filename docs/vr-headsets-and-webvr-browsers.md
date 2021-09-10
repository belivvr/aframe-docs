---
id: doc13
title: "VR 헤드셋 및 WebVR 브라우저"
---

[w3c]: https://w3c.github.io/webvr/

<!--toc-->

## 가상 현실이란 무엇입니까?

가상 현실(VR)은 디스플레이가 있는 헤드 마운트 헤드셋을 사용하여 사실적인 이미지, 사운드 및 기타 감각을 생성하여 사용자를 몰입형 가상 환경으로 만드는 기술입니다. 
VR은 사람들이 걸으며 돌아다니고 손을 사용해 상호작용할 수 있는 무한한 세계를 만들어 마치 다른 장소로 이동한 것처럼 느낄 수 있게 해줍니다.


### 헤드셋에 차이점은 무엇입니까?

마켓에는 다양한 기능을 갖춘 소비자용 VR 헤드셋이 여러 개 출시 되어 있습니다.
중요한 구별 기능에는 다음이 포함됩니다.

- 위치 추적(6자유도(6DoF)) 또는 회전 추적(3자유도 (3DoF))만 있습니다.
- 컨트롤러가 있는지 그리고 해당 컨트롤러에 6DoF 또는 3DoF가 있는지의 여부. 일반적으로 컨트롤러의 자유도는 헤드셋의 자유도와 일치합니다.
- PC, 모바일 장치 또는 독립 실행형으로 전원이 공급됩니다.

회전 추적을 사용하면 사람들이 물체를 둘러보거나 회전할 수 있습니다. 모든 헤드셋은 회전 추적을 제공합니다.

위치 추적을 통해 사람들은 이리저리 움직이고, 물체에 더 가까이 다가가고, 앞으로 뻗을 수 있습니다. 
VR 산업이 발전함에 따라 최소한의 실행 가능한 경험은 위치 추적 컨트롤러를 갖춘 헤드셋을 갖추는 방향으로 기울어지게 될 것입니다. 
위치 추적은 사람들에게 존재감을 줄 뿐만 아니라 그들이 실제 환경에 있다고 느끼게 하기 위해 중요합니다. 
회전 전용 추적을 사용하면 사람들이 주변을 둘러보고 컨트롤러를 움직이는데 제약을 받게 됩니다.

### 현재 사용 중인 헤드셋은 무엇입니까?

[HTC Vive]: https://www.vive.com/
[Oculus headsets]: https://www.oculus.com
[Google Daydream]: https://vr.google.com/daydream/
[Samsung GearVR]: http://www.samsung.com/global/galaxy/gear-vr/
[Windows Mixed Reality]: https://developer.microsoft.com/en-us/windows/mixed-reality/
[Vive Focus]: https://enterprise.vive.com/us/vivefocus/

| Headset                 | Platform   | Positional Tracking | Controllers        | Controller Positional Tracking |
|-------------------------|------------|---------------------|--------------------|--------------------------------|
| [HTC 바이브]              | PC         | :white_check_mark:  | :white_check_mark: | :white_check_mark:             |
| [오큘러스 리프트]           | PC         | :white_check_mark:  | :white_check_mark: | :white_check_mark:             |
| [구글 백일몽]       | Android    | :x:                 | :white_check_mark: | :x:                            |
| [삼성 기어 VR]        | Android    | :x:                 | :white_check_mark: | :x:                            |
| [Windows 혼합 현실] | PC         | :white_check_mark:  | :white_check_mark: | :white_check_mark:             |
| [오큘러스 고]             | 독립 실행형 | :x:                 | :white_check_mark: | :x:                            |
| [바이브 포커스]            | 독립 실행형 | :x:                 | :white_check_mark: | :x:                            |
| [오큘러스 퀘스트]            | 독립 실행형 | :white_check_mark:  | :white_check_mark: | :white_check_mark:             |
| [오큘러스 퀘스트 2]            | 독립 실행형 | :white_check_mark:  | :white_check_mark: | :white_check_mark:             |

## WebVR이란 무엇입니까?

WebVR은 브라우저에서 몰입형 3D 가상 현실 경험을 만들기 위한 JavaScript API입니다. 간단히 말해서 웹을 통해 브라우저에서 VR을 허용합니다.

A-Frame은 WebVR API를 사용하여 VR 헤드셋 센서 데이터(위치,
방향)에 액세스하여 카메라를 변환하고 콘텐츠를 VR헤드셋에 직접 렌더링합니다. 데이터를 제공하는 WebVR을 그래픽 및 렌더링을 제공하는 WebGL과 혼동해서는 안됩니다.

## VR을 지원하는 브라우저는 무엇입니까?

[Supermedium](https://supermedium.com) 및
[Exokit](https://github.com/exokitxr/exokit) 포함:

<iframe src="https://caniuse.com/#search=webxr" height="480px" width="100%"></iframe>

## A-Frame이 WebVR을 원하는 곳은 어디입니까?

A-Frame은 네이티브와 같은 성능으로 몰입도가 높고 인터랙티브한 VR 콘텐츠를 목표로 합니다. 이를 위해 A-Frame은 최소 실행 가능한 바가 위치 추적 컨트롤러가 있는 위치 추적 헤드셋으로 향하는 추세라고 믿습니다.
이것은 A-Frame이 VR 웹에 고유한 새로운 기반(예: 링크 순회, 탈중앙화, ID)을 발견함과 동시에 혁신을 원하는 패러다임입니다. 이러한 유형의 콘텐츠를 평면 및 정적인 360&deg; 콘첸츠 및 메뉴와 대조하십시오.

동시에 A-Frame은 모두가 VR 콘텐츠 제작에 참여할 수 있기를 바랍니다. A-Frame은 컨트롤러로 모든 주요 헤드셋을 지원합니다.
다행스럽게도 A-Frame은 대규모 커뮤니티와 기여자들과 함께 미래를 내다보는 동시에 오늘날의 VR 환경의 요구 사항을 충족할 수 있습니다.

## A-Frame은 어떤 플랫폼을 지원합니까?

A-Frame은 브라우저를 통해 거의 모든 플랫폼을 지원합니다. A-Frame이 지원하는 일반 플랫폼은 다음과 같습니다:

- 헤드셋이 있는 데스크탑의 VR
- 헤드셋이 있는 모바일의 VR
- 독립형 헤드셋의 VR
- 데스크탑에서 플랫(예: 마우스 및 키보드)
- 플렛 모바일 (예: 매직 윈도우)

A-Frame과 함께 작동하는 것으로 표시된 플랫폼은 다음과 같습니다.

- AR 헤드셋의 증강현실(AR) (예: Magic Leap, HoloLens)
- 모바일의 증강 현실(AR) (예: magic window, ARKit, ARCore)

## A-Frame은 어떤 VR 헤드셋을 지원합니까?

A-Frame은 브라우저를 통해 대부분의 헤드셋을 지원합니다. A-Frame이 지원하는 일부 VR 헤드셋은 다음과 같습니다:

- HTC 바이브
- 오큘러스 리프트
- 오큘러스 퀘스트
- 오큘러스 고
- 구글 백일몽
- 삼성 기어VR
- 바이브 포커스

일반 하드웨어 권장 사항(요구 사항 아님):

- [Oculus Rift 하드웨어 권장 사항](https://www.oculus.com/en-us/oculus-ready-pcs/)
- [HTC Vive 하드웨어 권장 사항](https://www.vive.com/us/ready/)
- For smartphones, an iPhone 6 for iOS and at least a Galaxy S6 for Android

## A-Frame은 어떤 브라우저를 지원합니까?

A-Frame은 [WebVR 사양][w3c]을 구현하는 모든 브라우저에서 VR을 지원하고 대부분의 브라우저에서 플랫 3D를 지원합니다. 
대형 브라우저 공급업체는 WebXR 사양으로 천천히 이동하고 있지만 A-Frame 개발자에게는 대부분 API 이름 변경과 같은 전면적인 변경 사항이 많지 않습니다.

- [Supermedium](https://www.supermedium.com) (Oculus 및 Steam에서 사용 가능)
- 파이어 폭스
- 오큘러스 브라우저
- 삼성 인터넷
- 마이크로소프트 엣지
- Chrome (원본 시험 중인 WebXR)
- Exokit (실험적인 초기 지원)

[webvrpolyfill]: https://github.com/googlevr/webvr-polyfill

A-Frame은 [WebVR polyfill][webvrpolyfill]을 통해 WebVR을 지원하지 않는 대부분의 최신 모바일 브라우저를 지원합니다. 
이러한 브라우저는 공식 WebVR을 지원하지 않으며 polyfill을 사용하고 있습니다; 이러한 브라우저가 다음과 같은 특징을 가지지 않고 
양질의 경험을 제공할 것이라는 기대는 낮추는 것이 중요합니다:

- iOS용 사파리
- 안드로이드용 크롬
- iOS용 파이어폭스
- 삼성인터넷
- UC 브라우저

플랫 또는 일반 3D 지원을 위해 A-Frame은 다음을 포함한 WebGL을 지원하는 최신 브라우저를 모두 지원합니다:

- 파이어폭스
- 크롬
- 사파리
- 엣지
- 인터넷 익스플로러 11
