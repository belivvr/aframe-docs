import React from 'react';
import "../css/main.css"

function Hello() {
  return (
    <div class="navPusher">
      <div>
        <div class="homeContainer">
          <div class="homeSplashFade">
            <div class="wrapper homeWrapper">
              <div class="projectLogo"><img src="./img/undraw_monitor.svg"
                alt="Project Logo" /></div>
              <div class="inner">
                <h2 class="projectTitle"><small>A Aframe Korea site for koreans</small></h2>
                <div class="section promoSection">
                  <div class="promoRow">
                    <div class="pluginRowBlock">
                      <div class="pluginWrapper buttonWrapper"><a class="button" href="#try">Try It
                        Out</a></div>
                      <div class="pluginWrapper buttonWrapper"><a class="button"
                        href="/docs/aframe-docs/docs/doc1">Example Link</a></div>
                      <div class="pluginWrapper buttonWrapper"><a class="button"
                        href="/docs/aframe-docs/docs/doc2">Example Link 2</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
          <div class="mainContainer">
            <div class="container paddingBottom paddingTop">
              <div class="wrapper">
                <div class="gridBlock">
                  <div class="blockElement alignCenter fourByGridBlock imageAlignTop">
                    <div class="blockImage"><img src="./img/undraw_react.svg" /></div>
                    <div class="blockContent">
                      <h2>
                        <div><span>
                          <p>Feature One</p>
                        </span></div>
                      </h2>
                      <div><span>
                        <p>This is the content of my feature</p>
                      </span></div>
                    </div>
                  </div>
                  <div class="blockElement alignCenter fourByGridBlock imageAlignTop">
                    <div class="blockImage"><img src="./img/undraw_operating_system.svg" />
                    </div>
                    <div class="blockContent">
                      <h2>
                        <div><span>
                          <p>Feature Two</p>
                        </span></div>
                      </h2>
                      <div><span>
                        <p>The content of my second feature</p>
                      </span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="productShowcaseSection paddingBottom">
              <h2>Feature Callout</h2>
              <div><span>
                <p>These are features of this project</p>
              </span></div>
            </div>

             <div class="container lightBackground paddingBottom paddingTop">
              <div class="wrapper">
                <div class="gridBlock">
                  <div class="blockElement alignCenter imageAlignSide imageAlignRight twoByGridBlock">
                    <div class="blockContent">
                      <h2>
                        <div><span>
                          <p>Randomly Generated Theme Colors</p>
                        </span></div>
                      </h2>
                      <div><span>
                        <p>Each new Docusaurus project has <strong>randomly-generated</strong> theme
                          colors.</p>
                      </span></div>
                    </div>
                    <div class="blockImage"><img src="./img/undraw_youtube_tutorial.svg" />
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            <div class="container paddingBottom paddingTop" id="try">
              <div class="wrapper">
                <div class="gridBlock">
                  <div class="blockElement alignCenter imageAlignSide imageAlignLeft twoByGridBlock">
                    <div class="blockImage"><img src="./img/undraw_code_review.svg" /></div>
                    <div class="blockContent">
                      <h2>
                        <div><span>
                          <p>Wonderful SVG Illustrations</p>
                        </span></div>
                      </h2>
                      <div><span>
                        <p>To make your landing page more attractive, use illustrations! Check out
                          <a href="https://undraw.co/"><strong>unDraw</strong></a> which provides
                          you with customizable illustrations which are free to use. The
                          illustrations you see on this page are from unDraw.</p>
                      </span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="container darkBackground paddingBottom paddingTop">
              <div class="wrapper">
                <div class="gridBlock">
                  <div class="blockElement alignCenter imageAlignSide imageAlignRight twoByGridBlock">
                    <div class="blockContent">
                      <h2>
                        <div><span>
                          <p>Description</p>
                        </span></div>
                      </h2>
                      <div><span>
                        <p>This is another description of how this project is useful</p>
                      </span></div>
                    </div>
                    <div class="blockImage"><img src="./img/undraw_note_list.svg" /></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="productShowcaseSection paddingBottom">
              <h2>Who is Using This?</h2>
              <p>This project is used by all these people</p>
              <div class="logos"><a href="https://www.facebook.com"><img src="img/undraw_open_source.svg"
                alt="User1" title="User1" /></a></div>
              <div class="more-users"><a class="button" href="./users">More Users</a></div>
            </div>
          </div>
         <footer class="nav-footer" id="footer">
          <section class="sitemap"><a href="/docs/aframe-docs/" class="nav-home"><img
            src="/docs/aframe-docs/img/favicon.ico" width="66" height="58" /></a>
            <div>
              <h5>Docs</h5><a href="/docs/aframe-docs/docs">Getting Started (or other categories)</a><a
                href="/docs/aframe-docs/docs/doc2">Guides (or other categories)</a><a
                  href="/docs/aframe-docs/docs/doc3">API Reference (or other categories)</a>
            </div>
            <div>
              <h5>Community</h5><a href="/docs/aframe-docs/users">User Showcase</a><a
                href="https://stackoverflow.com/questions/tagged/" target="_blank"
                rel="noreferrer noopener">Stack Overflow</a><a href="https://discordapp.com/">Project Chat</a><a
                  href="https://twitter.com/" target="_blank" rel="noreferrer noopener">Twitter</a>
            </div>
            <div>
              <h5>More</h5><a href="/docs/aframe-docs/blog">Blog</a><a href="https://github.com/">GitHub</a><a
                class="github-button" data-icon="octicon-star" data-count-href="/facebook/docusaurus/stargazers"
                data-show-count="true" data-count-aria-label="# stargazers on GitHub"
                aria-label="Star this project on GitHub">Star</a>
            </div>
          </section><a href="https://opensource.facebook.com/" target="_blank" rel="noreferrer noopener"
            class="fbOpenSource"><img src="/docs/aframe-docs/img/oss_logo.png" alt="Facebook Open Source"
              width="170" height="45" /></a>
          <section class="copyright">Copyright © 2021 Your Name or Your Company Name</section>
        </footer> 
     </div>
  )
}

export default Hello;