---
id: doc8
title: "설치"
---

이 설치 섹션에서는 A-Frame을 시작하기 위해 몇 가지 방법을 제공하지만,
A-Frame이 주로 HTML 및 JavaScript (이기 때문에) 기반이기 때문에 
실제로 설치가 필요하지 않습니다.

<!--toc-->

## 브라우저의 코드 편집기

가장 빠른 방법은 브라우저 내에서 재생을 시작하는 것입니다.

### Remix on Glitch

![Glitch](https://cloud.githubusercontent.com/assets/674727/24480466/54b17d22-1499-11e7-8a18-d4f76b49ad07.jpg)

[glitch]: https://glitch.com/~aframe

[Glitch][glitch]는 웹 사이트를 즉시 배포하고 호스팅할 수 있는 온라인 코드 편집기를 제공합니다. 
편집기는 프론트엔드 및 백엔드 코드는 물론 여러 파일과 디렉토리를 지원합니다. 
Glitch를 사용하면 기존 프로젝트를 리믹스(즉, 복사)하여 자체적으로 만들고 모든 사람이 볼 수 있도록 
변경 사항을 즉시 호스팅 및 배포를 할 수 있습니다.

[이 A-Frame 프로젝트에서 **Remix**를 누르고][glitch], `index.html`의 HTML을 엉망으로 만든 다음 각 
실시간으로 변경사항을 게시된 사이트를 통해 확인하십시오!
예를 들어 기본 A-Frame 글리치는 `aframe.glitch.me`에 게시되지만 사용자 지정 URL 이름을 제공합니다.

다음은 초보자를 위한 몇 가지의 A-Frame 글리치입니다:

- [aframe-aincraft](https://glitch.com/~aframe-aincraft) - 마인크래프트 데모.
- [aframe-gallery](https://glitch.com/~aframe-gallery) - 360&deg; 이미지 갤러리.
- [aframe-registry](https://glitch.com/~aframe-registry) - 다양한 컴포넌트의 쇼케이스.
- [aframe-vaporwave](https://glitch.com/~aframe-vaporwave) - 레트로 미래 장면.
- [networked-aframe](https://glitch.com/~networked-aframe) -다중 사용자.

### 기타 코드 편집기

다음은 다른 브라우저 기반 코드 편집기에 대한 몇 가지 A-Frame 스타터 키트입니다. 둘다 리믹싱 또는 포크를 지원합니다:

- [CodePen &mdash; A-Frame](https://codepen.io/mozvr/pen/BjygdO)

## 로컬 개발

### 로컬 서버 사용

아래 옵션의 경우 파일이 제대로 제공되도록 로컬 서버를 사용하여 프로젝트를 개발해야 합니다. 로컬 서버 옵션은 다음과 같습니다:

- HTML 파일과 동일한 디렉토리의 터미널에서 `npm i -g five-server@latest && five-server --port=8000`를 실행합니다.
- [Mongoose](https://www.cesanta.com/products/binary)애플리케이션을 다운로드하고 HTML 파일과 동일한 디렉토리에서 엽니다.
- HTML 파일과 동일한 디렉토리의 터미널에서 `python -m SimpleHTTPServer` (또는 `python -m http.server` Python 3 경우) 실행.

서버를 실행하고 나면 서버가 실행 중인 로컬 URL 및 포트(예:`http://localhost:8000`)를 사용하여 브라우저에서 프로젝트를 열 수 있습니다.
도메인을 제공하지 않는 `file://` 프로토콜을 사용하여 프로젝트를 열지 *마십시오.* 절대 및 상대 URL이 작동하지 않을 수 있습니다.

### GitHub에서 상용구 다운로드

[ghpages]: https://pages.github.com/

상용구에는 밑에 항목이 포함됩니다:

- [현재 버전의 A-Frame](#builds-prod)에 연결되는 간단한 HTML 파일
- 선택적 로컬 개발 서버
- [GitHub Pages][ghpages]가 전 세계와 공유할 수 있는 간편한 배포 워크플로우

두 가지 방법 중 하나로 상용구를 가져올 수 있습니다.

<a class="btn btn-download" href="https://github.com/aframevr/aframe-boilerplate/">Fork on GitHub</a>
<br>( 참고로 'discontinued'로 표기되어 있고, 함께 패키징된 Aframe 버전은 0.5이다.)

<a class="btn btn-download" href="https://github.com/aframevr/aframe-boilerplate/archive/master.zip" download="aframe-boilerplate.zip">Download .ZIP<span></span></a>

### JS 빌드 포함

HTML 파일에 A-Frame을 포함하려면 CDN 빌드를 가리키는 `<script>` 태그를 삭제합니다:

```html
<head>
  <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
</head>
```

직접 제공하고 싶으면 JS 빌드를 다운로드 하면 됩니다:

<a id="builds-prod" class="btn btn-download" href="https://aframe.io/releases/1.2.0/aframe.min.js" download>Production Version <span>1.2.0</span></a> <em class="install-note">Minified</em>
<a id="builds-dev" class="btn btn-download" href="https://aframe.io/releases/1.2.0/aframe.js" download>Development Version <span>1.2.0</span></a> <em class="install-note">Uncompressed with Source Maps</em>

### npm에서 설치

npm을 통해 A-Frame을 설치할 수도 있습니다.

```bash
$ npm install aframe
```

그러면 애플리케이션에 A-Frame을 번들로 묶을 수 있습니다. 예를 들어 with Browserify 또는 Webpack을 사용하는 경우:

```js
require('aframe');
```

[angle]: https://www.npmjs.com/package/angle

npm을 사용하는 경우 A-Frame의 명령줄 인터페이스인 [`angle`][angle]을 사용할 수 있습니다.
`angle`은 단일 명령으로 장면 템플릿을 초기화 할 수 있습니다.

```sh
npm install -g angle && angle initscene
```

## Cordova 개발

A-Frame은 Cordova 앱과 호환됩니다. 현재 A-Frame 및 해당 종속성이 CDN 소스에서 자산을 로드하므로 네트워크 액세스가 필요합니다.

[Cordova A-Frame Showcase App (demo)](https://github.com/benallfree/cordova-aframe-showcase)

### 설치

[cordova-plugin-xhr-local-file](https://github.com/benallfree/cordova-plugin-xhr-local-file)플러그인을 설치합니다. 
이 플러그인은 Cordova가 `file://`에서 실행되며 로컬 `file://` 자산(JSON 글꼴, 3D 모델 등)에 대한 XHR 요청에 
이 플러그인이 없으면 실패하기 때문에 설치가 필요합니다.

```bash
cordova plugin add cordova-plugin-xhr-local-file
```

`index.html`에서 다음과 같이 조정합니다.

```html
<head>
  <meta
        http-equiv="Content-Security-Policy"
        content="
          default-src 
            'self' 
            data: 
            gap: 
            https://ssl.gstatic.com 
            'unsafe-eval' 
            https://cdn.aframe.io         <-- required
            https://dpdb.webvr.rocks      <-- required
            https://fonts.googleapis.com  <-- required
            https://cdn.jsdelivr.net      <-- your choice, see below
            ; 
          style-src 
            'self' 
            'unsafe-inline'
            ; 
          media-src *; 
          img-src 
            'self' 
            data:                         <-- required
            content:                      <-- required
            blob:                         <-- required
            ;
        "
      />
  ...
  <script src="https://cdn.jsdelivr.net/npm/aframe@1.2.0/dist/aframe-master.min.js"></script>
  <script id='my-scene' type="text/html">
    ...your scene goes here...
  </script>
  <script>
    document.addEventListener('deviceready', function() {
      // After the 'deviceready' event, Cordova is ready for you to render your A-Frame scene.
      document.getElementById('scene-root').innerHTML = document.getElementById('my-scene').innerHTML
    })
  </script>
</head>
<body>
  <div id='scene-root'></div>
  ...
</body>
```

### 논의


#### 장치 준비

브라우저 환경과 Cordova 환경의 가장 중요한 차이점은 `deviceready`장면을 렌더링 하기 전에 이벤트를 기다리는 것입니다.

위의 샘플은 순수한 DOM+JS 접근 방식을 보여주지만 React와 같은 프레임워크를 사용할 수도 있습니다:

```javascript
document.addEventListener('deviceready', () => {
  ReactDOM.render(<Root />, document.getElementById('root'))
})
```

#### 레이아웃

대상 장치에 따라 A-Frame의 기본 CSS로 인해 특정 버튼과 컨트롤이 해당 위치를 벗어나거나 
폰 화면 가장자리에 너무 가깝게 표시 될 수 있습니다. 대상 장치에 맞게 위치를 조정하기 위해 사용자 고유의 CSS 오버라이드를 제공합니다.