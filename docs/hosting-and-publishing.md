---
id: doc5
title: 호스팅 & 게시
---

이 섹션에서는 전 세계가 볼 수 있도록 A-Frame 사이트와 해당 자산을 웹에 배포, 호스팅 및 게시하는 여러 방법을 보여줍니다.

<!--toc-->

## 사이트 게시

사이트를 배포하고 호스팅할 수 있는 무료 서비스가 많이 있습니다. 더 쉽거나 인기 있는 옵션을 살펴보겠지만 AWS, Heroku 또는 자체 호스팅과 같은 다른 옵션도 분명히 있습니다. 중요한 참고 사항은 브라우저의 WebVR API에 대한 일반적인 보안 제한으로 인해 이러한 사이트에 SSL/HTTPS를 제공해야 한다는 것입니다. 아래의 모든 옵션은 SSL/HTTPS와 함께 제공됩니다.

### Glitch

![Glitch](https://cloud.githubusercontent.com/assets/674727/25643449/b5ee2542-2f54-11e7-9d45-22f3aa0b208f.jpg)

*"Glitch는 리믹스할 예제 앱, 수정을 위한 코드 편집기, 즉각적인 호스팅 및 배포를 통해 꿈의 앱을 구축할 수 있는 친근한 커뮤니티입니다. 누구나 무료로 Glitch에서 웹 앱을 구축할 수 있습니다."*

[Glitch](https://glitch.com)는 가장 쉽고 빠르게 생성하고
브라우저 내에서 사이트를 게시합니다. Glitch를 사용하면 코드와 파일을 추가할 수 있습니다.
자산을 업로드하고, 다른 사람들과 함께 편집하고, 고유한 URL 이름을 정의하고, 모든 변경 사항에 대해 변경 사항을 즉시 배포할 수 있습니다. 계정을 만들거나 로그인할 필요도 없습니다.

1. [A-Frame Starter Glitch](https://glitch.com/~aframe/).로 이동해 보세요.
2. **Remix your own**을 눌러 프로젝트를 복사합니다.
3. 왼쪽 상단의 *프로젝트 정보 및 옵션* 아이콘을 클릭하여 이름을 변경합니다.
애플리케이션(예: `https://yoursitename.glitch.me`).
4. HTML을 편집하고, 파일을 추가하고, 프로젝트를 수정합니다.
5. **표시**를 클릭하여 애플리케이션을 봅니다(예: 시작 글리치는 `https://aframe.glitch.me`에서 호스팅됨).
6. 프로젝트가 변경될 때마다 애플리케이션이 즉시 업데이트됩니다. 이것은 할 수 있습니다
로그인하고 사용자 아바타를 클릭하고 **새로 고침을 토글하여 해제할 수 있습니다.
앱 변경**.

### Neocities

![Neocities](https://cloud.githubusercontent.com/assets/674727/25643397/6db47790-2f54-11e7-9eb3-ac18a1513e9f.jpg)

*"자신만의 무료 웹사이트를 만드십시오. 무한한 창의성, 광고가 없습니다. Neocities는 잃어버린 것을 되찾는 129,100개의 웹사이트로 구성된 소셜 네트워크입니다.
웹의 개별 창의성. 우리는 무료 웹 호스팅 및 도구를 제공합니다.
자신의 웹 사이트를 만들 수 있습니다!"*

[Neocities](https://neocities.org) 또한 무료로 쉽게 만들 수 있는 또 다른 방법입니다
브라우저 내에서 사이트를 게시합니다. Glitch의 일부 기능은 없지만 Neocities는 친숙하고 CDN이 아닌 프로젝트 디렉토리에 자산을 업로드할 수 있습니다. 이것은 Neocities를 호스팅 모델에서 적어도 더 낫게 만듭니다. Neocities를 사용하여 파일을 만들고 편집할 수 있습니다. 그런 다음 우리를 위해 호스팅되고 게시됩니다(예: `ngokevin.neocities.org`).

![Neocities Editor](https://cloud.githubusercontent.com/assets/674727/25643399/704cffe0-2f54-11e7-8d32-868b51407f81.jpg)

## 호스팅 자산

오디오, 텍스처, 모델 및 비디오와 같은 자산을 호스팅하는 방법도 살펴보겠습니다.

A-Frame 사이트가 동일한 자산과 함께 게시되는 경우
디렉토리(즉, 동일한 도메인)가 있으면 자산 호스팅에 대해 크게 걱정할 필요가 없습니다. A-Frame 사이트는 상대 URL을 사용하여 자산을 참조할 수 있으며 동일한 도메인에 있으므로 해당 
자산을 가져오는 데 문제가 없습니다. 예를 들어 동일한 루트 디렉터리에 모든 리소스가 있고 
Neocities, GitHub Pages 또는 Surge를 통해 모든 것을 게시하는 경우 문제가 없습니다.

## 콘텐츠 전송 네트워크(CDN)

CDN과 같이 외부에서 자산을 호스팅하는 경우 고려 사항 .자산에 대한 기본 요구 사항은 
[교차 출처 리소스 공유 (CORS(https://developer.mozilla.org/docs/Web/HTTP/Access_control_CORS) 활성화. 이를 통해 A-Frame 사이트는 에셋을 가져올 수 있습니다.
또한 `<a-assets>`를 사용하는 경우 일반적으로 다음을 설정해야 합니다.
`<img>`, `<audio>` 및 `<video>`와 같은 자산에 대한 `crossorigin="anonymous"`.

CDN을 통해 자산을 호스팅하는 몇 가지 간단한 옵션이 있습니다.

- [Glitch Asset Uploader](https://glitch.com/) - Glitch 코드 편집기에는 자산을 업로드하고 그 대가로 CDN URL을 가져오는 패널이 있습니다.
- [imgur](https://imgur.com/) - 이미지의 경우 인기 있는 이미지 호스팅 서비스인 imgur를 사용할 수 있습니다.

### 호스팅 모델

호스팅 모델은 그렇게 간단하지 않습니다. 모델은 일반적으로 모델 파일이 이미지와 같은 다른 파일을 상대적으로 참조하는 폴더에 파일 그룹으로 제공됩니다. 따라서 모델은 동일한 디렉토리에 단일 폴더로 업로드되어야 합니다. 많은 무료 자산 호스팅 서비스는 한 번에 하나의 파일만 업로드할 수 있도록 지원합니다. 한 가지 해결책은 이미지가 개별적으로 업로드된 후 모든 이미지 경로의 이름을 CDN 경로로 바꾸는 것이지만 이는 지루합니다. CDN을 통해 모델을 쉽게 호스팅하기 위한 몇 가지 알려진 솔루션이 있습니다.

Neocities를 통해 사이트를 게시하는 경우 파일을 원하는 수만큼 업로드할 수 있다.

![Neocities](https://cloud.githubusercontent.com/assets/674727/25639880/713c8266-2f42-11e7-9f2a-8e552bda80fa.jpg)

*Neocities 자산 업로더*

[jsdelivr]: https://www.jsdelivr.com/?docs=gh

또는 GitHub 리포지토리에 자산을 업로드하고 GitHub를 사용하여 모델 파일을 제공할 수 있습니다.

1. GitHub 리포지토리 중 하나로 이동합니다.
2. **파일 업로드**를 클릭합니다.
3. 자산을 업로드하고 업로드가 완료될 때까지 기다립니다.
4. 하단에 빠른 메시지를 입력하고 **변경 사항 커밋**을 누릅니다.
5. 처리를 기다립니다.
6. 완료되면 기본 자산 파일을 클릭합니다.
7. **원시**를 클릭합니다.
8. 그런 다음 GitHub에서 호스팅되는 자산 URL이 있습니다. 그러면 자산은
[JSDelivr CDN][jsdelivr]을 통해 호스팅되고 참조됩니다.

아래는 워크플로 동영상입니다.

<div><iframe src="https://www.youtube.com/embed/_D_C_oSKp9Y?ecver=2" width="640" height="360" frameborder="0"  allowfullscreen></iframe></div>

ee는 다른 모든 자산을 제공하는 것과 동일한 방식으로 모델을 호스팅하고 서버와 CDN에서 처리하도록 할 수도 있습니다. 우리가 그들을 호스팅할 특별한 장소를 원한다면 S3가 또 다른 옵션입니다.

## 프로젝트 공유

멋진 프로젝트를 게시한 후에는 다른 사람들이 자세히 볼 수 있도록 공유하고 싶습니다!

### 미디어 만들기

[gifpardy]: https://github.com/ngokevin/gifpardy
[obs]: https://obsproject.com/

A-Frame과 VR은 매우 시각적입니다. 우리는 우리 프로젝트의 비디오와 GIF를 만들고 싶을 것입니다.

먼저 화면을 녹화하고 싶습니다. OS X에서는 내장된 QuickTime Player의 화면 녹화 또는 [OBS Studio][obs]를 사용하여 화면을 녹화하세요. Windows에서는 [OBS Studio][obs]를 사용할 수 있습니다. OBS Studio는 또한 화면 상단의 웹캠 이미지 스트리밍 및 합성을 지원하므로 헤드셋을 사용하는 사람을 실제로(혼합 현실에서도) 보여주는 데 유용합니다.

그런 다음 비디오를 트리밍할 수 있습니다. OS X에서는 QuickTime Player의 트림 도구(`<cmd> + t`)를 사용할 수 있습니다.

하나의 명령으로 GIF로 변환하려면 [gifpardy][gifpardy]를 사용하세요. `gifpardy`는 후드 아래에서 ffmpeg 및 gifsicle을 사용합니다.

```
gifpardy in.mp4
gifpardy in.mp4 out.gif
gifpardy -r 320x240 --delay 8 in.mp4
```

[brewery]: https://itunes.apple.com/us/app/gif-brewery-by-gfycat-capture-make-video-gifs/id1081413713?mt=12

내보내기 전에 GIF를 다듬고, 크기를 조정하고, 자르고, 미리 볼 수 있는 UI가 있는 [GIF Brewery][brewery]를 사용할 수 있습니다. 또는 [LICECap](https://licecap.en.softonic.com/)을 사용하여 GIF로 바로 캡처하세요.

### 미디어 공유

[blog]: https://aframe.io/blog/
[reddit-webvr]: https://www.reddit.com/r/webvr
[slack-webvr]: https://webvr-slack.herokuapp.com/

A-Frame으로 무언가를 만들면 우리와 공유하십시오! 프로젝트를 공유해 주시면 커뮤니티에서 볼 수 있도록 [*A Week of A-Frame*](https://aframe.io/blog/)에 게재됩니다. 훌륭한 채널은 다음과 같습니다.

- [Twitter](https://twitter.com) - `@aframevr`을 언급하거나 `#webvr` 해시태그를 포함하세요.
- [Slack의 `#projects` 채널](http://aframevr.slackarchive.io/projects/)
- [WebVR Slack 채널][slack-webvr].
- [/r/WebVR 하위 레딧][reddit-webvr].
- 사례 연구를 작성하고 [A-Frame 블로그][blog] 에 사항들을 알려주세요..

## Embedding

A-Frame 장면을 2D 웹 페이지의 레이아웃에 포함하려면 [embedded component](../components/embedded.md)를 사용하여 전체 화면 스타일을 제거하고 CSS로 캔버스 스타일을 지정할 수 있습니다.

한 번에 하나의 장면만 페이지에 포함할 수 있습니다. 여러 장면이 필요한 경우 사용할 수 있습니다.
[`<iframe>`s](https://developer.mozilla.org/docs/Web/HTML/Element/iframe).
