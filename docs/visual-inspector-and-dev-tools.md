---
id: doc12
title: 비주얼 인스펙터 및 개발 도구
---

[inspector]: https://github.com/aframevr/aframe-inspector
[motioncapture]: https://github.com/dmarcos/aframe-motion-capture-components

이 섹션에서는 VR 개발 경험을 향상시킬 많은 유용한 도구에 대해 설명합니다.

- [**A-Frame Inspector**][inspector] - 
  장면을 다른 관점에서 볼 수 있는 인스펙터 도구
  엔티티 조정의 시각적 효과를 확인하십시오. VR 아날로그
  브라우저의 DOM 검사기. `<ctrl> + <alt> + i`로 모든 A-Frame 장면에서 열 수 있습니다.
- 키보드 단축키.
- [**Motion Capture**][motioncapture] - 헤드셋과 컨트롤러 포즈 및 이벤트를 기록하고 
재생하는 도구입니다. 기록을 치고, VR 헤드셋 내부를 돌아다니고, 컨트롤러로 물체와 상호 
작용합니다. 그런 다음 빠른 개발 및 테스트를 위해 모든 컴퓨터에서 해당 녹음을 다시 
재생합니다. 헤드셋을 드나드는 시간을 줄이십시오.

코드 없이 사용할 수 있는 A-Frame 위에 구축된 GUI 도구를 살펴보겠습니다.
그리고 여러 시스템에서 쉽게 개발할 수 있는 다른 도구를 살펴보십시오

<!--toc-->

## A-Frame Inspector

[A-Frame Inspector][inspector]는 검사 및 조정을 위한 시각적 도구입니다.
장면. Inspector를 사용하여 다음을 수행할 수 있습니다.

- 핸들과 도우미를 사용하여 엔티티 드래그, 회전 및 크기 조정
- 위젯을 사용하여 엔터티의 구성 요소 및 해당 속성 조정
- 코드와 브라우저를 왔다갔다 할 필요 없이 값 변경 결과를 즉시 확인

Inspector는 브라우저의 DOM inspector와 유사하지만 3D 및 A-Frame에 맞게 조정되었습니다. 
Inspector를 토글하여 A-Frame 장면을 야생에서 열 수 있습니다. 소스를 봅시다!

![Inspector Preview](https://cloud.githubusercontent.com/assets/674727/17754515/b5596eb6-6489-11e6-9485-4cb10fa5b100.png)

### 인스펙터 열기

사용하는 가장 쉬운 방법은 **`<ctrl> + <alt> + i`** 단축키를 누르는 것입니다.
우리의 키보드. 이것은 CDN을 통해 Inspector 코드를 가져오고 Inspector에서 장면을 엽니다. 
동일한 단축키는 Inspector를 닫도록 토글합니다.

Inspector 내에서 로컬 장면을 열 수 있을 뿐만 아니라 Inspector를 사용하여 A-Frame 장면을
야생에서 열 수 있습니다(저자가 명시적으로 비활성화하지 않는 한).

로컬 서비스에 대한 자세한 내용은 [Inspector README][inspector]를 참조하세요.
Inspector의 개발 또는 사용자 정의 빌드.

### 인스펙터 사용하기

#### 장면 그래프

Inspector의 장면 그래프는 장면의 트리 기반 표현입니다. 장면 그래프를 사용하여 * 엔티티를 
선택, 검색, 삭제, 복제 및 추가*하거나 HTML을 내보낼 수 있습니다.

![Inspector Scene Graph](https://cloud.githubusercontent.com/assets/674727/18565455/ae082fea-7b44-11e6-856f-2b9ca0e60bed.gif)

장면 그래프는 내부 three.js 객체가 아닌 A-Frame 엔티티를 나열합니다. HTML이 장면 그래프를
나타내기 때문에 Inspector의 장면 그래프는 기본 HTML을 밀접하게 반영합니다. 엔티티는 HTML
ID 또는 HTML 태그 이름을 사용하여 표시됩니다.

#### Viewport

뷰포트는 인스펙터의 관점에서 본 장면을 표시합니다. 장면의 보기를 변경하기 위해 뷰포트를 
회전, 팬 또는 확대/축소할 수 있습니다.

- **Rotate:** 왼쪽 마우스 버튼(또는 트랙패드에서 한 손가락 아래로)을 누른 상태에서 드래그
- **Pan:** 마우스 오른쪽 버튼(또는 트랙패드에서 두 손가락 아래로)을 누른 상태에서 드래그
- **Zoom:** 위아래로 스크롤(또는 트랙패드에서 두 손가락 스크롤)

뷰포트에서 엔티티를 선택하고 변환할 수도 있습니다.

- **Select**: 엔티티를 마우스 왼쪽 버튼으로 클릭하고 두 번 클릭하여 해당 엔티티에 카메라 
초점을 맞춥니다.
- **Transform**: 오른쪽 상단 모서리에 있는 도우미 도구 선택 뷰포트에서 엔티티를 둘러싼
 빨강/파랑/녹색 도우미를 드래그하여 변환합니다.

![Inspector Viewport](https://cloud.githubusercontent.com/assets/674727/18565454/ad047c84-7b44-11e6-8c4a-0f1fe55c6682.gif)

#### 구성 요소 패널

구성 요소 패널에는 선택한 엔터티의 구성 요소와 속성이 표시됩니다. 공통 구성 요소의 값(예: 
위치, 회전, 크기)을 수정하고, 연결된 구성 요소의 값을 수정하고, 믹스인을 추가 및 제거하고, 
구성 요소를 추가 및 제거할 수 있습니다.

각 속성의 위젯 유형은 속성 유형에 따라 다릅니다. 예를 들어 부울은 확인란을 사용하고 숫자는
 값 슬라이드를 사용하며 색상은 색상 선택기를 사용합니다.

개별 구성 요소의 HTML 출력을 복사할 수 있습니다. 이것은 유용하다 시각적으로 조정하고 구성
 요소의 원하는 값을 찾은 다음 소스 코드에 다시 동기화합니다.

![Inspector Components](https://cloud.githubusercontent.com/assets/674727/18565449/aa63a7b6-7b44-11e6-999c-450c88812293.gif)

#### 바로가기

**`h`** 키를 눌러 사용 가능한 모든 단축키 목록을 볼 수 있습니다.

## 마우스 및 키보드 단축키

[debugcursor](https://www.npmjs.com/package/aframe-debug-cursor-component)

`<a-entity cursor="rayOrigin: mouse"></a-entity>`를 사용하여 마우스를 사용하여 개체를 
가리키고 클릭할 수 있습니다. 이들은 컨트롤러에서 커서를 사용하는 것과 호환되는 
`mouseenter`, `mouseleave` 및 `click` 이벤트를 제공합니다(예: `<a-laser-controls>`를 
통해). 커서 이벤트를 기록하는 [debug-cursor component](debugcursor)가 있습니다.

내에서 작업을 테스트하기 위해 키보드 단축키 바인딩을 개발하는 것이 유용합니다.
`document.addEventListener('keydown', function (evt) { // ... });`를 사용하는 
애플리케이션.

[debugcontrol]: https://gist.github.com/ngokevin/803e68351f70139da51fda48d3b484e3

[키보드를 사용하여 6DoF에서 컨트롤러를 제어할 수 있는 구성 요소][debugcontrol]도 있습니다.

## 모션 캡쳐

룸스케일 VR은 개발하기가 까다로울 수 있습니다. 코드가 변경될 때마다

to:
- 웹 페이지 열기(종종 별도의 컴퓨터에서 실행)
- VR 입력
- 헤드셋 착용
- 컨트롤러 잡기(종종 다시 켜야 함)
- 헤드셋과 컨트롤러로 테스트 실행
- 헤드셋과 컨트롤러를 벗고 브라우저 개발 도구를 엽니다.
- 현재 실험적이며 버그가 있으므로 필요한 경우 브라우저를 다시 시작하십시오.
- 반복하다

룸스케일 VR개발은 당밀이 됩니다. 그러나 [A-Frame Motion Capture
구성품](https://github.com/dmarcos/aframe-motion-capture-components/).

모션 캡처 구성 요소를 사용하여 VR 동작(예: 헤드셋 및 컨트롤러 움직임, 컨트롤러 버튼 누름)
을 기록하고 헤드셋 없이 어디서나 모든 장치에서 이러한 VR 동작을 반복적으로 재생할 수 
있습니다.

### 사용 사례

![Rapid Development](https://cloud.githubusercontent.com/assets/674727/24733615/9cb99dae-1a2d-11e7-85e3-a75d6c06bb91.gif)

다음은 VR 개발 인체 공학을 크게 향상시키는 모션 캡처의 몇 가지 실제 사용 사례입니다.

1. **더 빠른 테스트 시도:** 헤드셋을 켜고 끌 필요가 없으며 VR을 입력하고,
컨트롤러를 잡고 수동 작업을 수행하거나 브라우저를 다시 시작하십시오. 한 번만 녹음하면 한 
번의 녹음으로 몇 시간 동안 개발할 수 있습니다.

2. **이동 중 개발**: 무언가를 테스트할 때마다 헤드셋과 VR을 다시 입력해야 하는 대신 녹음을
 가져와서 Macbook으로 보내거나 커피숍에 나가서 안정적인 브라우저에서 녹화를 사용하여 VR 
 응용 프로그램을 계속 개발하십시오. `console.log`를 추가하거나, 애플리케이션을 
 리팩터링하거나, A-Frame Inspector(`<ctrl> + <alt> + i`)로 재생을 중지하여 주변을 
 둘러보세요.

3. **자동 통합 테스트**: 다양한 기록을 회귀 테스트 케이스 및 QA로 기록할 수 있습니다. 
녹음을 저장하고, 약간의 개발을 수행하고, 때때로 녹음을 클릭하여 모든 것이 여전히 작동하는지 
확인하십시오. 나중에 테스트하기 위해 프로젝트에 여러 녹음을 저장합니다.

4. **여러 개발자가 하나의 헤드셋을 공유함**: 한 개발자는 Vive로 녹음을 하고 녹음으로 
개발하기 위해 다른 곳으로 이동할 수 있습니다.

5. **녹화 요청**: Vive나 Rift가 없을 수도 있지만 동료나 친구는 가지고 있습니다. [ngrok]
(https://ngrok.io)를 통해 우리 웹 응용 프로그램에 대한 링크를 제공하고(웹이 멋지지
 않습니까?), 녹음을 찍어 우리에게 보내십시오! 이제 개발 차단이 해제되었습니다.

6. **버그 시연**: 또는 VR 웹 애플리케이션에서 버그를 발견하여 누군가에게 보여주고 싶다고 
 가정해 보겠습니다. 녹음을 가지고 디버깅을 위해 보내십시오. 버그 재생산 단계를 제공할 필요가
 없습니다. 모든 것이 녹음 파일에 있습니다!

7. **자동 단위 테스트**: 단위 테스트와 함께 녹음을 사용할 수 있습니다.
Karma 및 Mocha와 같은 프레임워크를 사용하여 녹음을 재생하고 주장할 수 있습니다. 예를 들어 
상자를 터치하고 색상이 변경되는지 확인합니다. 예는 [William Murphy]의 [A-Frame Machinima Testing][machinima]를 참조하십시오.

[machinima]: https://github.com/wmurphyrd/aframe-machinima-testing/
[William Murphy]: https://twitter.com/datatitian

### 녹음 방법

[모션 캡처 문서 읽기](https://github.com/dmarcos/aframe-motion-capture-components/)
자세한 내용은. 녹음을 설정하는 방법은 다음과 같습니다.

1. Motion Capture Components 스크립트 태그를 HTML 파일(예: `<script src="https://unpkg.com/aframe-motion-capture-components/dist/aframe-motion-capture-components.min.js">`)
2. 'avatar-recorder' 구성요소를 장면에 추가합니다(즉, '<a-scene avatar-recorder>`).
3. VR 입장
4. `<space>`를 눌러 녹음을 시작합니다.
5. 움직임 및 동작 기록
6. 녹음을 중지하려면 `<space>`를 누르세요.
7. 녹음 JSON 파일을 저장하거나 'u'를 눌러 업로드하여 컴퓨터 간에 공유할 짧은 URL을 가져옵니다.

이제 녹음을 재생할 수 있습니다. 지금 데스크탑에서 WASD 및 마우스 드래그 컨트롤을 사용하여
 카메라를 녹화할 수 있습니다. [녹화 예](http://dmarcos.github.io/aframe-motion-capture-components/)로 이동하여 브라우저 콘솔을 열어 피드백을 받고 `<space>`를 눌러 녹음을 시작하고 중지하세요!


![Record](https://cloud.githubusercontent.com/assets/674727/24766726/3d660b7e-1ab1-11e7-9f64-d97b5732ec43.gif)

### 재생 방법

기본적으로 녹음은 localStorage에서 저장되고 재생됩니다. 이동 중에 녹음을 하려는 경우 
녹음을 재생하는 방법은 다음과 같습니다(위의 스크립트 태그가 이미 있다고 가정).

1. 녹음 파일을 웹 페이지에 액세스할 수 있는 위치(즉, 프로젝트 디렉토리 또는 온라인)에 둡니다.
2. 'avatar-replayer' 구성요소를 장면에 추가합니다(예: `<a-scene avatar-replayer>`).
3. URL에 `?avatar-recording=path/to/recording.json`을 추가 *또는* `<a-scene avatar-replayer="src: path/to/recording.json">` 설정

설정 한 다음 헤드셋 없이 어디에서나 모든 장치에서 녹음을 재생합니다.
헤드셋을 착용하고 클릭 몇 번을 녹음한 다음 랩톱에서는 우리가 내보낸 컨트롤러
이벤트 위에 이벤트 핸들러를 빌드할 수 있습니다.

### 관중 모드

A-Frame 모션 캡처 구성 요소에는 'avatar-replayer' 구성 요소에서 활성화할 수 있는 관전자 모드 기능이 있습니다.

```
<a-scene avatar-replayer="spectatorMode: true">
```

이렇게 하면 3인칭 시점에서 녹음을 볼 수 있습니다. 이것은 1인칭으로 무슨 일이 일어났는지 
보기 어렵기 때문에 유용할 수 있습니다. 1인칭 시점은 자연스럽게 흔들리고, 손이 카메라를 
가리고, 동작이 화면 밖에서 일어나고, 카메라가 항상 멀어지면 한 곳에 초점을 맞추기 
어렵습니다. 관중 모드를 사용하면 장면 주변을 자유롭게 이동하고 어떤 각도에서나 어떤 영역에
초점을 두고 보든 볼 수 있습니다.

![Spectator Mode](https://cloud.githubusercontent.com/assets/674727/24733331/f2bc6094-1a2b-11e7-9442-bcf30d18af79.gif)

## A-Frame 기반 GUI 도구

사람들은 A-Frame 위에 도구를 구축하여 다음을 통해 코드를 추상화했습니다.
인터페이스 또는 응용 프로그램을 사용하여 콘텐츠를 훨씬 쉽게 만들 수 있습니다. 이들은 개발자 도구라기 보다는 보다 완전한 편집기 역할을 합니다.

### [Supercraft](https://supermedium.com/supercraft)

으로 VR 사이트를 모두 VR로 구축하고 웹에 올리세요.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ONhhKHjSO-4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### [Ottifox](http://ottifox.com/)

*"Ottifox는 브라우저에서 실행되는 대화형 VR 장면을 쉽게 만들 수 있는 강력한 디자인 및 프로토타이핑 솔루션입니다."*

![Ottifox](https://cloud.githubusercontent.com/assets/674727/25638463/5cc90a3e-2f3d-11e7-987e-d8d299773f67.jpg)

### [홀로그램](http://hologram.cool/)

*"All-in-one WebVR 생성"*

![Holgoram](https://user-images.githubusercontent.com/674727/36452389-24416be0-1649-11e8-8d7d-4a3a69097650.png)

### [페이더](https://fader.vragments.com/)

*"지금 나만의 VR 스토리를 만드세요. Fader를 사용하면 VR 스토리를 만들고 게시할 수 있습니다. 360도 구체에 여러 레이어의 정보를 추가하고 장면을 디자인하고 스토리를 전할 수 있습니다. 쉽고 빠르며 웹 기반입니다!"*

![Fader](https://cloud.githubusercontent.com/assets/674727/25638761/53535724-2f3e-11e7-90f2-5efb3a58c549.jpg)

## 크로스 머신 개발

VR 개발에서는 여러 기계에 걸쳐 개발하는 것이 일반적입니다. 예를 들어 랩톱에서 개발하고 VR 
데스크톱에서 테스트합니다. 아래 도구는 해당 프로세스에 도움이 됩니다.

### 시너지

![Synergy](https://cloud.githubusercontent.com/assets/674727/25640613/07a10392-2f45-11e7-94a5-f07cf8e32ad9.jpg)

[Synergy](https://symless.com/synergy) 여러 컴퓨터 간에 하나의 마우스와 키보드를 공유할
 수 있습니다. 예를 들어 랩톱에서 데스크톱을 제어할 수 있습니다. 우리는 노트북에서 코딩할 
 수 있습니다. 그런 다음 랩톱을 사용하여 데스크톱을 제어하여 브라우저를 새로 고치고, VR에 
 들어가고, 다른 URL을 방문하고, 모션 캡처를 녹화하거나, 브라우저의 개발자 도구를 검사할 수 
 있습니다. 책상 공간에 두 세트의 키보드와 마우스가 있습니다.

Synergy Basic 라이선스의 비용은 $19이지만 여러 대의 컴퓨터로 개발하는 경우 그만한 가치가 있습니다.

### ngrok

![ngrok](https://cloud.githubusercontent.com/assets/674727/25640652/38effdcc-2f45-11e7-99a9-c98bd694e79c.jpg)

[ngrok](https://ngrok.io) 방화벽이나 NAT 네트워크를 통해서도 다른 컴퓨터가 액세스할 수 있도록 로컬 개발 서버를 쉽게 노출할 수 있습니다. 

to:
1. 다운로드 ngrok
2. 명령줄을 열고 ngrok이 다운로드된 동일한 디렉토리로 이동합니다.
3. 로컬 개발 서버를 실행 (e.g., `python -m SimpleHTTPServer 8080`)
4. Run `./ngrok http <PORT>` (e.g., `./ngrok http 8080`)
5. ngrok 인스턴스가 실행되고 다른 컴퓨터가 브라우저에서 액세스할 수 있는 URL을 제공합니다. (e.g., `https://abcdef123456.ngrok.io`)

ngrok은 프리미엄 계정을 얻고 기억하기 쉬운 URL을 얻기 위해 자체 도메인을 예약하는 경우 가장 인체공학적입니다. 그렇지 않으면 URL이 매번 무작위로 지정되며 입력하기가 매우 어렵습니다. Basic 라이선스는 $5/월에 3개의 예약 도메인을 제공하고 Pro 라이선스는 $8.25/월에 2개의 동시 인스턴스를 제공합니다. [ngrok 가격 세부정보 보기](https://ngrok.com/product#pricing).

예약된 도메인을 사용하면 'https://abc.ngrok.io'와 같은 URL을 예약할 수 있습니다. 'abc'는 예시일 뿐이며 현재 사용 중입니다. 그런 다음 ngrok을 시작할 때마다 도메인을 전달합니다.

```
./ngrok http --subdomain=abc 8080
```

ngrok을 시작할 때마다 동일한 URL을 안정적으로 사용할 수 있습니다. 더 간단하게 만들기 위해 Bash 별칭을 추가할 수 있습니다.

```
alias ngrok="~/path/to/ngrok http --subdomain=abc"
```

어디에서나 명령줄에서 간단하게 사용하세요.

```
ngrok 8080
```

또는 두 컴퓨터를 동일한 로컬에 연결할 수 있습니다.
네트워크에 연결하고 `ipconfig` 또는 `ifconfig`를 사용하여 로컬 IP 주소(예: `http://192.168.1.135:8000`)를 사용하여 한 컴퓨터에서 다른 컴퓨터를 가리킵니다. 그러나 로컬 IP 주소를 
얻기 위해 명령을 실행해야 하고 로컬 IP 주소가 자주 변경되며 IP를 기억하고 입력하기 어렵기 
때문에 워크플로를 방해할 수 있습니다.

### 모션 캡쳐

모션 캡처는 위에서 설명했지만 다시 말하지만 모션 캡처는 여러 시스템에서 개발하는 데 엄청난 도움이 됩니다. VR 녹음을 공유하고 다른 컴퓨터에서 재생할 수 있습니다. `<space>`로 모션 캡처 녹화를 한 후 키보드에서 `u`를 눌러 녹화 데이터를 업로드하고 쉽게 전송할 수 있는 URL을 얻습니다(자신에게 이메일로 보내는 것과 다름). 또는 [file.io]를 사용하여 녹음을 전송할 수 있습니다.(https://file.io).
